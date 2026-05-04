const axios = require("axios");

console.log("Script started...");

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0eWEuMjYyMjRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsImV4cCI6MTc3Nzg3NzUwNywiaWF0IjoxNzc3ODc2NjA3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmViZTYwNDktZGZjOS00ZWI1LTg3YjItZGYyYTQ1NTZjMmU0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdHlhIG1haGxhd2F0Iiwic3ViIjoiNWY5YzlmOTMtMWQ0Yi00N2JiLWFiM2ItZjlmYzE2MDI1ZWFlIn0sImVtYWlsIjoiYWRpdHlhLjI2MjI0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJuYW1lIjoiYWRpdHlhIG1haGxhd2F0Iiwicm9sbE5vIjoiMjYyMjQiLCJhY2Nlc3NDb2RlIjoidWtzZFdUIiwiY2xpZW50SUQiOiI1ZjljOWY5My0xZDRiLTQ3YmItYWIzYi1mOWZjMTYwMjVlYWUiLCJjbGllbnRTZWNyZXQiOiJTYmNaS3ZOY0VOQ3pXRmVIIn0.6Axx6YMyiLWVeo-y8MpZJGXOQHncSBf91KV8SVkHOhI";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function fetchAndProcessNotifications() {
  try {
    console.log("Starting API call...");

    const response = await axios.get(
      "http://20.207.122.201/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    );

    console.log("API Response received");

    const notifications = response.data.notifications;

    console.log("Total notifications:", notifications.length);

    // SORT
    notifications.sort((a, b) => {
      const priorityDiff = priorityMap[b.Type] - priorityMap[a.Type];
      if (priorityDiff !== 0) return priorityDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const topNotifications = notifications.slice(0, 10);

    console.log("\nTop 10 Notifications:\n");

    topNotifications.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.Type} | ${item.Message} | ${item.Timestamp}`
      );
    });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

fetchAndProcessNotifications();