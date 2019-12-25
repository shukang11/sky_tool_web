import MD5 from "md5";
import { BASE_URL, getToken } from "./../utils/config";
import request from "../utils/request";

export async function upload(data: FormData): Promise<any> {
    const url = `${BASE_URL}/storage/upload`;
    return await request.post(url , {
      params: { token: getToken() },
      data: data,
    });
  }