import {FC, useCallback, useEffect, useState} from "react";
import {EmailRounded, GroupRounded, LocationOnRounded, PersonRounded} from "@mui/icons-material";
import useAuthorizedHttp from "../../hooks/useAuthorizedHttp";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";
import Button, {Color} from "../../ui/Button";
import {User} from "../../util/entities";
import useHttp from "../../hooks/makeRequest";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";

const About: FC<{ user: User }> = ({user}) => {

    const makeAuthorizedRequest = useAuthorizedHttp();
    const makeRequest = useHttp();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const userCtx = useSelector((state: StoreStateType) => state.user);
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const checkFollowersAndFollowing = useCallback(() => {
        makeRequest({
                url: `/api/public/user/${user.id}/followers/count`
            },
            data => setFollowersCount(data)
        )
        makeRequest({
                url: `/api/public/user/${user.id}/following/count`
            },
            data => setFollowingCount(data)
        )
    }, [makeAuthorizedRequest, user.id, userCtx.user.id]);

    useEffect(() => {
        setLoading(true);
        checkFollowersAndFollowing();
    }, [makeAuthorizedRequest, userCtx.user.id, user.id, checkFollowersAndFollowing]);

    const handleFollow = useCallback(() => {
        setLoading(true);
        toast.promise(() =>
                makeAuthorizedRequest({
                    url: '/api/private/user/following/add/' + user.id,
                    method: 'get'
                }, data => {
                    checkFollowersAndFollowing();
                }),
            {
                pending: `Adding ${user.name!.split(' ')[0]} to following...`,
                success: `Successfully added ${user.name!.split(' ')[0]} to following!`,
                error: 'Uh-oh! Something went wrong.'
            })
    }, [checkFollowersAndFollowing, makeAuthorizedRequest, user.id, user.name]);

    const handleUnFollow = useCallback(() => {
        setLoading(true);
        toast.promise(() =>
                makeAuthorizedRequest({
                    url: '/api/private/user/following/remove/' + user.id,
                    method: 'get'
                }, data => {
                    checkFollowersAndFollowing();
                }),
            {
                pending: `Removing ${user.name!.split(' ')[0]} to following...`,
                success: `Successfully removed ${user.name!.split(' ')[0]} from following!`,
                error: 'Uh-oh! Something went wrong.'
            })
    }, [checkFollowersAndFollowing, makeAuthorizedRequest, user.id, user.name]);

    const handleEditProfile = useCallback(() => {
        navigate('/settings');
    }, [navigate]);

    return <div className={'w-[300px] flex flex-col gap-10 mx-auto md:m-0'}>
        <div className={'bg-gray-200 w-[300px] h-[300px] rounded-full'}>
            {user.avatar ? <img className={'w-[300px] h-[300px] rounded-full'}
                                src={user.avatar} alt={'avatar'}/> : <PersonRounded/>}
        </div>
        <div className={'flex flex-col gap-3'}>
            <div
                className={'text-gray-700 text-2xl font-bold border-b pb-3 dark:text-gray-300 dark:border-b-gray-600'}>{user.name}</div>
            <div className={'text-gray-500 dark:text-gray-400 flex gap-5 text-sm items-center'}><LocationOnRounded/>
                <div>{user.state && user.country ? `${user.state.name}, ${user.country.name}` : 'No data provided'}</div>
            </div>
            <div className={'text-gray-500 dark:text-gray-400 flex gap-5 text-sm items-center'}><EmailRounded/>
                <div>{user.email}</div>
            </div>
            <div className={'text-gray-500 dark:text-gray-400 flex gap-2 text-sm items-center'}>
                <GroupRounded/>
                <Link to={`/profile/${user.id}/followers`}
                      className={'ml-3 text-sky-500'}><span>{followersCount}</span> followers</Link>
                <div className={'h-1 w-1 rounded-full bg-gray-500'}></div>
                <Link to={`/profile/${user.id}/following`}
                      className={'text-sky-500'}><span>{followingCount}</span> following</Link>
            </div>
        </div>
        <div className={'flex flex-col gap-3'}>
            <div className={'text-gray-700 text-2xl font-bold border-b pb-3 dark:text-gray-300 dark:border-b-gray-600'}>
                Bio
            </div>
            <div className={'ql-editor dark:text-gray-300 text-gray-600'}
                 dangerouslySetInnerHTML={{__html: user.bio ? user.bio : 'No data provided!'}}/>
        </div>
        {
            userCtx.user.id === user.id ? <Button onClick={handleEditProfile}>Edit profile</Button>
                : user.isFollowing ?
                    <Button onClick={handleUnFollow} color={Color.ROSE} disabled={loading}>Unfollow</Button>
                    : <Button onClick={handleFollow} disabled={loading} filled color={Color.GREEN}>Follow</Button>
        }
    </div>
}

export default About;