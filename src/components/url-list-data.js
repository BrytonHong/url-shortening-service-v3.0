import { API } from 'aws-amplify';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UrlListData() {

  useEffect(() => {
    fetchUrlList()
  }, [])

  const [message, setMessage] = useState([])
  const [redirectUrl, setRedirectUrl] = useState('')

  const handleClick = () =>{
    console.log("Redirect URL = ",redirectUrl)
    redirectShortUrl(redirectUrl)
  }

  function fetchUrlList() {

    API
      .get("urlShortSvcAPI", "/shorturl", {})
      .then(response => {
        console.log(`Response: ${JSON.stringify(response)}`)
        // response = JSON.parse(response)
        setMessage(response);

      })
      .catch(error => {
        console.log(error);
      })
  }

  function redirectShortUrl(redirecturl) {

    API
      .get("urlShortSvcAPI", "/shorturl/redirecturl", {redirect: redirecturl})
      .then(response => {
        console.log(`Response: ${JSON.stringify(response)}`)
        // // response = JSON.parse(response)
        // setMessage(response);

      })
      .catch(error => {
        console.log(error);
      })
  }


  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Full Url</th>
            <th>Short Url</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {message.map(row => (
            <tr>
              <td><a href={row.full}>{row.full}</a></td>
              <td><a href="#"onClick={() => { handleClick(); setRedirectUrl(row.short);}}>{row.short}</a></td>
              <td>{row.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UrlListData;
