import React, { useState } from 'react'
import { Country } from './Country'
import axios from 'axios'

const token = process.env.REACT_APP_API_KEY

const Countries = ({ countries = [], country:countryApp }) => {

    const [ selectedCountry, setSelectedCountry ] = useState(countryApp)
    const [ weather, setWeather ] = useState({})

    const showCountry = (country) => {
        const { capital, name } = country
        axios.get(`http://api.weatherstack.com/current?access_key=${token}&query=${capital[0]}, ${name.common}`).then(response => {
            if (response.data?.success === false) {
                setWeather(null)
            } else {
                setWeather(response.data.current)
            }
            setSelectedCountry(country)
        })
    }

    return (
        <>
            { (countries.length > 1) ? countries.map((country, i) => {
                return (
                    <p key={country.altSpellings[0]}>{country.name.common} <button onClick={() => showCountry(country)}>Mostrar</button></p>
                )
            }) : <Country country={countries[0]} /> }
            { selectedCountry && <Country country={selectedCountry} weather={weather}/> }
        </>
    )
}

export {
    Countries
}
