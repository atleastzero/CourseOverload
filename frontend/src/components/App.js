import React, { Component } from "react"
import { render } from "react-dom"

import Course from './Course'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      departments: {},
      courses: [],
      loaded: false,
      placeholder: "Loading..."
    }
  }

  componentDidMount() {
    fetch("api/courses")
      .then(res => {
        if (res.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" }
          })
        }
        return res.json()
      })
      .then(courses => {
        this.setState(() => {
          return {
            courses
          }
        })

        fetch("api/departments")
          .then(res => {
            if (res.status > 400) {
              return this.setState(() => {
                return { placeholder: "Something went wrong!" }
              })
            }
            return res.json()
          })
          .then(depts => {
            let departments = Object.assign(
              {}, ...depts.map(dept => ({[dept.id]: dept.code}))
            )
            this.setState(() => {
              return {
                departments,
                loaded: true
              }
            })
          })
      })
  }

  render() {
    return (
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
              />
            </li>
          )
        })}
      </ul>
    )
  }
}

export default App

const container = document.getElementById('app')
render(<App />, container)