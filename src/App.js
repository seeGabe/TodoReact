import React, { Component } from 'react';
import Todos from './components/Todos'

import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'push code',
        completed: false
      },
      {
        id: 2,
        title: 'cook dinner',
        completed: false
      },
      {
        id: 3,
        title: 'fly drones',
        completed: false
      },
    ]
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

  render() {
    return (
      <div className="App">
        <h1>TODO App</h1>
        <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} />
      </div>
    );
  }
}

export default App;
