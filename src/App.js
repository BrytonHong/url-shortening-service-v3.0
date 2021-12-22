import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import UrlListData from "./components/url-list-data";
// import ShortenURL from "./components/shorten-url.component";

function App() {
  return (
    <Router>
      <div className="container">
      <br/>
      {/* <ShortenURL /> */}
      <Routes>
      <Route path="/" exact element={<UrlListData/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
