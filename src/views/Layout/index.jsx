import React from 'react';
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Affix, Row, Col} from 'antd';
import {Route, Redirect, Switch} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import AlbumsPage from '../AlbumsPage'
import SearchForm from '../SearchForm'


import {childRoutes} from '@/route'
import Sidebar from '@/components/Sidebar'
import {logout} from '../../actions/auth';

import './index.sass';

const {Content} = Layout;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			artistName: null
		}
	}

	componentWillMount() {
		if (!localStorage.getItem('uid')) {
			this.props.history.replace('/login');
		}
	}

	shouldComponentUpdate  (nextProps) {
		return !localStorage.getItem('uid') ||
		//		костылик
		nextProps.location !== this.props.locations
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.auth !== nextProps.auth) {
			if (!nextProps.auth.user) {
				localStorage.removeItem('uid');
				this.props.history.replace('/login');
			}
		}
	}

	setArtistId (name) {
		this.setState({
			artistName: name
		})
	}

	render() {
		return (
			<Layout className="ant-layout-has-sider">
				{/*<Sidebar />*/}
				<Layout>
					<Content style={{margin: '0 16px'}}>
						<div style={{minHeight: 360}}>
							<Redirect to="/searchForm"/>
							<Route path="/albumsPage" render={() => (
								<AlbumsPage artistName={this.state.artistName}/>
							)}/>
							<Route path="/searchForm" render={() => (
								<SearchForm setArtistId={this.setArtistId.bind(this)} />
							)}/>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

App.propTypes = {
	auth: PropTypes.object,
	navpath: PropTypes.array
};

const mapStateToProps = (state) => {
	const {auth, menu} = state;
	return {
		auth: auth ? auth : null,
		navpath: menu.navpath
	};
};

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ logout}, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
