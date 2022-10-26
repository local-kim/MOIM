import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteMain from "./RouteMain";
import "./App.css";
import MenuBar from "./components/MenuBar";

function App() {
 
  return (
    <BrowserRouter>
      <RouteMain/>
      <MenuBar/>
    </BrowserRouter>
  );
}

export default App;