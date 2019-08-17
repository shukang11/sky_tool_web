import request from '../utils/request';

export async function login(name: string, password: string): Promise<any> {
    return request.post(`/api/user/login`, {data: {'name': name, 'password': password}});
}