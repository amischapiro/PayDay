import { LoginSignup } from './pages/LoginSignup.jsx'
import { HomePage } from './pages/HomePage.jsx';

const routes = [
    {
        path: '/login',
        component: LoginSignup
    },
    {
        path: '/signup',
        component: LoginSignup
    },
    {
        path: '/',
        component: HomePage
    },
];

export default routes;