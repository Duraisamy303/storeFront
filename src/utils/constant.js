export const configuration = (body) => {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  };
  return config;
};



