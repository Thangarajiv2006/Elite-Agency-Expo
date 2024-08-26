import { router } from "expo-router";
import createAxiosInstance from "../helpers/axios";
import { orderConstant } from "./constants";
import { downloadFromUrl, downloadFromAPI, save } from "../helpers/download";
import { backendUrls } from "../constants/urlConfig";
import { billLayout } from "../others/inovoicePdf";
import { printToFileAsync } from "expo-print";
import { Alert } from "react-native";

export const createOrder = (data, agencyData) => {
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
        dispatch({
          type: orderConstant.CREATE_ORDER_SUCCESS,
          payload: res.data,
        });

        const html = billLayout(
          agencyData,
          res.data.shop,
          res.data.orderedProducts,
          res.data.invoiceNo,
          res.data.createdAt
        );
        const file = await printToFileAsync({
          html: html,
          base64: false,
        });
        await save(
          file.uri,
          `${res.data.shop.shopName}${Date.now()}`,
          "application/pdf"
        ).then(() => {
          router.push(`/orders`);
          Alert.alert("Message", "PDF Created Successfully!");
        });
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
      dispatch({
        type: orderConstant.GET_ORDER_AXIOS_ERROR,
      });
    }
  };
};
