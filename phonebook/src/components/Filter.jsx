import React from 'react'

const Filter = ({ handleInputFilter, nameFilter }) => {
    return (
        <div>
            filtar por: <input type='text' value={nameFilter} onChange={handleInputFilter} />
        </div>
    )
}

export {
    Filter
}