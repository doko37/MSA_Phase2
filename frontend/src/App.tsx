import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import moment from 'moment'
import { Search, Language } from '@mui/icons-material'
import day from './images/tokyoday.jpg'
import night from './images/tokyonight.jpg'

type weather = {
  current: {
    condition: {
      text: String,
      icon: string
    }
    temp_c: number,
    is_day: number
  },

  location: {
    country: String,
    name: String,
    localtime: String
  }
}

function App() {
  const [city, setCity] = useState("Auckland")
  const [prevCity, setPrevCity] = useState(city)
  const [minute, setMinute] = useState<number>()
  const [input, setInput] = useState("")
  const [info, setInfo] = useState<null | undefined | weather>(undefined)
  const [home, setHome] = useState(true)
  const [userLat, setUserLat] = useState<undefined | number>(undefined)
  const [userLon, setUserLon] = useState<undefined | number>(undefined)

  function onChange(e: any) {
    setInput(e.target.value)
  }

  function changeCity() {
    setPrevCity(city)
    setCity(input)
    setInput("")
  }

  useEffect(() => {
    const temp = new Date()
    setMinute(temp.getMinutes())
    setInterval(() => {
      const date = new Date()
      if(minute != date.getMinutes()) {
        setMinute(date.getMinutes())
      }
    }, 1000)
  }, [])

  useEffect(() => {
    let options = {
      method: 'GET',
      url: 'http://api.weatherapi.com/v1/current.json',
      params: {key: process.env.REACT_APP_API_KEY, q: userLat === undefined ? city : [userLat, userLon]}
    }

    axios.request(options).then((res) => {
      setInfo(res.data)
    }).catch(() => {
      alert("Please enter a valid city.")
      setCity(prevCity)
    })
  }, [city, minute])

  const date = info?.location.localtime.split(" ")[0]
  const time = info?.location.localtime.split(" ")[1]

  const success = (position: any) => {
    setUserLat(51.5072)
    setUserLon(0.1276)
    // setUserLat(position.coords.latitude)
    // setUserLon(position.coords.longitude)
  }

  navigator.geolocation.getCurrentPosition(success, () => setCity("auckland"))

  return (
    <div className="App">
      <h1 className="Logo" onClick={() => setHome(!home)}><Language /> WeatherTime</h1>
      <div className='Cover' />
      <img className={info?.current.is_day === 1 ? "Background" : "Background hide"} src={day}/>
      <img className={info?.current.is_day === 1 ? "Background night hide" : "Background night"} src={night}/>
      {home ?
      <div>
        <div className="TextCtn">
          <div>
            <h1 className="Time">{time}</h1>
            <h1 className="Location">{moment(date).format('dddd, Do MMMM')}</h1>
            <h1 className="Location">{info?.location.name}, {info?.location.country}</h1>
          </div>
          <div>
            <p className="currently">Currently...</p>
            <div className="Time">{info?.current.temp_c}°C {info ? <img className="WeatherIcon" src={info?.current.condition.icon}/> : null}</div>
          </div>
        </div>
        <div className='BottomCtn'>
          <h3 style={{margin: '0 0 1rem 0', color: 'white'}}>Search for City</h3>
          <div className="InputCtn">
            <input value={input} onChange={onChange} onSubmit={changeCity}/>
            <Search className="SearchIcon" onClick={changeCity}/>
          </div>
        </div>
      </div> : <div className="BottomCtn">
          <p className="Location"><strong>Author:</strong> Peter Lee</p>
          <p className="Location"><strong>API used:</strong> <a href="https://www.weatherapi.com/" target="_blank" style={{color: 'white'}}>weatherapi.com</a></p>
      </div>}
    </div>
  );
}

export default App;
