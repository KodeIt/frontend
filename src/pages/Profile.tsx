import {FC} from "react";
import PageWrapper from "../components/common/PageWrapper";
import About from "../components/profile/About";
import Statistics from "../components/profile/Statistics";

const Profile: FC = () => {

    return <PageWrapper className={'gap-10 md:flex-row'}>
        <About/>
        <Statistics/>
    </PageWrapper>
}

export default Profile;
