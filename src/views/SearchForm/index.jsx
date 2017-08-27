import React from 'react';
import {Input, Button, Row, Col, message } from 'antd';
import './index.sass';
import {Link, withRouter} from 'react-router-dom'
import AlbumsPage from '../AlbumsPage'
const axios = require('axios');
const normalAxios = axios.create();


const apikey = 'e7894acb1775228a5278623d078c3b83';

class SearchForm extends React.Component {
	constructor() {
		super()
	}

	state = {
		visible: false,
		artists: null,
		columns: [],
		searchText: '',
		loading: false
	};

	async search() {
		this.setState({
			loading: true
		});
		if (this.state.searchText !== '') {
			try {
				let data = await normalAxios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.searchText}&api_key=${apikey}&format=json`,   {
					responseType: 'json',
				});
				this.setState({
					loading: false,
					artists: data.data.results.artistmatches.artist
				})
			} catch (e) {
				this.setState({
					loading: false,
				});
				message.error('Произошла ошибка, пожалуйста повторите запрос');
				throw(e)
			}
		} else {
			message.error('Ведите название артиста')
		}

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

	componentWillMount() {
		const { url } = this.props.match
		//this.routes = routeGen(url)
	}

	componentDidMount() {
		const { url } = this.props.match
		//this.props.routesNestedUpdate({ path: url, routes: this.routes })
	}

	render() {
		const {artists} = this.state;

		return (
			<div className="search-form-page">
				<h1>Search form</h1>
				<div className="page-inner">
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
					<div className="artists-list">
						<Link to={`/albumsPage`} >
							<div className="artist" >sdsdsd</div>
						</Link>
						{
							artists ?
								<div className="inner">
									{
										artists.length !== 0 ?
											artists.map((item, i) => {
												return (
													<Link key={i} to={`/albumsPage`} >
														<div className="artist" >{item.name}</div>
													</Link>
												)
											})
										: <div>По данному исполнителю не найдено не одной записи</div>
									}
								</div>
							: null
						}
					</div>
				</div>

			</div>
		)
	}
}
export default withRouter(SearchForm)