import { LoginSignup } from './pages/LoginSignup.jsx'
import { HomePage } from './pages/HomePage.jsx';
import { BoardApp } from './pages/BoardApp.jsx';

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
    {
        path: '/board',
        component:BoardApp
    }
];

export default routes;