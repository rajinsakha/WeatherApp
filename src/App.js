import React, {useState} from 'react';
import './App.css';
import { Navbar, Footer } from './components';
import { Information, Forecast } from './containers';



const App = () => {
const apiKey = process.env.REACT_APP_API_KEY;
const [searchInput, setSearchInput] = useState("");
const [submittedQuery, setSubmittedQuery] = useState("Kathmandu");

console.log(apiKey);

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
