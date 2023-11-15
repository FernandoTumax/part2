import React from 'react'

const Total = ({ parts = [] }) => {
    let suma
    const { exercises } = parts.reduce((s, p) => {
        return {
            exercises: s.exercises + p.exercises
        }
    })
    return (
        <strong> Numero de ejercicio { exercises } </strong>
    )
}

export {
    Total
}