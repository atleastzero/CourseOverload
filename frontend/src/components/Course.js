import React from 'react'

import './Course.css'

const Course = props => {
  return (
    <div className="Card" priority={this.props.priority} data-id={this.props.id} data-status={this.state.status}>
      <strong className="Card-title">{props.dept} {props.code}</strong>
      <p>{props.name}</p>
      <small>{props.units}</small>
    </div>
  )
}

export default Course
