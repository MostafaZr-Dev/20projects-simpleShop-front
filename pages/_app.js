import "../styles/globals.css";

import RtlProvider from "utils/RTL-Provider";
import AppProvider from "utils/AppProvider";
import { AppStateProvider } from "state";
import Loader from "components/Loader";

function App(props) {
  const { Component, pageProps } = props;

  return (
    <AppProvider>
      <RtlProvider>
        <AppStateProvider>
          <Loader />
          <Component {...pageProps} />
        </AppStateProvider>
      </RtlProvider>
    </AppProvider>
  );
}

export default App;
