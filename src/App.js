import logo from './logo.svg';
import './App.css';
import {API} from 'aws-amplify';
import React, { useState, useEffect } from "react";

function App() {

  useEffect(() =>{
    fetchUrlList()
  },[])

  const [message, setMessage] = useState('')

  async function fetchUrlList(){

    API
      .get("urlShortSvcAPI", "/shorturl", {})
      .then(response => {
        setMessage(response.success)
        console.log(`Response: ${response}`)
      })
      .catch(error =>{
        console.log(error.response);
      })
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The message from my lambda is:
        </p>
        <h4>{message}</h4>
      </header>
    </div>
  );
}

export default App;
