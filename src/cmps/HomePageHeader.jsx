import { Link } from "react-router-dom"


export function HomePageHeader(){
    return(
        <nav>
            <Link className="header-link" to={'/signup'}>Sign up / Log in</Link>
        </nav>
    )
}