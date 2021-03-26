import React, { Component } from "react"
import { render } from "react-dom"

import Dragula from 'dragula'

import Term from './Term'

import 'dragula/dist/dragula.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allCourses: [],
      departments: {},
      courses: [],
      terms: {
        "taken": [],
        "2021-2022 - Term 1": [],
        "2021-2022 - Term 2": [],
        "2021-2022 - Term 3": [],
        "2021-2022 - Term 4": [],
        "2021-2022 - Term 5": [],
        "2022-2023 - Term 1": [],
        "2022-2023 - Term 2": [],
        "2022-2023 - Term 3": [],
        "2022-2023 - Term 4": [],
        "2022-2023 - Term 5": [],
        "inventory": []
      },
      loaded: false,
      placeholder: "Loading..."
    }
    this.drake = Dragula({
      isContainer: function (el) {
        return el.classList.contains('Swimlane-dragColumn');
      },
      moves: function (el, source, handle, sibling) {
        return true;
      },
    })
    this.swimlanes = Object.assign(
      {}, ...Object.keys(this.state.terms).map(term => ({[term]: React.createRef()}))
    )
    this.getAll()
    this.setupOnDrop()
  }

  getAll() {
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
            allCourses: courses,
            inventory: courses
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


  setupOnDrop() {
    this.drake.on('drop', (el, target, source, sibling) => {
      const elementInfo = this.state.allCourses.filter(item => {
        return item.id === parseInt(el.getAttribute("data-id"));
      })[0];
      elementInfo.term = target.getAttribute('term');
      if (sibling) {
        elementInfo.priority = parseInt(sibling.getAttribute('priority'));
      } else {
        elementInfo.priority = -1
      }

      let newBacklog = this.state.allClients.filter(client => client.status && client.status === 'backlog' && client.id !== elementInfo.id);
      let newInProgress = this.state.allClients.filter(client => client.status && client.status === 'in-progress' && client.id !== elementInfo.id);
      let newComplete = this.state.allClients.filter(client => client.status && client.status === 'complete' && client.id !== elementInfo.id);

      if (target.getAttribute('status') === 'backlog') {
        if (elementInfo.priority === -1) {
          elementInfo.priority = newBacklog.length + 1;
        }
      } else if (target.getAttribute('status') === 'in-progress') {
        if (elementInfo.priority === -1) {
          elementInfo.priority = newInProgress.length + 1;
        }
      } else if (target.getAttribute('status') === 'complete') {
        if (elementInfo.priority === -1) {
          elementInfo.priority = newComplete.length + 1;
        }
      }

      this.drake.cancel(true);

      fetch("api/courses/" + elementInfo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status: elementInfo.status, priority: elementInfo.priority, }),
      })
        .then(async (res) => {
          return await res.json();
        })
        .then((result) => {
          Object.keys(this.state.terms).map((term) => {
            terms = this.state.terms
            terms[term] = result
                            .filter(client => client.term && client.term === term)
                            .sort(this.compareCards())
            this.setState({
              terms
            })
          })
        })
        .catch(() => {})
    });
  }

  renderSwimlane(name, courses, ref) {
    return (
      <Term name={name} courses={courses} dragulaRef={ref}/>
    )
  }

  render() {
    return (
      <div className="Flowchart">
        <div className="container-fluid">
          <div className="row">
            {Object.keys(this.state.terms).map((term) => {
              <div className="col-md-4">
                {this.renderSwimlane(term, this.state.terms[term], this.swimlanes[term])}
              </div>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App

const container = document.getElementById('app')
render(<App />, container)