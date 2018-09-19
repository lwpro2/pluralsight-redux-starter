//this component handles the app template used on every page
import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Header loading={this.props.loading}/>
				{this.props.children}
			</div>
		);
	}
}

App.PropTypes = {
	children: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired
};

function mapStateToPros(state, ownProps) {
	return {
		loading: state.ajaxCallsInProgress > 0
	};
}

export default connect(mapStateToPros)(App);
