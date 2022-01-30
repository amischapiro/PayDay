
export function KanbanGroup({provided, group}) {
    return <div className="kanban-group">
        <div className="kanban-group-header">
            <span className="kanban-group-drag">
                
            </span>
            <h5 className="kanban-group-title">
                {group.title}
            </h5>
        </div>
    </div>
}