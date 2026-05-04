import axios from "axios";

const BASE_URL = "http://20.207.122.201/evaluation-service";

export const fetchNotifications = async (token, page = 1, limit = 10, type = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page,
        limit,
        notification_type: type || undefined
      }
    });

    return response.data.notifications;
  } catch (error) {
    console.error(error);
    return [];
  }
};