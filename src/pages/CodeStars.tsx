import {FC, useEffect, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import {Code} from "../util/entities";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import useHttp from "../hooks/makeRequest";
import CodeStarsSkeleton from "../components/skeletons/CodeStarsSkeleton";
import PersonDisplay from "../components/common/PersonDisplay";

const CodeStars: FC = () => {
    const [code, setCode] = useState<Code | null>(null);
    const [loading, setLoading] = useState(true);
    const makeRequest = useHttp();
    const {codeId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (codeId === null)
            navigate('/codes');

        makeRequest({
                url: '/api/public/code/' + codeId
            },
            data => {
                setCode(data);
            },
            () => {
            },
            () => setLoading(false)
        )
    }, [codeId, makeRequest, navigate])

    return <PageWrapper>
        {loading ?
            <CodeStarsSkeleton/>
            :
            code ?
                <div className={'flex flex-col gap-10'}>
                    <div
                        className={'pb-5 border-b dark:border-b-gray-600 text-gray-700 dark:text-gray-300 flex justify-between font-bold text-2xl'}>
                        <div>Stars on <Link className={'text-sky-500'}
                                            to={`/compiler?id=${code!.id}`}>{code!.title}</Link></div>
                        <div>Total: <span className={'text-sky-500'}>{code!.stars}</span></div>
                    </div>
                    <PersonDisplay url={`/api/public/user/${codeId}/stars`} navigationEnabled/>
                </div>
                :
                <Navigate to={'/codes'}/>
        }
    </PageWrapper>
}

export default CodeStars;