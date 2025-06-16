import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import { useState } from "react";

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
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
    // console.log(event.target.value);
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

  return (
    <div className="App">
      <ParticleBackground />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
