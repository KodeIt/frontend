import {FC, useCallback, useEffect} from "react";
import PageWrapper from "../components/common/PageWrapper";
import {DoneRounded, FacebookRounded, GitHub, Google} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import useAuthorizedHttp from "../hooks/useAuthorizedHttp";
import {User} from "../util/entities";
import {userActions} from "../store/user-slice";
import {appActions} from "../store/app-slice";
import {toast} from "react-toastify";
import Button from "../ui/Button";
import {StoreStateType} from "../store/store";

const Signin: FC = props => {
    const url = new URL(window.location.href);
    const dispatch = useDispatch();
    const userCtx = useSelector((state: StoreStateType) => state.user);
    const navigate = useNavigate();
    const makeRequest = useAuthorizedHttp();
    const accessToken = url.searchParams.get("accessToken");
    const refreshToken = url.searchParams.get("refreshToken");

    const errorCallback = (data: any) => {
    };

    const successCallback = useCallback(
        (data: User) => {
            dispatch(
                userActions.updateUser({
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar,
                    bio: data.bio,
                    memberSince: data.memberSince,
                    state: data.state,
                    country: data.country,
                })
            );
            navigate("/");
            dispatch(appActions.login());
        },
        [dispatch, navigate]
    );

    useEffect(() => {

        if (accessToken !== null && refreshToken !== null) {
            dispatch(userActions.updateJWT({accessToken, refreshToken}));
        }
    }, [dispatch, url.searchParams]);

    useEffect(() => {
        if (accessToken !== null && refreshToken !== null && userCtx.jwt.accessToken !== null) {
            toast.promise(
                makeRequest(
                    {
                        url: "/api/private/user/",
                    },
                    successCallback,
                    errorCallback
                ),
                {
                    pending: "Signing you in...",
                    success: "You have successfully signed in!",
                    error: "Looks like there was a problem!",
                }
            )
        }
    }, [userCtx.jwt])

    const handleGoogleLogin = useCallback(() => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/google`;
    }, []);

    const handleGithubLogin = useCallback(() => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/github`;
    }, []);

    const handleFacebookLogin = useCallback(() => {
        window.location.href = `${process.env.REACT_APP_BACKEND_URL}/oauth2/authorization/facebook`;
    }, []);

    return <PageWrapper>
        <div className={`pt-20 lg:pt-0 mx-auto flex flex-col h-full justify-center w-full gap-16`}>
            <div className={`text-sky-500 text-4xl text-left font-semibold`}>Sign in to get the most of us.</div>
            <div className={'flex flex-col lg:flex-row justify-between gap-20 lg:gap-0'}>
                <div className={'flex flex-col gap-2 w-[90vw] lg:w-[50%]'}>
                    <div className={'text-2xl text-gray-600 mb-5'}>Why sign up with us?</div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Save your codes for others to see them.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Star someone's code that you liked.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Invite your friends over to code along with you.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Get your own ranked profile.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Protect your eyes with the dark mode!</div>
                    </div>
                </div>
                <div className={'flex flex-col gap-5 w-[90vw] lg:w-[50%] items-end'}>
                    <Button
                        onClick={handleGoogleLogin}
                        className={'flex flex-row gap-5 w-[90vw] lg:w-[500px] items-center justify-center'}
                        filled>
                        <Google fontSize={'large'}/>
                        <div>Continue with Google</div>
                    </Button>
                    <Button className={'flex flex-row gap-5 w-[90vw] lg:w-[500px] items-center justify-center'}
                            filled onClick={handleFacebookLogin}>
                        <FacebookRounded fontSize={'large'}/>
                        <div>Continue with Facebook</div>
                    </Button>
                    <Button className={'flex flex-row gap-5 w-[90vw] lg:w-[500px] items-center justify-center'}
                            filled onClick={handleGithubLogin}>
                        <GitHub fontSize={'large'}/>
                        <div>Continue with Github</div>
                    </Button>
                </div>
                <div></div>
            </div>
        </div>
    </PageWrapper>
}

export default Signin;