// UserInfoHandler.js
import { useEffect } from "react";
import { useUserInfoMutation } from "@/redux/features/productApi";
import { useRouter } from "next/router";

const UserInfoHandler = () => {
  const [userInfo, { data, loading, error }] = useUserInfoMutation();

  const router = useRouter();

  useEffect(() => {
    // Trigger the mutation when this component mounts
    validToken();
  }, [userInfo, router]);

  const validToken = async () => {
    try {
      const res = await userInfo();
      let error = res?.data?.errors;
      if (error?.length > 0) {
        localStorage.clear();
        window.location.reload();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return null; // This component only runs the mutation and doesn’t render UI
};

export default UserInfoHandler;
