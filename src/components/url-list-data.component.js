import React, { Component} from 'react';
import { API } from "aws-amplify";
import urlListData from "./url-list-data";

const Urls = props => (
  <tr>
    <td><a href={props.urlList.full}>{props.urlList.full}</a></td>
    <td><a href= {props.urlList.full}>{props.urlList.short}</a></td>
    <td>{props.urlList.clicks}</td>
  </tr>
)

export default class UrlList extends Component {
  constructor(props) {
    super(props);
    this.state = {urlListData};
  }

  urlList() {
      let testex = JSON.stringify(this.state)
    console.log(testex)
    return this.state.url_list.map(currentUrlList => {
      return <Urls urlList={currentUrlList} />;
    })
  }

  render() {
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
            { this.urlList() }
          </tbody>
        </table>
      </div>
    )
  }
}