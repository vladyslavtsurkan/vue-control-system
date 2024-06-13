export interface ControllerCreateUpdate {
  name: string;
  description: string;
  ipAddress: string;
  port: number;
  readAddress: number;
  writeAddress: number;
  lowLimit: number;
  highLimit: number;
  isActive: boolean;
}

export interface Controller extends ControllerCreateUpdate {
  id: number;
  createdAt: string;
  updatedAt: string;
}