import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import moment from 'moment'
import { Language } from '@mui/icons-material'
import Panel from './components/Panel';
import SearchButton from './components/SearchButton';
import SearchBar from './components/SearchBar';
import Background from './components/Background';
import type { RootState } from './state/store'
import { useSelector, useDispatch } from 'react-redux'
import { change } from './state/reducers/cityReducer'

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

const App: React.FC = () => {
  const city = useSelector((state: RootState) => state.city)
  const dispatch = useDispatch()

  const [prevCity, setPrevCity] = useState(city)
  const [minute, setMinute] = useState<number>()
  const [input, setInput] = useState("")
  const [info, setInfo] = useState<null | undefined | weather>(undefined)
  const [home, setHome] = useState(true)
  const [userLat, setUserLat] = useState<undefined | number>(undefined)
  const [userLon, setUserLon] = useState<undefined | number>(undefined)

  function changeCity() {
    if (input !== "") {
      setPrevCity(city)
      dispatch(change(input))
      setInput("")
      setUserLat(undefined)
      setUserLon(undefined)
    } else {
      console.log('stop')
    }
  }

  function onChange(e: any) {
    if (e.key === 'Enter') {
      changeCity()
    } else {
      setInput(e.target.value)
    }
  }

  const success = (position: any) => {
    setUserLat(position.coords.latitude)
    setUserLon(position.coords.longitude)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, () => dispatch(change(input)))
  }, [])

  useEffect(() => {
    const temp = new Date()
    setMinute(temp.getMinutes())
    setInterval(() => {
      const date = new Date()
      if (minute !== date.getMinutes()) {
        setMinute(date.getMinutes())
      }
    }, 1000)
  }, [])

  useEffect(() => {
    let q

    if (userLat !== undefined) {
      q = userLat.toString() + "," + userLon?.toString()
    } else {
      q = city
    }

    let options = {
      method: 'GET',
      url: 'http://api.weatherapi.com/v1/current.json',
      params: { key: "fbdb0dc052b7415bbd1191735222407", q }
    }

    axios.request(options).then((res) => {
      setInfo(res.data)
    }).catch(() => {
      alert("Please enter a valid city name.")
      dispatch(change(prevCity))
    })
  }, [city, minute, userLat])

  const date = info?.location.localtime.split(" ")[0]
  const time = info?.location.localtime.split(" ")[1]

  return (
    <div className="App">
      <h1 className="Logo" onClick={() => setHome(!home)}><Language /> WeatherTime</h1>
      <div className='Cover' />
      <Background isDay={info?.current.is_day === 1} />
      <div style={{ position: 'absolute', top: '-100vh', marginLeft: 'auto', marginRight: 'auto', left: '0', right: '0', zIndex: '11' }} className={home ? "Home" : "Home away"} id="Info">
        <Panel borderRadius='lg' paddingY={1} paddingX={2} display="block" justifyContent='space-around'>
          <p className="Location"><strong>Author:</strong> Peter Lee</p>
          <p className="Location"><strong>API used:</strong> <a href="https://www.weatherapi.com/" target="_blank" style={{ color: 'white' }}>weatherapi.com</a></p>
        </Panel>
      </div>
      <div className={home ? "Home" : "Home away"}>
        <Panel borderRadius='lg' paddingY={2} paddingX={2} display="flex" justifyContent='space-around'>
          <div>
            <h1 className="Time">{time}</h1>
            <h1 className="Location">{moment(date).format('dddd, Do MMMM')}</h1>
            <h1 className="Location">{info?.location.name}, {info?.location.country}</h1>
          </div>
          <div>
            <p className="currently">Currently...</p>
            <div className="Time">{info?.current.temp_c}°C {info ? <img className="WeatherIcon" src={info?.current.condition.icon} alt="Icon" /> : null}</div>
          </div>
        </Panel>
        <Panel borderRadius='lg' paddingY={1} paddingX={2} display="block" justifyContent='space-around'>
          <h3 style={{ margin: '0 0 1rem 0', color: 'white' }}>Search for City</h3>
          <div className="InputCtn">
            <SearchBar value={input} onChange={onChange} changeCity={changeCity} />
            <SearchButton Search={changeCity} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

export default App;
