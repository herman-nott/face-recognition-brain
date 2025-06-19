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
  
  const PAT = '8789603313e74fc3b516d12617ae12fe';
  const USER_ID = 'herman';
  const APP_ID = 'face-recognition-brain';
  const MODEL_ID = 'face-detection';
  
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": input
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

  function onInputChange(event) {
    setInput(event.target.value);
  }

  function onButtonSubmit() {
    setImageUrl(input);

    // console.log('click');
    // console.log('URL:', input);

    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
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
              <FaceRecognition imageUrl={imageUrl} />
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
