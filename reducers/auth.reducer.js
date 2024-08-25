import { authConstant } from "@/actions/constants";

const initialState = {
  agencyDetails: {
    AgencyName: "",
    houseNo: "",
    street: "",
    village: "",
    district: "",
    state: "",
    stateCode: "",
    pincode: "",
    name: "",
    mobile: "",
    email: "",
    FSSAI: "",
    PAN: "",
    GSTIN: "",
    password: "",
  },
  token: "",
  isLoading: false,
  isLogined: false,
  errorCode: null,
  errorMessage: "",
};

export default (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        isLoading: true,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case authConstant.LOGIN_FAILURE:
      state = {
        ...state,
        isLoading: false,
        isLogined: false,
        errorCode: action.payload.errorCode,
        errorMessage: action.payload.errorMessage,
      };
      break;
    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        agencyDetails: action.payload.agencyDetails,
        token: action.payload.token,
        isLogined: true,
        isLoading: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case authConstant.IS_ALDREADY_LOGIN_REQUEST:
      state = {
        ...state,
        isLoading: true,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case authConstant.IS_ALDREADY_LOGIN_SUCCESS:
      state = {
        ...state,
        agencyDetails: action.payload.agencyDetails,
        token: action.payload.token,
        isLogined: true,
        isLoading: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
    case authConstant.IS_ALDREADY_LOGIN_FAILURE:
      state = {
        ...state,
        isLogined: false,
        isLoading: false,
      };

    case authConstant.LOGOUT_SUCCESS:
      state = {
        agencyDetails: {
          AgencyName: "",
          houseNo: "",
          street: "",
          village: "",
          district: "",
          state: "",
          stateCode: 33,
          pincode: "",
          name: "",
          mobile: "",
          email: "",
          FSSAI: "",
          PAN: "",
          GSTIN: "",
          password: "",
        },
        token: "",
        isLoading: false,
        isLogined: false,
        errorCode: null,
        errorMessage: "",
      };
      break;

    case authConstant.AUTH_AXIOS_ERROR:
      state = {
        agencyDetails: {
          AgencyName: "",
          houseNo: "",
          street: "",
          village: "",
          district: "",
          state: "",
          stateCode: 33,
          pincode: "",
          name: "",
          mobile: "",
          email: "",
          FSSAI: "",
          PAN: "",
          GSTIN: "",
          password: "",
        },
        token: "",
        isLoading: false,
        isLogined: false,
        errorCode: null,
        errorMessage: "",
      };
      break;
  }
  return state;
};
