import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import UrlListData from "./components/url-list-data";
import UrlShorten from "./components/url-shorten";

function App() {
  return (
    <Router>
      <div className="container">
      <br/>
      <UrlShorten />
      <Routes>
      <Route path="/" exact element={<UrlListData/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
