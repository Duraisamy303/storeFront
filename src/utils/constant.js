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
  return profiles;
};

export const pincode = [
  "799013",
  "384160",
  "384135",
  "481990",
  "370150",
  "481776",
  "815302",
  "475330",
  "276141",
  "600001"
];
