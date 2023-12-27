import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./user";
import {login as apiLogin, getUser as apiGetUser, logout as apiLogout, register as apiRegister, fetchWithRefresh} from "./api";
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from "../utils/constants";


export const register = (email, password, name) => {
  return(dispatch) => {
    return apiRegister(email, password, name).then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.accessToken);
      localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
      dispatch(setUser(res.user));
    })
  }
}

export const getUser = () => {
    return (dispatch) => {
        return apiGetUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const updateUser = (email, name, password) => {
    return (dispatch) => {
      return fetchWithRefresh(BASE_URL + '/auth/user', email, name, password).then((res) => {
        dispatch(setUser(res.user));
      })
    }
}

export const login = createAsyncThunk(
    "user/login",
    async ({email, password}) => {
        const res = await apiLogin(email, password);
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};


export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await apiLogout();
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
    }
);
