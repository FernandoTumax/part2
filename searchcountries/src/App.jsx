import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Countries } from './components/Countries'

const App = () => {

    const [ filter, setFilter ] = useState('')
    const [ countries, setCountries ] = useState([])
    const [filterCountries, setFilterCountries] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(response => {
            setCountries(response.data)
        })
    }, [])

    const handleInputFilter = ({ target }) => {
        setFilter(target.value)
        setFilterCountries(countries.filter(({ name }) => name.common.toLowerCase().includes(target.value.toLowerCase())))
        console.log(filterCountries)
    }
    
    

    return (
        <>
            <div>
                find countries: <input type='text' value={filter} onChange={handleInputFilter} />
            </div>
            <div>
                { (filterCountries.length > 10 || filterCountries.length === 0) ? <p>Hay muchos paises, por favor sea más especifico</p> : <Countries countries={filterCountries} country={null} /> } 
            </div>
        </>
    )
}

export {
    App
}
