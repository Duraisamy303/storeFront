import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/index.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

// stripePromise
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const client = new ApolloClient({
  uri: "http://file.prade.in/graphql/",
  cache: new InMemoryCache(),
});
export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <Elements stripe={stripePromise}>
            <div id="root">
              <Component {...pageProps} />
            </div>
          </Elements>
        </Provider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
}
