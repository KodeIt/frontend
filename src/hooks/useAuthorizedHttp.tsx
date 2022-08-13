import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {StoreStateType} from "../store/store";
import {userActions} from "../store/user-slice";

type request = {
    method?: string | null;
    body?: object | null;
    url: string;
};

type callback = (data?: any) => void;

const useAuthorizedHttp = () => {
    const userCtx = useSelector((state: StoreStateType) => state.user);
    const dispatch = useDispatch();

    return useCallback(
        (requestOptions: request, successCallback?: callback, errorCallback?: callback, completeCallback?: callback) =>
            new Promise<void>((resolve, reject) =>
                axios({
                    method: requestOptions.method ? requestOptions.method.toLowerCase() : "get",
                    url: process.env.REACT_APP_BACKEND_URL + requestOptions.url,
                    withCredentials: true,
                    headers: {
                        Authorization: "Bearer " + userCtx.jwt!.accessToken,
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
                        if (error.response.status === 403) {
                            axios({
                                method: "get",
                                withCredentials: true,
                                url: process.env.REACT_APP_BACKEND_URL + "/api/private/access-token?refreshToken=" + userCtx.jwt!.refreshToken,
                                headers: {
                                    Authorization: "Bearer " + userCtx.jwt!.accessToken,
                                }
                            })
                                .then((response) => {
                                    dispatch(
                                        userActions.updateJWT({
                                            accessToken: response.data,
                                        })
                                    );
                                })
                                .catch((error) => {
                                    reject();
                                    errorCallback && errorCallback(error);
                                })
                        } else {
                            reject();
                            errorCallback && errorCallback(error);
                        }
                    })
                    .finally(() => {
                        completeCallback && completeCallback();
                    }),
            ),
        [userCtx.jwt]
    );
};

export default useAuthorizedHttp;