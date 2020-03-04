import { createStore } from "redux";
import rootReducer from "./reducers/index";

import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(rootReducer, {}, devToolsEnhancer());

console.log(store.getState())

store.subscribe(() => {
	console.log('current state: ', store.getState())
})

// store.dispatch({ type: 'LOGIN', payload: {
// 	user: {
// 		email: 'miso',
// 		pass: '123'
// 	}
// }})

export default store;