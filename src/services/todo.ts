import { BASE_URL } from "./../utils/config";
import request from "../utils/request";
import { FilterStyle } from "src/reducers/todo";

export async function addTodo(content: string): Promise<any> {
  var path: string = "/todo/add";
  var params: object = { token: localStorage.getItem("token"), title: content };
  return await request.post(`${BASE_URL}${path}`, { params: params });
}

export async function finishTodo(id: number): Promise<any> {
  var path: string = "/todo/finish";
  var params: object = { token: localStorage.getItem("token"), todo_id: id };
  return await request.post(`${BASE_URL}${path}`, { params: params });
}

export async function removeTodo(id: number): Promise<any> {
  var path: string = "/todo/remove";
  var params: object = { token: localStorage.getItem("token"), todo_id: id };
  return await request.post(`${BASE_URL}${path}`, { params: params });
}

// undo done all
export async function filterTodo(filter: FilterStyle): Promise<any> {
  var path: string = `/todo/filter/${filter}`;
  var params: object = { token: localStorage.getItem("token"), 'filter': filter };
  return await request.post(`${BASE_URL}${path}`, { params: params });
}

export async function undoTodo(id: number): Promise<any> {
  var path: string = "/todo/undo";
  var params: object = { token: localStorage.getItem("token"), todo_id: id };
  return await request.post(`${BASE_URL}${path}`, { params: params });
}
