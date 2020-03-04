import React, { Component } from 'react';
import Task from './Task';
import TaskList from './TaskList';

const TASK_STATUSES = ['Pending', 'Inprogress', 'Completed']

class TasksPage extends Component {

	constructor(props) {		
		super(props)
		this.state = {
			showNewCardForm: false,
			task: {
				title: '',
				description: ''
			}
		}
		// bind
		this.handleChange = this.handleChange.bind(this)
	}

	renderTaskList() {
		const { tasks } = this.props		
		return TASK_STATUSES.map(status => {
			const statusTasks = tasks.filter(task => task.status === status) 
			return <TaskList key={status} tasks={statusTasks} />
		})
	}

	onToggleForm = () => {
		this.setState(prevState => ({
			showNewCardForm: !prevState.showNewCardForm
		}))
	}

	onCreateTask = (e) => {
		e.preventDefault()
		this.props.onCreateTask(this.state.task)
		this.resetForm()
	}

	resetForm = () => {
		this.setState(prevState => ({
			task : {
				title: '',
				description: '',
			}
		}))
	}

  handleChange(event) {  	
  	const el = event.target
    this.setState(prevState => ({
    	task: {...prevState.task, [el.id]: el.value}
    }))
  }	

	render() {
		const { task, showNewCardForm } = this.state
		return (
			<div className="tasks-page">
				<div className="tasks-page-header">
					<p>{showNewCardForm ? 'show' : 'not show'}</p>
					<button onClick={this.onToggleForm}>Add Task</button>
					{showNewCardForm && (
						<form action="#" className="new-card-form" onSubmit={this.onCreateTask}>
			        <div>
			          <label htmlFor="title">title</label>
			          <input
			            type="text"
			            id="title"
			            value={task.title}
			            onChange={this.handleChange}
			          />
			        </div>
			        <div>
			          <label htmlFor="description">description</label>
			          <input
			            type="text"
			            id="description"
			            value={task.description}
			            onChange={this.handleChange}
			          />
			        </div>
			        <button type="submit">Submit</button>			        
						</form>
					)}
				</div>
				<div className="task-lists">
					{this.renderTaskList()}
				</div>
			</div>
		)
	}
}

export default TasksPage