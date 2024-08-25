import { productConstant } from "@/actions/constants";

const initialData = {
  products: [],
  isEnded: false,
  isLoading: false,
  isRefreshing: false,
  errorCode: null,
  errorMessage: "",
};

export default (state = initialData, action) => {
  switch (action.type) {
    //CREATE PRODUCTS
    case productConstant.CREATE_PRODUCT_REQUEST:
      state = {
        ...state,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case productConstant.CREATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: [action.payload, ...state.products],
        errorCode: null,
        errorMessage: "",
      };
      break;
    case productConstant.CREATE_PRODUCT_FAILURE:
      state = {
        ...state,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    //GET ALL PRODUCTS
    case productConstant.GET_ALL_PRODUCT_REQUEST:
      state = {
        ...state,
        isLoading: true,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case productConstant.GET_ALL_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: [...state.products, ...action.payload],
        isEnded: action.payload.length ? false : true,
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case productConstant.GET_ALL_PRODUCT_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    case productConstant.GET_ALL_PRODUCT_AXIOS_ERROR:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: 500,
        errorMessage: "Sorry, Something Wrong Wrong",
      };
      break;
    //REFRESH CONTROL
    case productConstant.REFRESH_REQUEST:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: true,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case productConstant.REFRESH_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    case productConstant.REFRESH_SUCCESS:
      state = {
        ...state,
        products: action.payload,
        isEnded: action.payload.length ? false : true,
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
  }

  return state;
};
