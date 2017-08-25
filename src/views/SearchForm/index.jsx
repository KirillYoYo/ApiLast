import React from 'react';
import {Input, Button, Row, Col } from 'antd';

export default class SearchForm extends React.Component {
	constructor() {
		super()
	}

	state = {
		visible: false,
		tableData: [],
		columns: [],
		searchText: ''
	};

	search() {
		console.log(this.state.searchText)
	}
	onSearch(e) {
		if (e.target.value === '') {
			this.setState({
				searchText: e.target.value
			})
		} else {
			this.setState({
				searchText: e.target.value
			})
		}

	}

	render() {
		console.log('render')

		return (
			<div className="search-form-page">
				<h1>Search form</h1>
				<div className="search">
					<Row>
						<Col span={8}>
							<Input
								type="text"
								placeholder="Искать..."
								onChange={this.onSearch.bind(this)}
							/>
						</Col>
						<Col span={16}>
							<Button type="primary" onClick={this.search.bind(this)}>
								Искать
							</Button>
						</Col>
					</Row>


				</div>
			</div>
		)
	}
}
