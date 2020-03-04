import React, { Component } from 'react';
import './App.css';

// react-redux : this one connect redux and react component
import { connect } from 'react-redux';
import { createTask } from './store/actions';

// import AuthFormContainer from './containers/AuthForm';
// import { FirebaseService } from './services';

import TasksPage from './components/TasksPage';

// FirebaseService.initializeApp()

class App extends Component {
  
  onCreateTask = (task) => {
    this.props.dispatch(createTask(task))
  }

  render() {
    console.log('props from App: ', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <h1>Chat Application</h1>
        </header>
        <main>
          <TasksPage tasks={this.props.tasks} onCreateTask={this.onCreateTask} />
        </main>
        <footer>
          <p>@ copyright 2020 - chat application service</p>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App)
