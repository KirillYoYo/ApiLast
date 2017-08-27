import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import configureStore from './store/configureStore';
import rootSaga from './sagas/sagas'
import './index.sass';
import Root from './envs/Root';

const store = configureStore();
store.runSaga(rootSaga)

render(
	<LocaleProvider locale={enUS}>
		<AppContainer>
			<Root
				store={ store }
			/>
		</AppContainer>
	</LocaleProvider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./envs/Root', () => {
		const RootContainer = require('./envs/Root');
		render(
			<LocaleProvider locale={enUS}>
				<AppContainer>
					<RootContainer
						store={ store }
					/>
				</AppContainer>
			</LocaleProvider>,
			document.getElementById('root')
		);
	});
}
