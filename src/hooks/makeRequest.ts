import {useCallback} from "react";
import axios from "axios";

type request = {
    method?: string | null;
    body?: object | null;
    url: string;
};

type callback = (data?: any) => void;

const useHttp = () => {

    return useCallback(
        (requestOptions: request, successCallback?: callback, errorCallback?: callback, completeCallback?: callback) =>
            new Promise<void>((resolve, reject) =>
                axios({
                    method: requestOptions.method ? requestOptions.method.toLowerCase() : "get",
                    url: process.env.REACT_APP_BACKEND_URL + requestOptions.url,
                    withCredentials: true,
                    headers: {
                        "X-XSRF-TOKEN": document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1'),
                        "Content-Type": 'application/json'
                    },
                    data: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
                })
                    .then((response) => {
                        resolve();
                        successCallback && successCallback(response.data);
                    })
                    .catch((error) => {
                        reject();
                        errorCallback && errorCallback(error);
                    })
                    .finally(() => {
                        completeCallback && completeCallback();
                    }),
            ),
        []
    );
};

export default useHttp;