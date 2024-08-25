import { orderConstant } from "@/actions/constants";

const initialData = {
  orders: [],
  isEnded: false,
  isLoading: false,
  isRefreshing: false,
  errorCode: null,
  errorMessage: "",
};

export default (state = initialData, action) => {
  switch (action.type) {
    case orderConstant.CREATE_ORDER_REQUEST:
      state = {
        ...state,
        isLoading: true,
        errorCode: null,
        errorMessage: "",
        isRefreshing: false,
      };
      break;
    case orderConstant.CREATE_ORDER_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    case orderConstant.CREATE_ORDER_SUCCESS:
      state = {
        ...state,
        orders: [action.payload, ...state.orders],
        isLoading: false,
        errorCode: null,
        errorMessage: "",
        isRefreshing: false,
      };
      break;
    case orderConstant.CREATE_ORDER_AXIOS_ERROR:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case orderConstant.GET_ORDER_REQUEST:
      state = {
        ...state,
        isLoading: true,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case orderConstant.GET_ORDER_SUCCESS:
      state = {
        ...state,
        orders: [...state.orders, ...action.payload],
        isEnded: action.payload.length ? false : true,
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case orderConstant.GET_ORDER_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    case orderConstant.GET_ORDER_AXIOS_ERROR:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: 500,
        errorMessage: "Sorry, Something Wrong Wrong",
      };
      break;
    case orderConstant.REFRESH_ORDER_REQUEST:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: true,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case orderConstant.REFRESH_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload,
        isEnded: action.payload.length ? false : true,
        isLoading: false,
        isRefreshing: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case orderConstant.REFRESH_ORDER_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isRefreshing: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
  }

  return state;
};
