import { useAddWishlistMutation } from "@/redux/features/productApi";
import { add_to_wishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";

export const handleWishlistProduct = (prd) => {
    try {
      const token = localStorage.getItem("token");
      let whishlist = localStorage.getItem("whishlist");
      // if (token) {
      //   //backend mutation
      // } else {
        if (!whishlist) {
          whishlist = [];
        } else {
          whishlist = JSON.parse(whishlist);
        }
        whishlist.push(prd);
        // localStorage.setItem("whishlist", JSON.stringify(whishlist));
        return whishlist;
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  export const checkWishlist = (list,id) => {
    const isAddedToWishlist = list?.some((prd) => prd?.node?.id === id);
    return isAddedToWishlist
  };



