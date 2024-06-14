import axios, { type AxiosResponse } from "axios";
import Cookies from "js-cookie";

import config from "@/api/config";
import type {LoginResponse, RegisterUserAlreadyExistsResponse, User} from "@/types/auth";
import type {Controller, ControllerCreate, ControllerUpdate} from "@/types/controller";

export const api = axios.create({
  baseURL: config.API_URL_V1,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  Cookies.set("token", token, { sameSite: "None", secure: true, expires: 1/24 });
};

export const clearToken = () => {
  delete api.defaults.headers.common.Authorization;
  Cookies.remove("token", { sameSite: "None", secure: true });
};

export const login = async (username: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
  const data = new FormData();
  data.append("username", username);
  data.append("password", password);
  return await api.post<LoginResponse>("/auth/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const register = async (
  email: string, firstName: string, lastName: string, password: string
): Promise<AxiosResponse<User | RegisterUserAlreadyExistsResponse>> => {
  return await api.post<User>("/auth/register", {
    email,
    firstName,
    lastName,
    password,
  });
}

export const logout = async (): Promise<AxiosResponse> => {
  return await api.post("/auth/logout");
};

export const getControllers = async (): Promise<AxiosResponse<Controller[]>> => {
  return await api.get<Controller[]>("/controllers/my");
};

export const getController = async (id: number): Promise<AxiosResponse<Controller>> => {
  return await api.get<Controller>(`/controllers/${id}`);
};

export const createController = async (controller: ControllerCreate): Promise<AxiosResponse<Controller>> => {
  return await api.post<Controller>("/controllers", controller);
};

export const updateController = async (controller: ControllerUpdate): Promise<AxiosResponse<Controller>> => {
  return await api.put<Controller>(`/controllers/${controller.id}`, controller);
};

export const deleteController = async (id: number): Promise<AxiosResponse> => {
  return  await api.delete(`/controllers/${id}`);
};

export const readControllerData = async (id: number): Promise<AxiosResponse> => {
  return await api.get(`/controllers/${id}/data`);
}

export const writeControllerData = async (id: number, data: number): Promise<AxiosResponse> => {
  return await api.post(`/controllers/${id}/data`, { data });
}