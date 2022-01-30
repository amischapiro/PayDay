import { KanbanMembers } from './KanbanMembers'
import { KanbanDueDate } from './KanbanDueDate'

export function KanbanStory({story}) {
    return <div className="kanban-story-wrapper">
        <div className="kanban-story-header">
            {story.status && <div backgroundColor={story.status.color}></div>}
            {story.priority && <div backgroundColor={story.priority.color}></div>}
        </div>
        <h5>{story.title}</h5>
        <div className="kanban-story-footer">
            {story.dueDate && <KanbanDueDate story={story} />}
            {story.members && <KanbanMembers story={story} />}
        </div>
    </div>
}