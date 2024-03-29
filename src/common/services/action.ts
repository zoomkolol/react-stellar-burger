import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./user";
import {login as apiLogin, getUser as apiGetUser, logout as apiLogout, register as apiRegister, fetchWithRefresh, refreshAuthToken} from "./api";
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN } from "../utils/constants";
import { LoginPayload, User } from "../types/types";
import { AppDispatch } from "../../app/store";

export const register = (email: string, password: string, name: string) => {
  return(dispatch: AppDispatch) => {
    return apiRegister(email, password, name)
    .then((res) => {
      localStorage.setItem(ACCESS_TOKEN, res.accessToken);
      localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
      dispatch(setUser(res.user));
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export const getUser = () => {
    return (dispatch: AppDispatch) => {
        return apiGetUser()
        .then((res) => {
            dispatch(setUser(res.user));
        })
        .catch((error) => {
          console.log(error);
        })
    };
};

export const updateUser = (email: string, name: string, password: string) => {
    return (dispatch: AppDispatch) => {
      return fetchWithRefresh(BASE_URL + '/auth/user', email, name, password)
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .catch((error) => {
        console.log(error);
      })
    }
}

export const login = createAsyncThunk<User, LoginPayload>(
    "user/login",
    async ({email, password}) => {
        const res = await apiLogin(email, password);
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        localStorage.setItem(REFRESH_TOKEN, res.refreshToken);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch: AppDispatch) => {
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
