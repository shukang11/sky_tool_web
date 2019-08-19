import { BASE_URL } from "./../utils/config";
import request from "../utils/request";

export async function login(name: string, password: string): Promise<any> {
  return await request.post(`${BASE_URL}/api/user/login`, {
    params: { email: name, password: password }
  });
}

export async function register(name: string, password: string): Promise<any> {
  return await request.post(`${BASE_URL}/api/user/register`, {
    params: { email: name, password: password }
  });
}
