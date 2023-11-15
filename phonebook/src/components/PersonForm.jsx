import React from 'react'

const PersonForm = ({ name, number, handleInputPerson, handleInputNumber, handleClickSubmit }) => {
    return (
        <form onSubmit={handleClickSubmit}>
            <div>
                nombre: <input type='text' value={name} onChange={handleInputPerson}/>
            </div>
            <div>
                numero: <input type='text' value={number} onChange={handleInputNumber} />
            </div>
            <div>
                <button type='submit'>
                    Add
                </button>
            </div>
        </form>
    )
}

export {
    PersonForm
}
