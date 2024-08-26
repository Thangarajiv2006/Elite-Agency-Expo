import createAxiosInstance from "../helpers/axios";
import { productConstant } from "./constants";

export const createProduct = (data) => {
  return async (dispatch) => {
    dispatch({
      type: productConstant.CREATE_PRODUCT_REQUEST,
    });

    try {
      const axios = await createAxiosInstance();

      const formData = new FormData();

      formData.append("name", data.name.trim());
      formData.append("MRP", data.MRP.trim());
      formData.append("netPrice", data.netPrice.trim());
      formData.append("price", data.price.trim());
      formData.append("HSN", data.HSN.trim());
      formData.append("SGST", data.SGST.trim());
      formData.append("CGST", data.CGST.trim());

      formData.append("pic", {
        uri: data.pic.uri,
        type: data.pic.mimeType,
        name: data.pic.fileName,
      });
      const res = await axios.post("/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.errorCode) {
        dispatch({
          type: productConstant.CREATE_PRODUCT_FAILURE,
          payload: {
            ...res.data,
          },
        });
      } else if (res.status === 201) {
        dispatch({
          type: productConstant.CREATE_PRODUCT_SUCCESS,
          payload: {
            ...res.data,
          },
        });
      }
    } catch (error) {}
  };
};

const getLimitedData = async (path, start, end) => {
  const axios = await createAxiosInstance();
  const res = await axios.post(path, { start, end });
  return res;
};

export const getAllProducts = (start, end) => {
  return async (dispatch) => {
    dispatch({
      type: productConstant.GET_ALL_PRODUCT_REQUEST,
    });
    try {
      const res = await getLimitedData("/product/get", start, end);
      if (res.data.errorCode || res.status === 100) {
        dispatch({
          type: productConstant.GET_ALL_PRODUCT_FAILURE,
          payload: {
            ...res.data,
          },
        });
      } else if (res.status === 200) {
        dispatch({
          type: productConstant.GET_ALL_PRODUCT_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: productConstant.GET_ALL_PRODUCT_AXIOS_ERROR,
      });
    }
  };
};

export const refreshProducts = () => {
  return async (dispatch) => {
    dispatch({
      type: productConstant.REFRESH_REQUEST,
    });
    try {
      const res = await getLimitedData("/product/get", 0, 10);
      if (res.data.errorCode || res.status === 100) {
        dispatch({
          type: productConstant.REFRESH_FAILURE,
          payload: {
            ...res.data,
          },
        });
      } else if (res.status === 200) {
        dispatch({
          type: productConstant.REFRESH_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: productConstant.GET_ALL_PRODUCT_AXIOS_ERROR,
      });
    }
  };
};
