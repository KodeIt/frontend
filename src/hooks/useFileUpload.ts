import {useCallback} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {StoreStateType} from "../store/store";

type request = {
    method?: string | null;
    body?: object | null;
    url: string;
};

type callback = (data?: any) => void;

const useFileUpload = () => {
    const userCtx = useSelector((state: StoreStateType) => state.user);

    return useCallback(
        (requestOptions: request, successCallback?: callback, errorCallback?: callback, completeCallback?: callback) =>
            new Promise<void>((resolve, reject) =>
                axios({
                    method: requestOptions.method ? requestOptions.method : "post",
                    withCredentials: true,
                    url: process.env.REACT_APP_BACKEND_URL + requestOptions.url,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Bearer " + userCtx.jwt!.accessToken,
                        "X-XSRF-TOKEN": document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1'),
                    },
                    data: requestOptions.body
                })
                    .then((response) => {
                        console.log("heres");
                        resolve();
                        successCallback && successCallback(response.data);
                    })
                    .catch((response) => {
                        reject();
                        errorCallback && errorCallback(response.data);
                    })
                    .finally(() => completeCallback && completeCallback())
            ),
        [userCtx.jwt]
    );
};

export default useFileUpload;