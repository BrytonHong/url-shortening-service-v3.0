import { API } from 'aws-amplify';
import React, { useState, useEffect } from "react";

function UrlListData() {

  useEffect(() => {
    fetchUrlList()
  }, [])

  const [message, setMessage] = useState([])
  // let props

  async function fetchUrlList() {

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
              <td><a href={row.full}>{row.short}</a></td>
              <td>{row.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UrlListData;
