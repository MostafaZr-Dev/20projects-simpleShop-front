import { useEffect, useState } from "react";

import * as authService from "services/authService";
import { useAppState } from "state";
import Loader from "components/Loader";

function InitApp({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useAppState();

  useEffect(() => {
    const authCheck = async () => {
      const { status, user } = await authService.check();

      if (!status) {
        setIsLoading(false);
        dispatch({
          type: "SET_USER",
          payload: {
            user: null,
          },
        });
        return;
      }

      dispatch({
        type: "SET_USER",
        payload: {
          user,
        },
      });
      setIsLoading(false);
    };

    authCheck();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}

export default InitApp;
