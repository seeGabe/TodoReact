import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layouts/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import './App.css';

class App extends Component {
  state = {
    todos: [
      // {
      //   id: 1,
      //   title: 'push code',
      //   completed: true
      // },
      // {
      //   id: 2,
      //   title: 'cook dinner',
      //   completed: false
      // },
      // {
      //   id: 3,
      //   title: 'fly drones',
      //   completed: false
      // },
    ]
  }

  componentDidMount() {
    axios.get('https:jsonplaceholder.typicode.com/todos?_limit=10')
      .then(resp => {
        console.log(resp.data);
        this.setState({ todos:resp.data });
      })
  }

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
    console.log(id);
  }

  deleteTodo = (id) => {
    axios.delete(`https:jsonplaceholder.typicode.com/todos/${id}`)
      .then(resp => this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
      )

  }

  addTodo = (title) => {
    // const newTodo = {
    //   id: 4,
    //   title,
    //   completed: false
    // }
    // this.setState({ todos: [...this.state.todos, newTodo] })

    axios.post('https:jsonplaceholder.typicode.com/todos',
      {
        title,
        completed: false
      })
      .then(resp => this.setState({ todos:[ ...this.state.todos, resp.data] }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props =>(
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos}
                  toggleComplete={this.toggleComplete}
                  deleteTodo={this.deleteTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
