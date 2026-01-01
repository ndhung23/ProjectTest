import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";
//import axios from "axios";

const AddTask = ({handleNewTaskAdded}) => {
  //luu gia tri
  const [newTaskTile,setNewTaskTitle] = useState("");
  //gui yeu cau len sever
  const addTask = async () => {
    if(newTaskTile.trim()){
      try {
        //await axios.post("http://localhost:5001/api/tasks",{title:newTaskTile})
        await api.post("/tasks", { title: newTaskTile });
        toast.success(`Mission ${newTaskTile} added.`);
        handleNewTaskAdded();
      } catch (error) {
        console.error("Error add task.",error);
        toast.error("Error add new task.");
      }
      // Reset ve empty
      setNewTaskTitle("");
    }else{
      toast.error("You need input content of mission");
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div>
      <Card className="p-6 border-0 bg-gradient-card 
      shadow-custom-lg">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input type="text"
                placeholder="Cần phải làm gì?"
                className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 
                focus:border-primary/50 focus:ring-primary/20"
                value={newTaskTile}
                onChange={(even) => setNewTaskTitle(even.target.value)}
                // khi user bam 1 phim tren ban phim thi kich hoat
                onKeyPress={handleKeyPress}
          />
          <Button 
            variant="gradient"
            size="xl"
            className="px-6"
            onClick={addTask}
            disabled={!newTaskTile.trim()}
          >
              <Plus  className="size-5" />Add
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AddTask