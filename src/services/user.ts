import MD5 from "md5";
import { BASE_URL } from "./../utils/config";
import request from "../utils/request";

export async function login(name: string, password: string): Promise<any> {
  password = MD5(password);
  const url = `${BASE_URL}/api/user/login`;
  return await request.post(url , {
    params: { email: name, password: password }
  });
}

export async function register(name: string, password: string): Promise<any> {
  password = MD5(password);
  return await request.post(`${BASE_URL}/api/user/register`, {
    params: { email: name, password: password }
  });
}
