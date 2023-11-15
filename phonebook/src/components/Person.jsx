import React from 'react'

const Person = ({ name, number, id, handleDeletePerson }) => {
    return (
        <li>{name} | {number} <button onClick={() => handleDeletePerson(id, name)}>Eliminar</button></li>
    )
}

export {
    Person
}