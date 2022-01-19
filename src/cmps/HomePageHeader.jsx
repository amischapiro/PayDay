import { Link } from "react-router-dom"


export function HomePageHeader(){
    return(
        <nav>
            <Link to={'/signup'}>Sign up / Log in</Link>
        </nav>
    )
}