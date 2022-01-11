
const userInfo = 'token'
export function setToken(token) {
    localStorage.setItem(userInfo, token);
  }
  
  export function getToken() {
    return localStorage.getItem('token');
  }
  