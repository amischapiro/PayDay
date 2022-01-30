import { KanbanMembers } from './KanbanMembers'
import { KanbanDueDate } from './KanbanDueDate'

export function KanbanStory({story}) {
    return <div className="kanban-story-wrapper">
        <div className="kanban-story-header">
            {story.storyData.status && <div style={{backgroundColor: story.storyData.status.color}}></div>}
            {story.storyData.priority && <div style={{backgroundColor: story.storyData.priority.color}}></div>}
        </div>
        <h5>{story.title}</h5>
        <div className="kanban-story-footer">
            {story.dueDate && <KanbanDueDate story={story} />}
            {story.members && <KanbanMembers story={story} />}
        </div>
    </div>
}