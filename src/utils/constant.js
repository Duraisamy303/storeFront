export const configuration = (body) => {
  console.log("body: ", body);
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  };
  return config;
};



