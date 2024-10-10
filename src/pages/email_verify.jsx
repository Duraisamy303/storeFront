import React, { useEffect, useState } from "react";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Wrapper from "@/layout/wrapper";
import CommonBreadcrumb from "@/components/breadcrumb/common-breadcrumb";
import RegisterArea from "@/components/login-register/register-area";
import FooterTwo from "@/layout/footers/footer-2";
import { useRouter } from "next/router";
import { useVerifyEmailMutation } from "../redux/features/auth/authApi";

const EmailVerifyPage = () => {
  const router = useRouter();
  const { email, token } = router.query; // Destructure the query params
  const [emailVerify, { isLoading: loading }] = useVerifyEmailMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    localStorage.clear();
    if (email && token) {
      verifyEmail(email, token);
    }
  }, [email, token]); // Trigger when email and token are available

  const verifyEmail = (email, token) => {
    emailVerify({
      email,
      token,
    }).then((result) => {
      let error = result?.data?.data?.confirmAccount?.errors;
      if (error?.length > 0) {
        setErrorMessage(error[0]?.message);
      } else {
        setSuccessMessage("Email verification successful. You can login");
      }
    });
  };

  function CommonLoader() {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/assets/img/Prade-Logo-Giff.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <section className="tp-login-area pb-140 pt-120 p-relative z-index-1 fix">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-8">
                  <div className="tp-login-wrapper items-center">
                    {loading ? (
                      <CommonLoader />
                    ) : errorMessage ? (
                      <h4 style={{ color: "red" }}>{errorMessage}</h4>
                    ) : successMessage ? (
                      <div className="items-center justify-center text-center">
                        <h4 style={{ color: "green" }}>{successMessage}</h4>
                        <div className="tp-login-bottom">
                          <button
                            type="submit"
                            className="tp-login-btn  w-100"
                            onClick={() => router.push("/login")}
                          >
                            {"Login"}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterTwo primary_style={true} />
    </Wrapper>
  );
};

export default EmailVerifyPage;
