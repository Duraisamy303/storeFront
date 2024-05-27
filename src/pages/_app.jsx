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
  router.events.on("routeChangeStart", () => {
    setLoading(true);
  });

  // Listen for route change complete event
  router.events.on("routeChangeComplete", () => {
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

  const channelList = [
    { name: "india-channel", value: "INR" },
    { name: "default-channel", value: "USD" },
  ];

  const handleChannelChange = (newChannel) => {
    localStorage.setItem("channel", newChannel);
    setChannel(newChannel);
    window.location.reload();
  };

  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          {/* <Elements stripe={stripePromise}> */}
          <div id="root">
            {router.pathname !== "/checkout" && router.pathname !== "/cart" && (
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
              <div className="loading-indicator">Loading...</div>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
          {/* </Elements> */}
        </Provider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
}
