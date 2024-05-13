import React from "react";
import Image from "next/image";
import Celebrity1 from "../../../public/assets/img/actors/keerthi.jpg";
import CelebrityData from "@/data/celebrity";

const CelebrityStyleMain = () => {
  return (
    <section className="tp-cart-area pb-50 pt-50">
      <div className="container">
        <div className="row">
          {CelebrityData.map((item) => (
            <div className="col-md-3" key={item?.id}>
              <div
                style={{
                  paddingTop: "50px",
                  height: "300px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={item?.img}
                  alt={item?.designation}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <p style={{ color: "black", paddingTop: "10px" }}>{item?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebrityStyleMain;
