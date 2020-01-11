// export const BASE_URL = 'http://0.0.0.0:5011';
export const BASE_URL = 'http://0.0.0.0:9000';

// export const BASE_URL = 'http://192.168.1.160:5011';

export function getToken(): string {
    return localStorage.getItem('token')
}

