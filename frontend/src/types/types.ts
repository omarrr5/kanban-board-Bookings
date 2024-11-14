export type TaskStatus = "unclaimed" | "firstContact" | "preparingWorkOffer" | "sendToTherapist";

export interface Task {
  id: string;
  name: string;
  title: string;
  age: string;
  email: string;
  mobile: string;
  status: TaskStatus; 
}
