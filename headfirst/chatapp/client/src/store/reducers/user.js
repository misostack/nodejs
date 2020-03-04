const initialState = {
  user: null,
  isLogged: false
};
const user = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {...state, ...action.payload}
		case 'LOGOUT':
			return {...state, ...action.payload}
		default :
			return state
	}
}

export default user