import "../styles/globals.css";

import RtlProvider from "utils/RTL-Provider";
import AppProvider from "utils/AppProvider";
import { AppStateProvider } from "state";
import Loader from "components/Loader";
import InitApp from "components/InitApp";

function App(props) {
  const { Component, pageProps } = props;

  return (
    <AppProvider>
      <RtlProvider>
        <AppStateProvider>
          <InitApp>
            <Loader />
            <Component {...pageProps} />
          </InitApp>
        </AppStateProvider>
      </RtlProvider>
    </AppProvider>
  );
}

export default App;
