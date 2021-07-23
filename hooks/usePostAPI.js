import { useCallback, useState } from "react";
import httpService from "Services/httpService";

const usePostAPI = ({ url, configs }) => {
  const [res, setRes] = useState({
    data: null,
    isLoading: false,
    success: false,
    error: false,
  });

  const callPostAPI = useCallback(
    (data) => {
      setRes((prevState) => ({
        data: null,
        isLoading: true,
        success: false,
        error: false,
      }));

      httpService
        .post(url, data, configs)
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
    },
    [url, configs]
  );

  return [res, callPostAPI];
};

export default usePostAPI;
