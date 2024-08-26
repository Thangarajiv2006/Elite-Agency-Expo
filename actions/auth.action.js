import { authConstant } from "./constants";
import { getData, storeData } from "../store/localStorage";
import { router } from "expo-router";
import createAxiosInstance from "../helpers/axios";

export const login = (formData) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGIN_REQUEST });
    const axios = await createAxiosInstance();
    try {
      const res = await axios.post("/agency/auth/login", formData);
      if (res.data.errorCode) {
        dispatch({
          type: authConstant.LOGIN_FAILURE,
          payload: res.data,
        });
      } else if (res.status === 201) {
        await storeData("token", res.data.token);

        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: res.data,
        });
        router.replace("/analytics");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: authConstant.AUTH_AXIOS_ERROR,
      });
    }
  };
};

export const isAldreadyLogin = (token) => {
  return async (dispatch) => {
    dispatch({
      type: authConstant.IS_ALDREADY_LOGIN_REQUEST,
    });
    const axios = await createAxiosInstance();
    try {
      const res = await axios.post("/agency/auth/isAldreadyLogin", { token });
      if (res.status === 201) {
        dispatch({
          type: authConstant.IS_ALDREADY_LOGIN_SUCCESS,
          payload: res.data,
        });
        router.replace("/analytics");
      } else if (res.data.errorCode) {
        dispatch({
          type: authConstant.IS_ALDREADY_LOGIN_FAILURE,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: authConstant.AUTH_AXIOS_ERROR,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    await storeData("token", "").then(() => {
      dispatch({ type: authConstant.LOGOUT_SUCCESS });
    });
    router.replace("/(auth)/sign-in");
  };
};
