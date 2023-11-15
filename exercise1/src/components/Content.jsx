import React from 'react'
import { Part } from './Part'

 const Content = ({ parts = [] }) => {
    return (
        <>
            { parts.map(({ name, exercises, id }) => {
                return <Part part={name} exercise={exercises} key={id} />
            })}
        </>
    )
}

export {
    Content
}
