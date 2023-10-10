import React, {useState} from 'react';
import './App.css';
import { Navbar, Footer } from './components';
import { Information, Forecast } from './containers';



const App = () => {
  const apiKey = "b9104fc7bf41a86ef7aef44803f71be1";
const [searchInput, setSearchInput] = useState("");
const [submittedQuery, setSubmittedQuery] = useState("Kathmandu");

// Created a function which will be called inside Child Component by passing it through props
const handleSubmit = () => {
  setSubmittedQuery(searchInput);

};

  return (
    <div>
      <Navbar onSearchChange={setSearchInput} onSubmit={handleSubmit} />
      <Information apiKey={apiKey} city={submittedQuery}/>
    </div>
  )
}


export default App;
