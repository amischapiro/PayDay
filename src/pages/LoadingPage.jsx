import { BoardList } from "../cmps/BoardList"
import { Loader } from "../cmps/layout/Loader"
import { SideBar } from "../cmps/SideBar"

export const LoadingPage = () => {

    return (
        <main className="main-container">
            <SideBar />
            <BoardList />
            <Loader />
        </main>
    )
}