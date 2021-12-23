import { API } from 'aws-amplify';
import React, { useState } from "react";
import UrlListData from "./url-list-data";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function UrlShorten() {

  const [fullUrl, setFullUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if(fullUrl !== null && fullUrl !=='') {
      submitURL(fullUrl)
    }
    else{
      alert(`Unable to submit: ${fullUrl}`);
    }

    setFullUrl('')

  }

  function submitURL() {

    API
      .post("urlShortSvcAPI", "/shorturl",{body:{fullUrlLink: fullUrl}})
      .then(response => {
        console.log(`Response: ${JSON.stringify(response)}`)
        window.location.reload(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div>
      <h3>URL Shortener</h3>
      <form onSubmit={handleSubmit} method="POST" class="my-4 form-inline">
          <label for="fullUrl" class="sr-only">Full URL</label>
          <input value={fullUrl} onChange={(e) => setFullUrl(e.target.value)} placeholder="Full URL" type="url" name="fullUrl" 
          id="fullUrl" class="form-control col mr-2"/>
          <button class="btn btn-success" type="submit">Shorten</button>
      </form>
    </div>
  )
}

export default UrlShorten;
