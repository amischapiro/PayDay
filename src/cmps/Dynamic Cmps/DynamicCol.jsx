export function TaskPreview({ task }) {
    //GET FROM STORE
    const cmpsOrder = [
      "status-picker",
      "member-picker",
      "date-picker",
      "priority-picker",
    ];
    return (
      <section>
        <h5>{task.txt}</h5>
        {cmpsOrder.map((cmp, idx) => {
          return (
            <DynamicCmp
              cmp={cmp}
              key={idx}
              onUpdate={(data) => {
                console.log("Updating: ", cmp, "with data:", data);
                // make a copy, update the task
                // Call action: updateTask(task)
              }}
            />
          );
        })}
      </section>
    );
  }
  
  
  
  
  import { StatusCmp } from "./StatusCmp.jsx";
  export function DynamicCmp({ cmp, info, onUpdate }) {
    switch (cmp) {
      case "status-picker":
      //   return <StatusCmp task={{ title: "Replace Logo", status: "Done" }} />;
        return <StatusCmp info={info} onUpdate={onUpdate}  />;
      case "member-picker":
      //   return <StatusCmp task={{ title: "Replace Logo", status: "Done" }} />;
        return <MemberPicker info={info} onUpdate={onUpdate}  />;
      default:
      }
      return <h1>Ctgs</h1>;
  }
  
  
  
  
  