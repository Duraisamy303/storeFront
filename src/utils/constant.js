import placeholder from "@assets/img/placeholder.png";

export const configuration = (body) => {
  const token = localStorage.getItem("token");
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "JWT " + token,
    },
    body: body,
  };
  return config;
};

export const profilePic = (profile) => {
  let profiles;
  if (profile) {
    profiles = profile;
  } else if (profile == undefined) {
    profiles = placeholder;
  } else {
    profiles = placeholder;
  }
  console.log("profiles: ", profiles);
  return profiles;
};
