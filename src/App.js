import React, { Component } from 'react';
import FormContainer from './containers/FormContainer';

class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="columns">
					<div className="col-md-9 centered"> 
						<h3>React.js Controlled Form Compontents</h3>
						<FormContainer />
					</div>
				</div>
			</div>
		);
	}
}

export default App;