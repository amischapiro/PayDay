import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, signup } from '../store/user.action.js';
import { userService } from '../services/user.service.js';
import Logo from '../assets/img/PayDayLogo3.png';
import { loadBoards } from '../store/board.action.js';

const theme = createTheme()

export function LoginSignup() {

	const dispatch = useDispatch()
	const history = useHistory()

	const [message, setMessage] = useState('')
	const [googleId, setGoogleId] = useState('')
	const location = useLocation();
	const isSignUp = location.pathname !== '/login';

	function getPath() {
		return isSignUp ? '/login' : '/signup';
	}

	useEffect(() => {
		(async () => {
			const res = await userService.getGoogleId()
			setGoogleId(res)
		})();
	}, [])


	const onLoginSignup = async (type, user) => {
		try {
			if (type === 'signup') await dispatch(signup(user))
			else await dispatch(login(user))

			const boards = await dispatch(loadBoards())
			const boardId = boards[0]?._id ?? null
			history.push(`/board/${boardId}/board`)
		} catch (err) {
			throw err
		}

	}


	const handleSubmit = async (ev) => {
		ev.preventDefault();
		const data = new FormData(ev.currentTarget);
		if (isSignUp) {
			const user = {
				fullname: `${data.get('firstName')} ${data.get('lastName')}`,
				username: data.get('username'),
				password: data.get('password'),
			}
			await onLoginSignup('signup', user)
		} else {
			const user = {
				username: data.get('username'),
				password: data.get('password'),
			}
			try {
				await onLoginSignup('login', user)
			} catch (err) {
				setMessage('Invalid username or password')
				console.log(err);
			}
		}
	}

	const responseGoogle = async (response) => {

		const userObj = response.profileObj;
		const googleUser = {
			fullname: userObj.name,
			username: userObj.email,
			imgUrl: userObj.imageUrl,
			password: response.tokenId,
		}
		try {
			await onLoginSignup('login', googleUser)
		} catch {
			await onLoginSignup('signup', googleUser)
		}
	}

	const hideMessage = useCallback(() => {
		setTimeout(() => {
			setMessage('')
		}, 3000)
	}, [])


	return (
		<section className="login-signup flex column align-center">
			<div className="login-signup-header">
				<Link className='back-home-link' to='/'>
					<img src={Logo} alt="PD" /><span>ayDay</span>
				</Link>
			</div>
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							{isSignUp ? 'Sign up' : 'Login'}
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								{isSignUp && (
									<React.Fragment>
										<Grid item xs={12} sm={6}>
											<TextField
												autoComplete="given-name"
												name="firstName"
												required
												fullWidth
												id="firstName"
												label="First Name"
												autoFocus
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												required
												fullWidth
												id="lastName"
												label="Last Name"
												name="lastName"
												autoComplete="family-name"
											/>
										</Grid>
									</React.Fragment>
								)}
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="username"
										label="Username"
										name="username"
										autoComplete="username"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="new-password"
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}>
								{isSignUp ? 'Sign up' : 'login'}
							</Button>
							{message && (
								<div className="msg-container" ref={hideMessage}>{message}</div>
							)}
							<Grid container justifyContent="flex-end">
								<Grid item>
									{isSignUp ? <div>
										<span>Already have an account? </span><Link to={getPath} variant="body2">Login</Link>
									</div> : <div>
										<span>Don't have an account? </span><Link to={getPath} variant="body2">Sign up</Link>
									</div>}
								</Grid>
							</Grid>
						</Box>

					</Box>
				</Container>
			</ThemeProvider>
			<div className="or-separator">
				<span className="separator-line"></span>
				<h5>Or</h5>
				<span className="separator-line"></span>
			</div>
			{
				googleId && (
					<GoogleLogin
						className="google-signin-btn"
						clientId={googleId.id}
						onSuccess={responseGoogle}
						cookiePolicy={'single_host_origin'}
					/>
				)
			}
		</section >
	);
}