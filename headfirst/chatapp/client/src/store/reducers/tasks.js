import { uniqueId } from '../actions'
const mockTasks = [
  {
    id: uniqueId(),
    title: 'Learn Redux',
    description: 'Redux is a predictable state container for Javascript apps',
    status: 'Pending',
  },
  {
    id: uniqueId(),
    title: 'Redux Components',
    description: 'store, actions, reducers',
    status: 'Inprogress',
  },
  {
    id: uniqueId(),
    title: 'Redux with React',
    description: 'store, actions, reducers',
    status: 'Completed',
  }  
]

const tasks = (state = mockTasks, action) => {
	if (action.type == 'CREATE_TASK') {
		return [...state, action.payload]
	}
	return state
}

export default tasks