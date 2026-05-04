import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [readIds, setReadIds] = useState([]);

  const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0eWEuMjYyMjRAZ2duaW5kaWEuZHJvbmFjaGFyeWEuaW5mbyIsImV4cCI6MTc3Nzg3NzUwNywiaWF0IjoxNzc3ODc2NjA3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZmViZTYwNDktZGZjOS00ZWI1LTg3YjItZGYyYTQ1NTZjMmU0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYWRpdHlhIG1haGxhd2F0Iiwic3ViIjoiNWY5YzlmOTMtMWQ0Yi00N2JiLWFiM2ItZjlmYzE2MDI1ZWFlIn0sImVtYWlsIjoiYWRpdHlhLjI2MjI0QGdnbmluZGlhLmRyb25hY2hhcnlhLmluZm8iLCJuYW1lIjoiYWRpdHlhIG1haGxhd2F0Iiwicm9sbE5vIjoiMjYyMjQiLCJhY2Nlc3NDb2RlIjoidWtzZFdUIiwiY2xpZW50SUQiOiI1ZjljOWY5My0xZDRiLTQ3YmItYWIzYi1mOWZjMTYwMjVlYWUiLCJjbGllbnRTZWNyZXQiOiJTYmNaS3ZOY0VOQ3pXRmVIIn0.6Axx6YMyiLWVeo-y8MpZJGXOQHncSBf91KV8SVkHOhI";

  // Fetch Notifications
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          params: {
            page: page,
            limit: 10,
            notification_type: type || undefined,
          },
        }
      );

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, type]);

  // Top Notifications Logic
  const getTopNotifications = (data) => {
    const priorityMap = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };

    const sorted = [...data].sort((a, b) => {
      const priorityDiff = priorityMap[b.Type] - priorityMap[a.Type];

      if (priorityDiff !== 0) return priorityDiff;

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    return sorted.slice(0, 5);
  };

  // Mark as Read
  const handleRead = (id) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Notifications</h1>

      {/* Filter */}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All</option>
        <option value="Event">Event</option>
        <option value="Result">Result</option>
        <option value="Placement">Placement</option>
      </select>

      {/* Top Notifications */}
      <h2>Top Notifications</h2>
      <ul>
        {getTopNotifications(notifications).map((item) => (
          <li key={item.ID}>
            {item.Type} - {item.Message}
          </li>
        ))}
      </ul>

      {/* All Notifications */}
      <h2>All Notifications</h2>
      <ul>
        {notifications.map((item) => (
          <li
            key={item.ID}
            onClick={() => handleRead(item.ID)}
            style={{
              backgroundColor: readIds.includes(item.ID)
                ? "#e0e0e0"
                : "#ffffff",
              margin: "5px",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            {item.Type} - {item.Message} ({item.Timestamp})
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Home;