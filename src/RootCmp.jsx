import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';
import routes from './routes.js';
import { socketService } from './services/socket.service.js';
import { loadBoards } from './store/board.action.js';

export const RootCmp = () => {

	socketService.setup()
	const dispatch = useDispatch()
	const { loggedinUser } = useSelector(({ userModule }) => userModule)

	// Change it back to board app!

	const onLoad = useCallback(async () => {
		await dispatch(loadBoards())
	}, [dispatch])

	useEffect(() => {
		console.log(loggedinUser?.fullname);
		onLoad()
	}, [loggedinUser, onLoad])

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
