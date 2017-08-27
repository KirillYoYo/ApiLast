import React from 'react';
import {Link, withRouter} from 'react-router-dom'


class AlbumsPage extends React.Component {
	constructor() {
		super()
	}

	render() {
		console.log('props 2')
		console.log(this.props)

		return (
			<div>Albums</div>
		)
	}
}
export default withRouter(AlbumsPage)