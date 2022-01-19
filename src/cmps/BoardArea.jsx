import {BoardHeader} from '../cmps/BoardHeader'
import {BoardActions} from '../cmps/BoardActions'
import {GroupList} from '../cmps/GroupList'



export function BoardArea(){
    return (
        <section>
            <BoardHeader />
            <BoardActions />
            <GroupList />
        </section>
    )
}