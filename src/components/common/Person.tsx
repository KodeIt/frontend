import {FC, useCallback, useState} from "react";
import {User} from "../../util/entities";
import {PersonRounded} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import Button, {Color} from "../../ui/Button";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";
import useAuthorizedHttp from "../../hooks/useAuthorizedHttp";
import {toast} from "react-toastify";

const Person: FC<{ user: User; onUnfollow: (userId: number) => void; onFollow: (userId: number) => void }> = ({
                                                                                                                  user,
                                                                                                                  onUnfollow,
                                                                                                                  onFollow
                                                                                                              }) => {
    const navigate = useNavigate();
    const makeAuthorizedRequest = useAuthorizedHttp();
    const userCtx = useSelector((state: StoreStateType) => state.user);
    const [loading, setLoading] = useState(false);
    const isLoggedIn = useSelector((state: StoreStateType) => state.app.isLoggedIn);

    const handleFollow = useCallback(() => {
        setLoading(true);
        toast.promise(() =>
                makeAuthorizedRequest({
                        url: '/api/private/user/following/add/' + user.id,
                        method: 'get'
                    }, () => {
                        user && onFollow(user.id!);
                    }, () => {
                    },
                    () => setLoading(false)
                ),
            {
                pending: `Adding ${user.name!.split(' ')[0]} to following...`,
                success: `Successfully added ${user.name!.split(' ')[0]} to following!`,
                error: 'Uh-oh! Something went wrong.'
            })
    }, [makeAuthorizedRequest, onFollow, user]);

    const handleUnFollow = useCallback(() => {
        setLoading(true);
        toast.promise(() =>
                makeAuthorizedRequest({
                        url: '/api/private/user/following/remove/' + user.id,
                        method: 'get'
                    }, () => {
                        user && onUnfollow(user.id!);
                    }, () => {
                    },
                    () => setLoading(false)
                ),
            {
                pending: `Removing ${user.name!.split(' ')[0]} to following...`,
                success: `Successfully removed ${user.name!.split(' ')[0]} from following!`,
                error: 'Uh-oh! Something went wrong.'
            })
    }, [makeAuthorizedRequest, onUnfollow, user]);

    return <div
        className={'flex justify-between p-5 items-center bg-transparent bg-white shadow hover:shadow-lg dark:bg-gray-700 rounded-lg relative transition-all ease-out duration-300'}>
        <div className={'flex gap-5 items-center'}>
            <div className={'w-[50px] h-[50px] rounded-full bg-gray-200 dark:bg-gray-700'}>
                {user.avatar ? <img className={'w-[50px] h-[50px] rounded-full'} src={user.avatar} alt={'avatar'}/> :
                    <PersonRounded/>}
            </div>
            <Link className={'text-sky-500 text-lg'} to={'/profile/' + user.id}>{user.name}</Link>
        </div>
        <div className={'flex gap-5'}>
            <Button onClick={() => navigate('/profile/' + user.id)}>View Profile</Button>
            {
                isLoggedIn && user.id !== userCtx.user.id && (user.isFollowing ?
                    <Button disabled={loading} className={'w-[150px]'} onClick={handleUnFollow} filled
                            color={Color.ROSE}>Unfollow</Button> :
                    <Button disabled={loading} className={'w-[150px]'} onClick={handleFollow} filled
                            color={Color.GREEN}>Follow</Button>)
            }
        </div>
    </div>
}

export default Person;