import { type Document } from "./document";

export interface User {
  id: string; 
  email: string; 
  password?: string; 
  role: string | null; 
  createdAt: Date;
  updatedAt: Date; 
  documents?: Document[]; 
}
