import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/index.scss";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, ApolloLink, concat, createHttpLink } from "@apollo/client";
import { useEffect, useState } from "react";

import { setContext } from '@apollo/client/link/context';
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

const httpLink = createHttpLink({
  uri: 'http://file.prade.in/graphql/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : '', 
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {

  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          {/* <Elements stripe={stripePromise}> */}
          <div id="root">
            <Component {...pageProps} />
          </div>
          {/* </Elements> */}
        </Provider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
}

