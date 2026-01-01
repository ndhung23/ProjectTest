import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

const TaskList = ({filteredTasks,filter, handleTaskChanged}) => {
  // Test data
  // let filter = 'all';
  // const filteredTasks = [
  //   {
  //     _id: "1",
  //     title: "Hi",
  //     status: "active",
  //     completedAt: null,
  //     createAt: new Date(),
  //   },
  //   {
  //     _id: "2",
  //     title: "Hi2",
  //     status: "complete",
  //     completedAt: new Date(),
  //     createAt: new Date(),
  //   },
  // ]
  //let filter = 'all';
  if(!filteredTasks || filteredTasks.length === 0){
    return <TaskEmptyState filter={filter} />;
  }

  return <div className="space-y-3">
      {filteredTasks.map((task, index) => (
        <TaskCard
          key={task._id ?? index}
          task={task}
          index={index}
          handleTaskChanged={handleTaskChanged}
        />
      ))}
  </div>;
};

export default TaskList;
