export const doLogin = (user) => ({
  type: 'LOGIN',
  payload: {
    user: user
  }
})
export const doLogout = () => ({
  type: 'LOGOUT',
  payload: {
    user: null
  }
})

let _id = 1

export const uniqueId = () => _id++

export const createTask = ({title, description}) => ({
	type: 'CREATE_TASK',
	payload: {
		id: uniqueId(),
		title,
		description,
		status: 'Pending'
	}
})