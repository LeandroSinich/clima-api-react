import React, { useState } from 'react'
import './styles/weatherStyles.css'

const ApiWeather = () => {

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  
  const apiKey = '8ac5d255d493a0e636d51280f3b0dfbd'

  const [ciudad, setCiudad] = useState('')
  const [previa, setPrevia] = useState(null)
  const [data, setData] = useState(null)

  const handleChange = (e) => {
    setCiudad(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(ciudad !== '') climaFetch()
  }

  const climaFetch = async () => {
    console.log('climafetch')
    try{
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${apiKey}`)
      const dat = await response.json()
      setData(dat)
      
      

    }catch(error){
      console.error(error)

    }
  }

  
  return (
    <>
      <div className='container'>
        <h1>Aplicacion del Clima</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='elige una ciudad'
            value={ciudad}
            onChange={handleChange}
          />
          <button>buscar</button>

        </form>
        {
          data && (
            data.cod == 200 ? (
              <div className='container'>
              <h2>{data.name}</h2>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
              <h3>{parseInt(data.main.temp - 273)}°C </h3>
              <h3>{data.weather[0].description}</h3>
              <h4>Humedad: {data.main.humidity}%</h4>
      
            </div>
            ) : (
              <h4>{data.message}</h4>
            )
            
            
            
          )
        }
      </div>

    </>
  )
}

export default ApiWeather