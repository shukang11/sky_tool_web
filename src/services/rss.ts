import { BASE_URL, getToken } from "./../utils/config";
import request from "../utils/request";

export async function addRssLink(link: string): Promise<any> {
    var path: string = "/rss/add";
    var params: object = {token: localStorage.getItem('token'), 'source': link}
    return await request.post(`${BASE_URL}${path}`, {params})
}

export async function rssSourceList(page: number, limit: number): Promise<any> {
    var path: string = "/rss/limit";
    var params: object = {token: localStorage.getItem('token'), 'pages': page, 'limit': limit}
    return await request.get(`${BASE_URL}${path}`, {params})
}

export async function getRssContentList(page: number, limit: number): Promise<any> {
    var path: string = "/rss/limit";
    var params: object = {token: getToken(), 'pages': page, 'limit': limit}
    return await request.get(`${BASE_URL}${path}`, {params})
}
