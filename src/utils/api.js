import axios from "axios";
import { reactive } from "vue";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const apiError = reactive({
  show: false,
  message: "",
});

function showApiError(message, duration = 8000) {
  apiError.show = true;
  apiError.message = message;

  setTimeout(() => {
    apiError.show = false;
    apiError.message = "";
  }, duration);
}

async function apiWrapper(promise) {
  try {
    const res = await promise;

    if (res.data?.success === false) {
      showApiError(res.data.message || "Something went wrong");
      return { success: false };
    }

    return { success: true, data: res.data };
  } catch (error) {
    let message = "Something went wrong";

    if (error.response) {
      message = error.response.data.message || message;
    } else if (error.request) {
      message = "Server not responding";
    } else {
      message = error.message;
    }

    showApiError(message);
    return { success: false };
  }
}

// GET
export const fetchDataFromApi = (url, params = {}) =>
  apiWrapper(api.get(url, { params }));

// POST
export const postDataToApi = (url, data) => apiWrapper(api.post(url, data));

// PUT
export const putDataToApi = (url, data) => apiWrapper(api.put(url, data));

// DELETE
export const deleteDataFromApi = (url) => apiWrapper(api.delete(url));
