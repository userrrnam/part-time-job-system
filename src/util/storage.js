const userInfo = 'Token'
export function setToken(token) {
    localStorage.setItem(userInfo, token);
}

export function getToken() {
    return localStorage.getItem(userInfo);
}
export function removeToken() {
    return localStorage.removeItem(userInfo);
}