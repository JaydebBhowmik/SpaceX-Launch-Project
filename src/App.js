import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import LaunchItem from "./components/LaunchData/LaunchItem";
import Banner from "./components/banner/Banner";

function App() {
  return (
    <div className="App">
      <Banner/>
      <LaunchItem />
    </div>
  );
}

export default App;
