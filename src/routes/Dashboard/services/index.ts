import request from '../../../utils/request';
import { BASE_URL } from "../../../utils/config";

export async function dashboardInfo(): Promise<any> {
    var path: string = "/dashboard/info";
    var params: object = {token: localStorage.getItem('token')};
    return await request.get(`${BASE_URL}${path}`, {params})
}