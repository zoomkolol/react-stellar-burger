import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./user";
import {login as apiLogin, getUser as apiGetUser, logout as apiLogout, updateUser as apiUpdateUser} from "./api";

export const getUser = () => {
    return (dispatch) => {
        return apiGetUser().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const updateUser = (email, name) => {
    return (dispatch) => {
      return apiUpdateUser(email, name).then((res) => {
        dispatch(setUser(res.user));
      })
    }
}

export const login = createAsyncThunk(
    "user/login",
    async ({email, password}) => {
        const res = await apiLogin(email, password);
        localStorage.setItem("accessToken", res.accessToken/*.split(' ')[1]*/);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);
