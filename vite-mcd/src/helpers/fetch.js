export const fetchHelper = (url = "", method = "GET", data = {}) => {
  let option = {};
  if (method !== "GET") {
    option = {
      method,
      headers: {
        "Content-Type": "application/json",
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
