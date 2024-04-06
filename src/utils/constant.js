export const configuration = (body) => {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "JWT " + token,
    },
    body: body,
  };
  return config;
};



