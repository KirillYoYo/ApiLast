import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Button, Row, Col, Icon, message} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {login} from '../../actions/auth'
const FormItem = Form.Item

import './index.sass'

const propTypes = {
	user: PropTypes.object,
	loggingIn: PropTypes.bool,
	loginErrors: PropTypes.string
};

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== this.props.user) {
			if (nextProps.user) {
				localStorage.setItem('uid', nextProps.user.uid);
				this.props.history.replace('/main/searchForm');
			}
		}
	}

	componentWillMount () {
		if (localStorage.getItem('uid')) {
			this.props.history.replace('/main/searchForm');
		}
	}

	shouldComponentUpdate  () {
		return !localStorage.getItem('uid')
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			loading: true
		});
		const data = this.props.form.getFieldsValue()
		this.props.login(data.user, data.password)
		this.setState({
			loading: false
		});
	}

	toRegister() {
		this.props.history.replace('/register');
	}

	render() {
		const {getFieldDecorator} = this.props.form
		return (
			<Row className="login-row" type="flex" justify="space-around" align="middle">
				<Col span="8">
					<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)} className="login-form">
						<h2 className="logo"><span>logo</span></h2>
						<FormItem>
							{getFieldDecorator('user')(
								<Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder='admin'/>
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password')(
								<Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type='password'
								       placeholder='123456'/>
							)}
						</FormItem>
						<p>
							<Button className="btn-login" type='primary' size="large" icon="poweroff"
							        loading={this.state.loading} htmlType='submit'>Log</Button>
						</p>
						<p>
							<Button className="btn-register" size="large" icon="right-square-o" htmlType='button'
							        onClick={this.toRegister.bind(this)}>Registration</Button>
						</p>
					</Form>
				</Col>
			</Row>

		)
	}
}

Login.propTypes = propTypes;

Login = Form.create()(Login);

function mapStateToProps(state) {
	const {auth} = state;
	if (auth.user) {
		return {user: auth.user, loggingIn: auth.loggingIn, loginErrors: ''};
	}

	return {user: null, loggingIn: auth.loggingIn, loginErrors: auth.loginErrors};

}

function mapDispatchToProps(dispatch) {
	return {
		login: bindActionCreators(login, dispatch)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
