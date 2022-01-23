export function DynamicColHeaders({cmp}) {
    
    let data = {};
    
    switch(cmp) {
        case 'member-picker':
            data = {name: 'People', width: "97px", bgColor: "inherit"};
            break;
        case 'status-picker':
            data = {name: 'Status', width: "117px", bgColor: "#f5f6f8"};
            break;
        case 'priority-picker':
            data = {name: 'Priority', width: "92px", bgColor: "inherit"};
            break;
        case 'timeline-picker':
            data = {name: 'Timeline', width: "180px", bgColor: "inherit"};
            break;
        case 'number-picker':
            data = {name: 'Estimated SP', width: "125px", bgColor: "inherit"};
            break;
        case 'link-picker':
            data = {name: 'Link to Design', width: "140px", bgColor: "inherit"};
            break;
        default:
            break;
    }

    return (
        <div className="dynamic-cmp" style={{width: data.width, backgroundColor: data.bgColor}}>{data.name}</div>
    )
}