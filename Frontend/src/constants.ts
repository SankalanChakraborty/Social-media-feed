const API_BASE_URL = "http://localhost:8080";

export const enum LOGIN {
  ERROR_MESSAGE = "Invalid email or password",
  SUCCESS_MESSAGE = "Login successful",
  USER_NOT_FOUND = "User not found",
}

export const enum API {
  ERROR_STATUS = "Error",
  SUCCESS_STATUS = "OK",
}

export const enum TOAST {
  TYPE_SUCCESS = "success",
  TYPE_ERROR = "error",
}

export { API_BASE_URL };
