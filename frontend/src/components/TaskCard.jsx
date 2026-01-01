import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useState } from "react";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  //let isEditting = false;
  const [isEditting, setIsEditting] = useState(false); //Quan ly trang thai edit
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Mission had deleted");
      handleTaskChanged();
    } catch (error) {
      console.error("Error deleted task.", error);
      toast.error("Error deleted new task.");
    }
  };

  const updateTask = async() => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`,{
        title: updateTaskTitle
      });
      toast.success(`Mission had update ${updateTaskTitle}`)
      handleTaskChanged();
    } catch (error) {
        console.error("Error update task.",error);
        toast.error("Error update new task.");
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      updateTask();
    }
  };


  //
  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status === 'active'){
        await api.put(`/tasks/${task._id}`,{
          status: "complete",
          completedAt: new Date().toISOString(),
        })
        toast.success(`${task.title} had completed`)
      }else{
        await api.put(`/tasks/${task._id}`,{
          status: "active",
          completedAt: null,
        })
        toast.success(`${task.title} not completed`)
      }
      handleTaskChanged();
    } catch (error) {
        console.error("Error update task.",error);
        toast.error("Error update new task.");
    }
  }

  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75"
      )}
      style={{ AnimationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={toggleTaskCompleteButton}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>
        {/* hiển thị hoặc chỉnh sửa tiêu đề */}
        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Need doing ?"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={updateTaskTitle}
              onChange={(e) => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditting(false);
                setUpdateTaskTitle(task.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {task.title}
            </p>
          )}
          {/* ngày tạo & ngày hoàn thành */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {/* chuyen qua gio Viet Nam */}
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completeAt && (
              <>
                <span className="text-xs text-muted-foreground"> - </span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completeAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* nút chỉnh và xoá */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nút edit */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditting(true);
              setUpdateTaskTitle(task.title || "");
            }}
          >
            <SquarePen className="size-4" />
          </Button>
          {/* nút xoá */}
          <Button
            variant="ghost"
            size="icon"
            // destructive:hover dang mau red
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
