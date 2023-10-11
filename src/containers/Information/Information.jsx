import React, { useState, useEffect } from "react";
import "./Information.css";
import weatherLogo from "../../assets/weather-logo.png";

const Information = ({city, apiKey}) => {
  const [weatherData, setWeatherData] = useState([]);
  const [windData, setWindData] = useState([]);
  const [weatherDescription, setWeatherDescription] = useState();
  const [dayData, setDayData] = useState([]);
  const [timeZone, setTimeZone] = useState('');
  const [timeDate, setTimeDate] = useState(0);
  const [location, setLocation] = useState('');

  const fetchWeatherData = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try{
      let data = await fetch(url);
      if (!data.ok) { 
        url = `https://api.openweathermap.org/data/2.5/weather?q=kathmandu&units=metric&appid=${apiKey}`;
        data = await fetch(url);
      }
      let parsedData = await data.json();
      setWeatherData([parsedData.main]);
      setWindData([parsedData.wind]);
      setDayData([parsedData.sys]);
      setTimeZone(parsedData.timezone);
      setWeatherDescription(parsedData.weather[0].description);
      setLocation(parsedData.name);
    }
    catch(error){
      console.error('There was a problem with the fetch operation:', error.message);
    }
    
     
  };

  const getTimeDate = (timezone) => {
    const localTime = new Date(
      new Date().getTime() +
        new Date().getTimezoneOffset() * 60000 +
        timezone * 1000
    );

    const optionsDate = { year: "numeric", month: "long", day: "numeric" };
    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const optionsDay = { weekday: "long" };

    const currentDate = localTime.toLocaleDateString("en-US", optionsDate);
    const currentTime = localTime.toLocaleTimeString("en-US", optionsTime);
    const currentDay = localTime.toLocaleDateString("en-US", optionsDay);

    return { currentDate, currentTime, currentDay };
  };

  useEffect(() => {
    const updateLocalTime = () => {
      if (timeZone !== undefined) {
        setTimeDate(getTimeDate(timeZone));
      }
    };

    if(city){
      fetchWeatherData();
      updateLocalTime(); // Initial update
    }
   

    const interval = setInterval(updateLocalTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, [timeZone, city]);

  const unixConversion = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  return (
    <div className="information section__padding">
      {dayData.map((day, index) => {
        return (
          <div className="information_weather-logo" key={index}>
            <h1 className="p__heading">Weather in {location}</h1>
            <img src={weatherLogo} alt="weather-logo" />
            <p className="p__text">Sunrise: {unixConversion(day.sunrise)} </p>
            <p className="p__text">Sunset: {unixConversion(day.sunset)}</p>
          </div>
        );
      })}

      <div className="information_weather-details">
        <h4 className="p__heading">{`${timeDate.currentDay}, ${timeDate.currentDate}`}</h4>
        <h5 className="p__heading">{timeDate.currentTime}</h5>
        {weatherData.map((weather, index) => {
          return (
            <React.Fragment key={index}>
              <h1 className="temperature">{Math.floor(weather.temp)}&deg;C</h1>
              <p className="p__sub-heading" style={{ color: "#FFF" }}>
                Feels Like {Math.floor(weather.feels_like)}&deg;C
              </p>
            </React.Fragment>
          );
        })}

        <p className="day-info">{weatherDescription}</p>
      </div>

      <div className="information_more-details">
        <h4 className="p__heading">MORE DETAILS: </h4>
        {windData.map((wind,index)=>{
          return (
            <React.Fragment key={index}>
             <p className="p__sub-heading">
          Wind speed: <span className="p__text">{wind.speed} m/s</span>
        </p>
        <p className="p__sub-heading">
          Wind Degree: <span className="p__text">{wind.deg}</span>
        </p>
            </React.Fragment>
          )
        })}

        {weatherData.map((weather,index)=>{
          return(
            <React.Fragment key={index}>
            <p className="p__sub-heading">
          Air humidity: <span className="p__text">{weather.humidity}%</span>
        </p>
        <p className="p__sub-heading">
          Pressure: <span className="p__text">{weather.pressure} mm</span>
        </p>
            </React.Fragment>
          )
        })}
      
      </div>

    
    </div>
  );
};

export default Information;
