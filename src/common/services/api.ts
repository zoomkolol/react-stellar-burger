import request from "../utils/request";
import checkResponse from "../utils/check-response";
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from "../utils/constants";

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: localStorage.getItem(ACCESS_TOKEN) ?? ''
  },
}

export function fetchIngredients() {
  const settings = {
    method: 'GET',
    headers: config.headers
  }

  return request('/ingredients', settings)
};

export const getOrderInfoFromNumber = async (number: string) => {
  try {
    const res = await fetch(BASE_URL + `/orders/${number}`,
      {
      method: 'GET',
      headers: config.headers
    });
    return await checkResponse(res);
  } catch (err) {
    if (err === "Ошибка 403") {
      refreshAuthToken();
      const res = await fetch(BASE_URL + `/orders/${number}`, {
        method: 'GET',
        headers: config.headers,
      });
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};


export const getOrderDetails = async (ingredients: string[]) => {
  try {
    const res = await fetch(BASE_URL + '/orders',
      {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        'ingredients': ingredients
      })
    });
    return await checkResponse(res);
  } catch (err) {
    if (err === "Ошибка 403") {
      refreshAuthToken();
      const res = await fetch(BASE_URL + '/orders', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          'ingredients': ingredients
        })
      });
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const forgotPassword = (email: string) => {
  const settings = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'email': email
    })
  }

  return request('/password-reset', settings);
}

export const resetPassword = (password: string, token: string) => {
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

export const register = (email: string, password: string, name: string) => {
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
      token: localStorage.getItem(REFRESH_TOKEN),
    })
  }

  return request('/auth/token', settings);
};

export const refreshAuthToken = async() => {
  const refreshData = await refreshToken();
  if (!refreshData.success) {
    return Promise.reject(refreshData);
  }
  localStorage.setItem(REFRESH_TOKEN, refreshData.refreshToken);
  localStorage.setItem(ACCESS_TOKEN, refreshData.accessToken);
}

export const fetchWithRefresh = async (url: string, email: string, name: string, password: string) => {
  try {
    const res = await fetch(url,
      {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        'email': email,
        'name': name,
        'password': password
      })
    });
    return await checkResponse(res);
  } catch (err) {
    if (err === "Ошибка 403") {
      refreshAuthToken();
      const res = await fetch(url, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          'email': email,
          'name': name,
          'password': password
        })
      });
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

export const login = (email: string, password: string) => {
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
      'token': localStorage.getItem(REFRESH_TOKEN)
    })
  }

  return request('/auth/logout', settings);
}
