
import { useGetCartAllListQuery, useGetCartListQuery } from "@/redux/features/card/cardApi";
import { cart_list } from "@/redux/features/cartSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Test() {
  const dispatch = useDispatch();

  const { data: cartList, refetch: cartRefetch } = useGetCartListQuery();
  console.log("cartList: ", cartList);

  const { data: AllListChannel, refetch: AllListChannelREfresh } =
    useGetCartAllListQuery({});

  console.log("AllListChannel: ", AllListChannel);

  useEffect(() => {
    localStorage.removeItem("checkoutTokenUSD");
    localStorage.removeItem("checkoutTokenINR");
    localStorage.removeItem("checkoutToken");

    dispatch(cart_list([]));
  }, []);
  return <div>test</div>;
}
