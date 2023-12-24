import request from "../utils/request";
import checkResponse from "../utils/check-response";

const config ={
  headers: {
    "Content-Type": "application/json",
    authorization: localStorage.getItem('accessToken')
  },
}

export function fetchIngredients() {
  const settings = {
    method: 'GET',
    headers: config.headers
  }

  return request('/ingredients', settings)
};

export const getOrderDetails = async (ingredients) => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'ingredients': ingredients
    })
  }

  return request('/orders', settings);
}

export const forgotPassword = (email) => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'email': email
    })
  }

  return request('/password-reset', settings);
}

export const resetPassword = (password, token) => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'password': password,
      'token': token
    })
  }

  return request('/password-reset/reset', settings);
}

export const register = (email, password, name) => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'email': email,
      'password': password,
      'name': name
    })
  }

  return request('/auth/register', settings);
}

export const refreshToken = () => {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    })
  }

  return request('/auth/token', settings);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken/*.split(' ')[1]*/);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  const settings = {
    method: 'GET',
    headers: config.headers
  }

  return request('/auth/user', settings);
}

export const updateUser = (email, name) => {
  const settings = {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      'email': email,
      'name': name,
    })
  }

  return request('/auth/user', settings);
}

export const login = (email, password) => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'email': email,
      'password': password,
    })
  }

  return request('/auth/login', settings);
}

export const logout = () => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'token': localStorage.getItem("refreshToken")
    })
  }

  return request('/auth/logout', settings);
}
