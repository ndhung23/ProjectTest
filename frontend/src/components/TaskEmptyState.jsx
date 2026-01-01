import React from 'react'
import { Card } from './ui/card'
import { Circle } from "lucide-react";

const TaskEmptyState = ({filter}) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="mx-auto size-12 text-muted-foreground" />
        <div>
          <h3 className="font-medium text-foreground">
            {filter === "active"
              ? "No mission doing."
              : filter === "completed"
              ? "No mission completed."
              : "No mission."}
          </h3>
          <p className="text-sm text-muted-foreground">
              {
                filter === 'all' 
                 ?  "Add first mission for start!"
                 : `Switch "All" to see missions' ${
                  filter === "active" ? "Completed." : "Doing." 
                 }`
              }
          </p>
        </div>
      </div>
    </Card>
  )
}

export default TaskEmptyState