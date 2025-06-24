import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { useState } from "react";

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [user, setUser] = useState({
    id: '',
    username: '',
    email: '',
    entries: 0,
    joined: ''
  });
  const [inputError, setInputError] = useState(false);
  
  const requestOptionsClarifai = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imageUrl: input })
  };

  function onInputChange(event) {
    setInput(event.target.value);
  }

  function calculateFaceLocation(data) {
    const regions = data.outputs[0].data.regions;

    const imageElement = document.getElementById('inputImage');
    const width = Number(imageElement.width);
    const height = Number(imageElement.height);

    return regions.map(region => {
      const boundingBox = region.region_info.bounding_box;
      return {
        leftCol: boundingBox.left_col * width,
        topRow: boundingBox.top_row * height,
        rightCol: width - (boundingBox.right_col * width),
        bottomRow: height - (boundingBox.bottom_row * height) + 10
      };
    });
  }

  function displayFaceBox(boxes) {    
    setBoxes(boxes);
  }

  function isValidImageUrl(url) {
    return /^https?:\/\/.+/i.test(url);
  }

  function onButtonSubmit() {
    if (!input || !isValidImageUrl(input)) {
      setInputError(true);
      setImageUrl('');
      setBoxes([]);
      return;
    }

    setInputError(false)
    setImageUrl(input);

    fetch(`http://localhost:3000/clarifai`, requestOptionsClarifai)
      .then(response => response.json(response))
      .then(data => {
        if (data) {
          const regions = data?.outputs?.[0]?.data?.regions;
          
          if (regions && regions.length > 0) {
              fetch('http://localhost:3000/image', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: user.id })
              })
                .then(response => response.json())
                .then(count => setUser(prevUser => ({
                  ...prevUser,
                  entries: count
                })))
                .catch(console.log);
            }
            displayFaceBox(calculateFaceLocation(data));
          }
      })
      .catch(error => console.error('Error:', error));
  }

  function onRouteChange(route) {
    if (route === 'signout') {
      setIsSignedIn(false);
      setInput('');
      setImageUrl('');
      setBoxes([]);
      setUser({
        id: '',
        username: '',
        email: '',
        entries: 0,
        joined: ''
      });
    } else if (route === 'home') {
      setIsSignedIn(true);
    }

    setRoute(route);
  }

  function loadUser(userData) {
    setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    });
  }

  return (
    <div className="App">
      <ParticleBackground />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {
        route === 'home'
          ? <div>
              <Logo />
              <Rank username={user.username} entries={user.entries} />
              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} boxes={boxes} inputError={inputError} />
            </div>
          : (
              route === 'register'
                ? <Register onRouteChange={onRouteChange} loadUser={loadUser} />
                : <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
            )
      }
    </div>
  );
}

export default App;
