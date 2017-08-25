import React from 'react'
import {Layout} from 'antd';


export default class Home extends React.Component {
	constructor() {
		super()
	}

	componentWillMount() {
		!localStorage.getItem('uid') ?
			this.props.history.replace('/login')
		: this.props.history.replace('/main')
	}

	render() {

		return (
			<Layout className="layout-home">
			</Layout>
		)
	}
}
