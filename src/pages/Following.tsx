import {FC, useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import PageWrapper from "../components/common/PageWrapper";
import {User} from "../util/entities";
import useHttp from "../hooks/makeRequest";
import CodeStarsSkeleton from "../components/skeletons/CodeStarsSkeleton";
import PersonDisplay from "../components/common/PersonDisplay";

const Following: FC = () => {
    const {userId} = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [count, setCount] = useState(0);
    const makeRequest = useHttp();

    useEffect(() => {
        makeRequest(
            {
                url: '/api/public/user/' + userId
            }, data => setUser(data),
            () => {
            },
            () => setLoading(false)
        )
    }, [makeRequest, userId]);

    useEffect(() => {
        makeRequest(
            {
                url: `/api/public/user/${userId}/following/count`
            }, data => setCount(data)
        )
    }, [makeRequest, userId]);

    return <PageWrapper>
        {loading ?
            <CodeStarsSkeleton/>
            :
            user ?
                <div className={'flex flex-col gap-10'}>
                    <div
                        className={'flex justify-between border-b dark:border-b-gray-700 text-gray-700 dark:text-gray-300 font-bold text-2xl pb-5'}>
                        <div className={'flex gap-2'}>
                            <Link className={'text-sky-500'} to={'/profile/' + userId}>{user.name}'s</Link>
                            <div>following</div>
                        </div>
                        <div className={'flex gap-2'}>
                            <div>Total:</div>
                            <div className={'text-sky-500'}>{count}</div>
                        </div>
                    </div>
                    <PersonDisplay navigationEnabled url={`/api/public/user/${userId}/following`}/>
                </div>
                :
                <Navigate to={'/'}/>
        }
    </PageWrapper>
}

export default Following;