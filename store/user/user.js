import localStorage from "@react-native-async-storage/async-storage";
import { setTokenHeader } from "../tokenHeader";

export const userInitial = {
  isAuthenticated: false,
  isVerified: false,
  user: null,
};

// Login initial/Reducer
export const initialLogin = {
  username: "",
  password: "",
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  error: "",
};

export function loginReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "login":
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        username: "",
        password: "",
      };
    case "error":
      return {
        ...state,
        isError: true,
        error: action.message,
        isLoading: false,
        username: "",
        password: "",
      };
    case "removeError":
      return {
        ...state,
        isError: false,
        error: "",
      };
    default:
      return state;
  }
}

// Register initial/Reducer
export const initialSignUp = {
  username: "",
  password: "",
  rePassword: "",
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  error: "",
};

export function signUpReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "signUp":
      return {
        ...state,
        isLoading: true,
        isError: false,
        error: "",
      };
    case "success":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        username: "",
        password: "",
        rePassword: "",
        isError: false,
      };
    case "error":
      return {
        ...state,
        isError: true,
        error: action.message,
        isLoading: false,
        username: "",
        password: "",
        rePassword: "",
      };
    case "removeError":
      return {
        ...state,
        isError: false,
        error: "",
      };
    default:
      return state;
  }
}

export const logout = () => {
  localStorage.clear();
  setTokenHeader(false);
};
