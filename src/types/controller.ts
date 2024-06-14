export interface ControllerCreate {
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

export interface ControllerUpdate extends ControllerCreate{
  id: number
}

export interface Controller extends ControllerUpdate {
  createdAt: string;
  updatedAt: string;
}