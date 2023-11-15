import React, { useEffect, useState } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { create, deletePerson, getAll, update } from './services/person'
import { Notification } from './components/Notification'

const App = () => {
    const [ persons, setPersons ] = useState([])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [filter, setFilter] = useState(persons)
    const [ message, setMessage ] = useState(null)
    const [ isError, setIsError ] = useState(false)

    useEffect(() => {
        getAll().then(initialPersons => setPersons(initialPersons))
    }, [])
    

    const handleInputPerson = ({ target }) => {
        setNewName(target.value)
    }

    const handleInputNumber = ({ target }) => {
        setNewNumber(target.value)
    }

    const handleInputFilter = ({ target }) => {
        setNameFilter(target.value)
        setFilter(persons.filter(({name}) => name.toLowerCase().includes(target.value.toLowerCase())))
    }

    const handleClickSubmit = (e) => {
        e.preventDefault()
        const foundPerson = persons.find(({ name }) => name === newName)
        if (foundPerson !== undefined) {
            if (window.confirm(`${newName} ya existe en la guia telefonica, desea reemplazar el antiguo numero por el nuevo`)) {
                const changedPerson = { ...foundPerson, number: newNumber }
                update(foundPerson.id, changedPerson).then(returnedPerson => {
                    setPersons(persons.map(person => person.id !== foundPerson.id ? person : returnedPerson))
                    setFilter(filter.map(person => person.id !== foundPerson.id ? person : returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setMessage(`Se actualizo el numero de la persona ${newName}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 6000)
                })
                .catch(error => {
                    setMessage(`Error -> La informacion de ${newName} ya no existe en el servidor`)
                    setIsError(true)
                    setTimeout(() => {
                        setMessage(null)
                        setIsError(false)
                    }, 6000)
                })
                
                return
            } else {
                setNewName('')
                setNewNumber('')
                return
            }
        }
        const newPerson = {
            name: newName,
            number: newNumber
        }
        create(newPerson).then(data => {
            setPersons(persons.concat(data))
            if (nameFilter.length === 0) setFilter(persons.concat(data))
            setNewName('')
            setNewNumber('')
        })
        setMessage(`Se añadio a ${newName} a la guia telefonica`)
        console.log(isError)
        setTimeout(() => {
            setMessage(null)
        }, 6000)
        console.log(isError)
    }

    const handleDeletePerson = (id, name) => {
        const res = window.confirm(`Desea eliminar a ${name} de la guia telefonica`)
        if(res) {
            deletePerson(id).then(data => {
                if (data === 200) {
                    setPersons(persons.filter(({ id:idPerson }) => idPerson !== id))
                    setFilter(filter.filter(({ id:idPerson }) => idPerson !== id))
                    setNameFilter('')
                }
            })
        }
    }

    return (
        <div>
            <h2>Guia Telefonica</h2>
            <Notification message={message} isError={isError} />
            <Filter handleInputFilter={handleInputFilter} nameFilter={nameFilter}/>
            <h2>Agregar nuevo</h2>
            <PersonForm name={newName} number={newNumber} handleInputPerson={handleInputPerson} handleInputNumber={handleInputNumber} handleClickSubmit={handleClickSubmit} />
            <h2>Numeros</h2>
            <Persons persons={(persons.length === filter.length || filter.length === 0) ? persons : filter} handleDeletePerson={handleDeletePerson} />
        </div>
    )


}

export {
    App
}
