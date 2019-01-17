import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from './config/';

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
			</React.Fragment>
    	);
  	}
}

export default App;
