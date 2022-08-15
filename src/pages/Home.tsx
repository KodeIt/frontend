import {FC, useCallback, useEffect, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoreStateType} from "../store/store";
import useAuthorizedHttp from "../hooks/useAuthorizedHttp";

const Home: FC = () => {
    const navigate = useNavigate();
    const makeAuthorizedRequest = useAuthorizedHttp();
    const userCtx = useSelector((state: StoreStateType) => state.user);
    const [codesStarredLength, setCodesStarredLength] = useState(0);
    const [codesWrittenLength, setCodesWrittenLength] = useState(0);

    const navigateToCompiler = useCallback(() => navigate('/compiler'), [navigate]);

    const navigateToCodes = useCallback(() => navigate('/codes'), [navigate]);

    const navigateToCodesStarred = useCallback(() => navigate(`/profile/${userCtx.user.id}/codes-starred`), [navigate]);

    const navigateToCodesWritten = useCallback(() => navigate(`/profile/${userCtx.user.id}/codes-written`), [navigate]);

    useEffect(() => {
        makeAuthorizedRequest({
                url: '/api/private/code/starred/length'
            },
            (data: number) => setCodesStarredLength(data)
        )
    }, [makeAuthorizedRequest]);

    useEffect(() => {
        makeAuthorizedRequest({
                url: '/api/private/code/written/length'
            },
            (data: number) => setCodesWrittenLength(data)
        )
    }, [makeAuthorizedRequest])

    return <PageWrapper className={'gap-16'}>
        <div className={'text-gray-700 dark:text-gray-300 text-4xl font-bold flex gap-2 items-end '}>Hey,
            <Link to={'/profile/' + userCtx.user.id}
                  className={'cursor-pointer text-sky-500'}>{userCtx.user.name?.split(' ')[0]}!</Link>
            How's it going?
        </div>
        <div className={'text-2xl text-gray-700 dark:text-gray-300 border-b pb-5 dark:border-b-gray-600'}>Your <span
            className={'text-sky-500 font-mono'}>venture</span> at
            a <span
                className={'text-sky-500 font-mono'}>glance</span></div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-10'}>
            <div className={'flex items-center justify-between p-10 rounded border dark:border-gray-600'}>
                <div className={'text-xl font-light dark:text-gray-300'}>Codes you <span
                    className={'text-sky-500 font-mono'}>wrote</span>
                </div>
                <div>
                    <div className={'text-center text-4xl font-semibold text-sky-500'}>{codesWrittenLength}</div>
                    <button onClick={navigateToCodesWritten} className={'text-sky-500 text-sm'}>View all</button>
                </div>
            </div>
            <div className={'flex items-center justify-between p-10 rounded border dark:border-gray-600'}>
                <div className={'text-xl font-light dark:text-gray-300'}>Codes you <span
                    className={'text-sky-500 font-mono'}>starred</span></div>
                <div>
                    <div className={'text-center text-4xl font-semibold text-sky-500'}>{codesStarredLength}</div>
                    <button onClick={navigateToCodesStarred} className={'text-sky-500 text-sm'}>View all</button>
                </div>
            </div>
        </div>
        <div className={'text-2xl text-gray-700 border-b pb-5 dark:border-gray-600 dark:text-gray-300'}><span
            className={'text-sky-500 font-mono '}>Jump</span> to your <span
            className={'text-sky-500 font-mono'}>favourite</span> section
        </div>
        <div className={'grid gap-3 text-left text-sky-500 w-fit'}>
            <button onClick={navigateToCompiler} className={'text-left '}>Visit the friendly compiler</button>
            <button onClick={navigateToCodes} className={'text-left'}>See what the others are doing</button>
        </div>
    </PageWrapper>
}

export default Home;