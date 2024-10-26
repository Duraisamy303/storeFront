import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/index.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
  createHttpLink,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setContext } from "@apollo/client/link/context";
import Loader from "@/components/loader/loader";
import UserInfoHandler from "../layout/userInfoHandler";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Listen for route change start event
  router?.events?.on("routeChangeStart", () => {
    setLoading(true);
  });

  // Listen for route change complete event
  router?.events?.on("routeChangeComplete", () => {
    setLoading(false);
  });

  const [channel, setChannel] = useState("");

  useEffect(() => {
    const storedChannel = localStorage.getItem("channel");
    if (!storedChannel) {
      localStorage.setItem("channel", "india-channel");
      setChannel("india-channel");
    } else {
      setChannel(storedChannel);
    }
  }, []);

  function CommonLoader({ loading, spinner }) {
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

  const channelList = [
    { name: "india-channel", value: "INR" },
    { name: "default-channel", value: "USD" },
  ];

  const handleChannelChange = (newChannel) => {
    const channel = localStorage.getItem("channel");
    if (channel != newChannel) {
      localStorage.setItem("channel", newChannel);
      setChannel(newChannel);
      window.location.reload();
    }
  };

  const paths = [
    "/checkout",
    "/cart",
    "/profile",
    "/login",
    "/forgot",
    "/register",
    "/order-success",
    "/order-failed",
    "/password_reset",
  ];

  const isOrderSuccessPath = router.pathname.startsWith("/order-success");
  const isOrderFailedPath = router.pathname.startsWith("/order-failed");
  const isOrderDetailsPath = router.pathname.startsWith("/order-details");

  useEffect(() => {
    // Initialize dataLayer and gtag on client side only
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-7TTX2YVRPQ");
  }, []); // Empty dependency array ensures this runs once on mount


  useEffect(() => {
    // Initialize dataLayer and gtag on client side only
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-7TTX2YVRPQ");
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <Provider store={store}>
            {/* <Elements stripe={stripePromise}> */}
              <UserInfoHandler />
            <div id="root">
              {!paths.includes(router.pathname) &&
                !isOrderSuccessPath &&
                !isOrderFailedPath &&
                !isOrderDetailsPath && (
                  <div
                    style={{
                      position: "fixed",
                      zIndex: 999,
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: 0,
                    }}
                  >
                    {channelList?.map((item, index) => (
                      <div
                        key={index}
                        className={` p-2 mb-1 text-white`}
                        style={{
                          backgroundColor:
                            channel == item.name ? "#c2882b" : "#000",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleChannelChange(item.name);
                        }}
                      >
                        {item.value}
                      </div>
                    ))}
                  </div>
                )}
              {loading ? (
                <CommonLoader loading={loading} />
              ) : (
                <Component {...pageProps} />
              )}
            </div>
            {/* </Elements> */}
          </Provider>
        </GoogleOAuthProvider>
      </ApolloProvider>

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7TTX2YVRPQ"
      />
    </>
  );
}
