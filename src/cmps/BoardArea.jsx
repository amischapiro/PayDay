import {BoardHeader} from '../cmps/BoardHeader'
import {BoardActions} from '../cmps/BoardActions'
import {GroupList} from '../cmps/GroupList'



export function BoardArea(){
    return (
        <section className='board-area'>
            <BoardHeader />
            <BoardActions />
            <GroupList />
        </section>
    )
}