// import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
// import thunkMiddleware from 'redux-thunk';
//
// import promiseMiddleware from '../middlewares/promiseMiddleware'
//
// import reducer from '../reducers';
//
// const createStoreWithMiddleware = applyMiddleware(
// 	thunkMiddleware,
// 	promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})
// )(createStore);

// export default function configureStore(initialState) {
// 	let store;
//
// 	if (process.env.NODE_ENV === 'development') {
// 		const persistState = require('redux-devtools').persistState;
// 		const DevTools = require('../envs/DevTools').default;
//
// 		const enhancer = compose(
// 			DevTools.instrument(),
// 			persistState(
// 				window.location.href.match(
// 					/[?&]debug_session=([^&#]+)\b/
// 				)
// 			)
// 		);
// 		store = createStoreWithMiddleware(reducer, initialState, enhancer);
//
// 		if (module.hot) {
// 			module.hot.accept('../reducers', () =>
// 				store.replaceReducer(require('../reducers').default)
// 			);
// 		}
// 	} else {
// 		store = createStoreWithMiddleware(reducer, initialState);
// 	}
//
// 	return store;
// }


import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers'



export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware()

	const persistState = require('redux-devtools').persistState;
	const DevTools = require('../envs/DevTools').default;

	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				sagaMiddleware,
			),
			DevTools.instrument(),
			persistState(
				window.location.href.match(
					/[?&]debug_session=([^&#]+)\b/
				)
			)
		)
	)

	if (process.env.NODE_ENV === 'development') {
		const persistState = require('redux-devtools').persistState;
		const DevTools = require('../envs/DevTools').default;

		// const enhancer = compose(
		// 	DevTools.instrument(),
		// 	persistState(
		// 		window.location.href.match(
		// 			/[?&]debug_session=([^&#]+)\b/
		// 		)
		// 	)
		// );
		//store = createStoreWithMiddleware(reducer, initialState, enhancer);

		if (module.hot) {
			module.hot.accept('../reducers', () =>
				store.replaceReducer(require('../reducers').default)
			);
		}
	}


	store.runSaga = sagaMiddleware.run
	store.close = () => store.dispatch(END)
	return store
}