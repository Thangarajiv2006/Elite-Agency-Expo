import { router } from "expo-router";
import createAxiosInstance from "../helpers/axios";
import { orderConstant } from "./constants";
import { downloadFromUrl, downloadFromAPI } from "../helpers/download";
import { backendUrls } from "../constants/urlConfig";

export const createOrder = (data) => {
  return async (dispatch) => {
    dispatch({
      type: orderConstant.CREATE_ORDER_REQUEST,
    });
    try {
      const axios = await createAxiosInstance();
      const res = await axios.post("/order/create", data);
      if (res.data.errorCode) {
        dispatch({
          type: orderConstant.CREATE_ORDER_FAILURE,
          payload: {
            ...res.data,
          },
        });
      } else if (res.status === 201) {
        console.log(res.data);
        downloadFromUrl(
          backendUrls.public + res.data.pdf + ".pdf",
          `${res.data.pdf}.pdf`
        );
        dispatch({
          type: orderConstant.CREATE_ORDER_SUCCESS,
          payload: res.data,
        });
        router.push(`/orders`);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: orderConstant.CREATE_ORDER_AXIOS_ERROR,
      });
    }
  };
};

const getLimitedData = async (path, start, end) => {
  const axios = await createAxiosInstance();
  const res = await axios.post(path, { start, end });
  return res;
};

export const getOrders = (start, end) => {
  return async (dispatch) => {
    dispatch({
      type: orderConstant.GET_ORDER_REQUEST,
    });
    try {
      const res = await getLimitedData("/order/get", start, end);
      if (res.data.errorCode || res.status === 100) {
        dispatch({
          type: orderConstant.GET_ORDER_FAILURE,
          payload: {
            ...res.data,
          },
        });
      } else if (res.status === 200) {
        dispatch({
          type: orderConstant.GET_ORDER_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: orderConstant.GET_ORDER_AXIOS_ERROR,
      });
    }
  };
};

export const refreshOrders = () => {
  return async (dispatch) => {
    dispatch({
      type: orderConstant.REFRESH_ORDER_REQUEST,
    });
    try {
      const res = await getLimitedData("/order/get", 0, 10);
      if (res.data.errorCode || res.status === 100) {
        dispatch({
          type: orderConstant.REFRESH_ORDER_FAILURE,
          payload: {
            ...res.data,
          },
        });
      } else if (res.status === 200) {
        dispatch({
          type: orderConstant.REFRESH_ORDER_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: orderConstant.GET_ORDER_AXIOS_ERROR,
      });
    }
  };
};
