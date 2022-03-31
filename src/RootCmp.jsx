import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './routes.js';
import { socketService } from './services/socket.service.js';

export const RootCmp = () => {

	socketService.setup()

	return (
		<div>
			<main>
				<Switch>
					{routes.map((route) => (
						<Route
							key={route.path}
							component={route.component}
							path={route.path}
						/>
					))}
				</Switch>
			</main>
		</div>
	);
}
