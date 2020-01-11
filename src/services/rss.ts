import { BASE_URL, getToken } from "./../utils/config";
import request from "../utils/request";

/* 添加订阅源 */
export async function addRssLink(link: string): Promise<any> {
  var path: string = "/rss/add";
  var params: object = { token: localStorage.getItem("token"), source: link };
  return await request.post(`${BASE_URL}${path}`, { params });
}

/* 获得订阅源列表 */
export async function rssSourceList(page: number, limit: number): Promise<any> {
  var path: string = "/rss/limit";
  var params: object = {
    token: localStorage.getItem("token"),
    pages: page,
    limit: limit
  };
  return await request.get(`${BASE_URL}${path}`, { params });
}

/* 获得订阅内容链接 */
export async function getRssContentList(
  page: number,
  limit: number
): Promise<any> {
  var path: string = "/rss/content/limit";
  var params: object = { token: getToken(), pages: page, limit: limit };
  return await request.get(`${BASE_URL}${path}`, { params });
}

/* 设置链接已读 */
export async function readRssContent(content_id: number): Promise<any> {
  var path: string = "/rss/content/reading/";
  path += String(content_id);
  var params: object = { token: getToken() };
  return await request.post(`${BASE_URL}${path}`, { params });
}

/* 翻转收藏状态 */
export async function toggleRssContentCollect(
  content_id: number
): Promise<any> {
  var path: string = "/rss/content/toggleCollect/";
  path += String(content_id);
  var params: object = { token: getToken() };
  return await request.post(`${BASE_URL}${path}`, { params });
}

/* 对内容进行评分 */
export async function rateRssContent(
  content_id: number,
  rate_value: number
): Promise<any> {
  var path: string = "/content/rate/";
  path += String(content_id);
  path += String(rate_value);
  var params: object = { token: getToken() };
  return await request.post(`${BASE_URL}${path}`, { params });
}
