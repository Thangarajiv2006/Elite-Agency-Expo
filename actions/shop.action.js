import createAxiosInstance from "../helpers/axios";
import { shopConstant } from "./constants";

export const createShop = (formData) => {
  return async (dispatch) => {
    const axios = await createAxiosInstance();

    dispatch({
      type: shopConstant.CREATE_SHOP_REQUEST,
    });

    try {
      const res = await axios.post("/shops/create", formData);
      if (res.data.errorCode) {
        dispatch({
          type: shopConstant.CREATE_SHOP_FAILURE,
          payload: {
            ...res.data,
          },
        });
      } else if (res.status === 201) {
        dispatch({
          type: shopConstant.CREATE_SHOP_SUCCESS,
          payload: {
            ...res.data,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const getLimitedData = async (path, start, end) => {
  const axios = await createAxiosInstance();
  const res = await axios.post(path, { start, end });
  return res;
};

export const fetchShops = (start, end) => {
  return async (dispatch) => {
    dispatch({
      type: shopConstant.GET_SHOP_REQUEST,
    });
    try {
      const res = await getLimitedData("/shops/get", start, end);
      if (res.data.errorCode) {
        dispatch({
          type: shopConstant.GET_SHOP_FAILURE,
          payload: res.data,
        });
      } else {
        dispatch({
          type: shopConstant.GET_SHOP_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: shopConstant.GET_SHOP_AXIOS_ERROR,
      });
    }
  };
};

export const refreshShops = () => {
  return async (dispatch) => {
    dispatch({
      type: shopConstant.REFRESH_SHOP_REQUEST,
    });
    try {
      const res = await getLimitedData("/shops/get", 0, 10);
      if (res.data.errorCode) {
        dispatch({
          type: shopConstant.REFRESH_SHOP_FAILURE,
          payload: res.data,
        });
      } else {
        dispatch({
          type: shopConstant.REFRESH_SHOP_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: shopConstant.GET_SHOP_AXIOS_ERROR,
      });
    }
  };
};
