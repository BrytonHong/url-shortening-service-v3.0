import React, { Component } from 'react';
import { API } from "aws-amplify";

export default class ShortenURL extends Component {
  constructor(props) {
    super(props);

    this.onChangeURL = this.onChangeURL.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fullUrl: ''
    }
  }

  onChangeURL(e) {
    this.setState({
      fullUrl: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const url = {
      fullUrl: this.state.fullUrl
    }

    console.log("URL ",url);

    API.post("urlshorteningservice", "/shortenUrls", url)
      .then(function (response) {
        if (response.data.redirect === '/') {
            window.location = "/"
        }
    })

    this.setState({
      fullUrl: ''
    })
  }

  render() {
    return (
      <div>
        <h3>URL Shortener</h3>
        <form onSubmit={this.onSubmit} method="POST" class="my-4 form-inline">
            <label for="fullUrl" class="sr-only">Full URL</label>
            <input onChange={this.onChangeURL} placeholder="Full URL" type="url" name="fullUrl" 
            id="fullUrl" class="form-control col mr-2"></input>
            <button class="btn btn-success" type="submit">Shorten</button>
        </form>
      </div>
    )
  }
}