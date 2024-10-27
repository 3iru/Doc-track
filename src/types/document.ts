import { User } from "./user"; 

export interface Document {
  id?: number; 
  docId: string; 
  docName: string; 
  employeeName: string; 
  dateIssued: string; 
  dateReturned?: string | null; 
  status: string; 
  userId: string; 
  createdAt?: Date; 
  updatedAt?: Date; 

  user?: User; 
}
