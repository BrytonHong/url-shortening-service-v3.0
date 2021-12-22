import { API } from 'aws-amplify';
import React, { useState, useEffect } from "react";

function UrlShorten() {

  useEffect(() => {
    submitURL()
  }, [])

  const [fullUrl, setFullUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  async function submitURL() {

    API
      .post("urlShortSvcAPI", "/shorturl", {fullUrlLink: fullUrl})
      .then(response => {
        console.log(`Response: ${response}`)
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
          id="fullUrl" class="form-control col mr-2"></input>
          <button class="btn btn-success" type="submit">Shorten</button>
      </form>
    </div>
  )
}

export default UrlShorten;
