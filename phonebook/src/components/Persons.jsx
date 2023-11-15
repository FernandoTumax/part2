import React from 'react'
import { Person } from './Person'

const Persons = ({ persons = [], handleDeletePerson }) => {
    return (
        <ul>
            { persons.map(({ name, number, id }) => {
                return <Person key={name} name={name} number={number} id={id} handleDeletePerson={handleDeletePerson}/>
            }) }
        </ul>
    )
}

export {
    Persons
}
