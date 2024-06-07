// if not gift_wrap and not cod:  //Initial already there
//   if active_currency == "INR":
//     if country dropdown == "India":
//       deliverymethodId = "U2hpcHBpbmdNZXRob2Q6Mw=="

//     else:
//       deliverymethodId = "U2hpcHBpbmdNZXRob2Q6NA=="

//   else:
//     if country dropdown == "India":
//       deliverymethodId = "U2hpcHBpbmdNZXRob2Q6OA=="

//     else:
//       deliverymethodId = "U2hpcHBpbmdNZXRob2Q6OQ=="


//       const unCheckedGiftWrap_uncheckedCOD=()=>{
//         let deliveryMethodId = "";
//              if (checkChannel() == "india-channel") {
//               if(state.country = "IN"){
//                deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6Mw="
//               }else{
//                 deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6NA="
//               }
//              }else{
//               if(state.country = "IN"){
//                 deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6OA="
//                }else{
//                  deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6OQ="
//                }
//              } 
//       }
//     }



// elif gift_wrap and not cod:

//   if active_currency == "INR":
//     # if country dropdown == "India":
//       deliverymethodId = "U2hpcHBpbmdNZXRob2Q6MTA="



//   else:
//     # if country dropdown == "India":
//       deliverymethodId = "U2hpcHBpbmdNZXRob2Q6MTI="


// elif not gift wrap and cod:
//   if active_currency == "INR":
//     # if country dropdown == "India":
//         deliverymethodid = "U2hpcHBpbmdNZXRob2Q6MTQ="
//   else:
//     # if country dropdown == "India":
//         deliverymethodid = "U2hpcHBpbmdNZXRob2Q6MTY="

// elif cod and gift_wrap:
  
//   if active_currency == "INR":
//     # if country dropdown == "India":
//         deliverymethodid = "U2hpcHBpbmdNZXRob2Q6MTc="
//   else:
//     # if country dropdown == "India":
//         deliverymethodid = "U2hpcHBpbmdNZXRob2Q6MTg="
  
  
// const updateDeliveryMethodInitial=()=>{
//     let deliveryMethodId = "";

//   if(!state.isShowCOD && !state.isGiftWrap){
//         //COD and GiftWrap are false
//         if (checkChannel() == "india-channel") {
//           if (country == "IN") {
//             deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6Mw==";
//           } else {
//             deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6NA==";
//           }
//         } else {
//           if (country == "IN") {
//             deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6OA==";
//           } else {
//             deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6OQ==";
//           }
//         }
//   }else{
    
//   }
// }

// const checkedGiftWrap_uncheckedCOD=()=>{
//    let deliveryMethodId = "";
//         if (checkChannel() == "india-channel") {
//           deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTA="
//         }else{

//         } deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTI="
// }

// const unCheckedGiftWrap_uncheckedCOD=()=>{
//   let deliveryMethodId = "";
//        if (checkChannel() == "india-channel") {
//          deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTA="
//        }else{

//        } deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTI="
// }


// const unCheckedGiftWrap_checkedCOD=()=>{
//    let deliveryMethodId = "";
//         if (checkChannel() == "india-channel") {
//           deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTQ="
//         }else{

//         } deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTY="
// }

// const checkedGiftWrap_checkedCOD=()=>{
//   let deliveryMethodId = "";
//        if (checkChannel() == "india-channel") {
//          deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTc="
//        }else{

//        } deliveryMethodId = "U2hpcHBpbmdNZXRob2Q6MTg="
// }


