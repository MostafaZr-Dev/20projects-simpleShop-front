import { useCallback, useState } from "react";
import httpService from "Services/httpService";

const usePostAPI = ({ url, headers }) => {
  const [res, setRes] = useState({
    data: null,
    isLoading: true,
    success: false,
    error: false,
  });

  const callGetAPI = useCallback(() => {
    const configs = {
      headers: {
        ...headers,
      },
    };

    httpService
      .get(url, configs)
      .then((response) => {
        setRes({
          isLoading: false,
          success: true,
          error: false,
          data: response.data,
        });
      })
      .catch((error) => {
        setRes({
          isLoading: false,
          success: false,
          error: true,
          data: null,
        });
      });
  }, [url, headers]);

  return [res, callGetAPI];
};

export default usePostAPI;
