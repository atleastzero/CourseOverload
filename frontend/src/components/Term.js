import React from 'react'

import Course from './Course'

import './Term.css'

export default class Term extends React.Component {
  render() {
    const courses = (
      <ul>
        {this.state.courses.map(course => {
          return (
            <li key={course.id}>
              <Course
                dept={this.state.departments[course.department]}
                code={course.code}
                name={course.short_name}
                extName={course.long_name}
                description={course.description}
                units={course.units}
                prereqs={course.prerequisites}
                coreqs={course.corequisites}
                data-id={course.id}
              />
            </li>
          )
        })}
      </ul>
    )
    return (
      <div className="Swimlane-column">
        <div className="Swimlane-title">{this.props.name}</div>
        <div className="Swimlane-dragColumn" term={this.props.term} ref={this.props.dragulaRef}>
          {courses}
        </div>
      </div>);
  }

}
