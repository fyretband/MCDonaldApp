export const fetchHelper = (url = "", method = "GET", data = {}) => {
  let option = {
    method,
    headers: {
      "Content-Type": "application/json",
      access_token: localStorage.getItem("accessToken"),
    },
  };
  if (method !== "GET") {
    option = {
      method,
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    };
  }

  return fetch(url, option).then(async (response) => {
    if (!response.ok) {
      throw await response.text();
    }

    return response.json();
  });
};
