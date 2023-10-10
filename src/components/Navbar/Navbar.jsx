import React, {useState} from "react";

import './Navbar.css';

import {  GrSearch } from "react-icons/gr";

const Navbar = ({onSearchChange, onSubmit}) => {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ((e)=>{
    setInputValue(e.target.value);
    onSearchChange(e.target.value);
  })

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
      setInputValue('');
    }
  }

  
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <h1>WEATHER</h1>
      </div>

      <div className="navbar_search-bar flex__center">
      {/* <GrLocation fontSize={24} className="location" /> */}
        <input type="text" value={inputValue}  id="search-box" onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder="Enter Location" />
        <button type="button" id="search-btn" onClick={()=>{
          onSubmit();
          setInputValue("");
        }}>
        <GrSearch fontSize={16} />
  
        </button>
        
      </div>

      {/* <div className="navbar_degree flex__center">
        <p>&deg;C</p>
        <p>&deg;F</p>
      </div> */}
    </nav>
  );
};

export default Navbar;
