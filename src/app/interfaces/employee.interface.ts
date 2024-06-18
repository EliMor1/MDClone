import { Report } from "./manager.interface";
export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    managerId: number | null;
    tasks: Task[];
    reports :Report[];
  }
  
  export interface Task {
    taskId: number;
    taskText: string;
    assignDate: Date;
    dueDate: Date;
  }
  