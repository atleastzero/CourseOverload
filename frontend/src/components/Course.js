import React from 'react'

const Course = props => {
  return (
    <div>
      <strong>{props.dept} {props.code}</strong>
      <p>{props.name}</p>
      <small>{props.units}</small>
    </div>
  )
}

export default Course