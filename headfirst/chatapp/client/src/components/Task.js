import React from 'react';

const Task = props => {
	return (
		<div className="task">
			<h4>{props.task.title}</h4>
			<p>{props.task.description}</p>			
		</div>
	);
}

export default Task;
