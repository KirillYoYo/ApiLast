import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import {BrowserRouter} from 'react-router-dom'
import configureStore from './store/configureStore';
import rootSaga from './sagas/sagas'
import './index.sass';
import Root from './envs/Root';

const store = configureStore();
store.runSaga(rootSaga)

render(
	<LocaleProvider locale={enUS}>
		<BrowserRouter>
		<AppContainer>
			<Root
				store={ store }
			/>
		</AppContainer>
		</BrowserRouter>
	</LocaleProvider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./envs/Root', () => {
		const RootContainer = require('./envs/Root');
		render(
			<LocaleProvider locale={enUS}>
				<BrowserRouter>
				<AppContainer>
					<RootContainer
						store={ store }
					/>
				</AppContainer>
				</BrowserRouter>
			</LocaleProvider>,
			document.getElementById('root')
		);
	});
}
