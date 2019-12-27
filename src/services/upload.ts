import MD5 from "md5";
import { BASE_URL, getToken } from "./../utils/config";
import request from "../utils/request";

/* 上传文件到主站 */
export async function upload(data: FormData): Promise<any> {
  const url = `${BASE_URL}/storage/upload`;
  return await request.post(url, {
    params: { token: getToken() },
    data: data
  });
}

/* 获得文件列表 */
export async function getFileList(page: number, limit: number): Promise<any> {
  const url = `${BASE_URL}/storage/files`;
  var params: object = { token: getToken(), pages: page, limit: limit };
  return await request.get(url, {
    params
  });
}
