import {FC, useEffect, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import About from "../components/profile/About";
import Statistics from "../components/profile/Statistics";
import {useNavigate, useParams} from "react-router-dom";
import useHttp from "../hooks/makeRequest";
import {User} from "../util/entities";
import AboutSkeleton from "../components/skeletons/AboutSkeleton";
import StatisticsSkeleton from "../components/skeletons/StatisticsSkeleton";

const Profile: FC = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const makeRequest = useHttp();
    const [user, setUser] = useState<User | null>(null);

    if (!userId)
        navigate('/');

    useEffect(() => {
        makeRequest({
            url: '/api/public/user/' + userId
        }, data => {
            console.log(data);
            setUser(data);
        })
    }, [makeRequest, userId]);

    return <PageWrapper className={'gap-10 md:flex-row'}>
        {user ? <>
                <About user={user}/>
                <Statistics user={user}/>
            </>
            :
            <>
                <AboutSkeleton/>
                <StatisticsSkeleton/>
            </>
        }
    </PageWrapper>
}

export default Profile;
