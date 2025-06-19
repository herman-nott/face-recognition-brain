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
  // const [box, setBox] = useState({});
  const [boxes, setBoxes] = useState([]);
  
  const requestOptions = {
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
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    // const imageElement = document.getElementById('inputImage');
    // const width = Number(imageElement.width);
    // const height = Number(imageElement.height);

    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height) + 20
    // };

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

  function onButtonSubmit() {
    setImageUrl(input);

    fetch(`http://localhost:3000/clarifai`, requestOptions)
      .then(response => response.json(response))
      .then(data => displayFaceBox(calculateFaceLocation(data)))
      .catch(error => console.error('Error:', error));
  }

  function onRouteChange(route) {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }

    setRoute(route);
  }

  

  return (
    <div className="App">
      <ParticleBackground />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {
        route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
              <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
            </div>
          : (
              route === 'register'
                ? <Register onRouteChange={onRouteChange} />
                : <Signin onRouteChange={onRouteChange} />
            )
      }
    </div>
  );
}

export default App;
