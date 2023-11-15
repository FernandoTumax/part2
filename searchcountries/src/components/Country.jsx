import React from 'react'

const Country = ({ country, weather }) => {
    const { name, capital, population, languages, flags } = country

    const countryLanguages = Object.values(languages)
    return (
        <>
            <div>
                <h1>{name.common}</h1>
                <p>Capital: <strong>{capital[0]}</strong></p>
                <p>Poblicacion: <strong>{population}</strong></p>
            </div>
            <div>
                <h1>Lenguajes</h1>
                <ul>
                    { countryLanguages.map(language => {
                        return <li key={language}>{language}</li>
                    }) }
                </ul>
            </div>
            <img src={flags.png} alt='bandera'/>
            { (weather) && <div>
                <h1>Weather in {capital[0]}</h1>
                <p><strong>temperature:</strong> {weather.temperature} Celcius</p>
                <img src={weather.weather_icons[0]} alt='temperatura'/>
                <p><strong>wind:</strong> {weather.wind_speed} mph direccion {weather.wind_dir}</p>
            </div> }
        </>
    )
}

export {
    Country
}
