import { shopConstant } from "@/actions/constants";

const initialData = {
  shops: [],
  isEnded: false,
  isLoading: false,
  isRefreshing: false,
  errorCode: null,
  errorMessage: "",
};

export default (state = initialData, action) => {
  switch (action.type) {
    //CREATE SHOPS
    case shopConstant.CREATE_SHOP_REQUEST:
      state = {
        ...state,
        errorCode: null,
        errorMessage: "",
      };
      break;

    case shopConstant.CREATE_SHOP_SUCCESS:
      state = {
        ...state,
        shops: [...state.shops, action.payload],
      };
      break;
    case shopConstant.CREATE_SHOP_FAILURE:
      state = {
        ...state,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    //GET SHOPS
    case shopConstant.GET_SHOP_REQUEST:
      state = {
        ...state,
        isLoading: true,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
        isEnded: false,
      };
      break;
    case shopConstant.GET_SHOP_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    case shopConstant.GET_SHOP_SUCCESS:
      state = {
        ...state,
        shops: [...state.shops, ...action.payload],
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
        isEnded: action.payload.length ? false : true,
      };
      break;
    case shopConstant.GET_SHOP_AXIOS_ERROR:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: 100,
        errorMessage: "Sorry Something Wrong",
      };
      break;
    case shopConstant.REFRESH_SHOP_REQUEST:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: true,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case shopConstant.REFRESH_SHOP_SUCCESS:
      state = {
        ...state,
        shops: action.payload,
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
        isEnded: action.payload.length ? false : true,
      };
      break;
    case shopConstant.REFRESH_SHOP_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
  }

  return state;
};
