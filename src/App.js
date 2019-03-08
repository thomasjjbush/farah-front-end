import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { routes } from './config/';
import Contact from './containers/contact/Contact';

class App extends Component {
  	render() {
    	return (
			<React.Fragment>
				<Switch>
					{routes.map(({ path, exact, component }, i) => {
						return (
							<Route 
								key={i}
								path={path}
								exact={exact}
								component={component}
							/>
						);
					})}
				</Switch>
				{this.props.location.pathname.split('/')[1] !== 'admin' && 
					<Contact 
						open={this.props.location.hash === "#contact"}
						pathname={this.props.location.pathname}
					/>
				}
			</React.Fragment>
    	);
  	}
}

export default withRouter(App);
