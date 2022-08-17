import {FC, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import PageWrapper from "../components/common/PageWrapper";


const Landing: FC = props => {

    const navigate = useNavigate();
    const routeChange = useCallback((): void => {
        navigate(`/codes`);
    }, [navigate]);

    return <PageWrapper className={''}>
        <div className={'flex flex-col h-full justify-center items-center gap-10 text-center h-full'}>
            <div className={'text-4xl font-semibold text-sky-500 '}>Code . Compile . Collaborate
            </div>
            <div className={'text-2xl font-light text-gray-700'}>An online coding platform where you can code, compile and collaborate with others in the community.
            </div>
            <button className={'text-xl font-light rounded border-2 border-sky-500 text-sky-500 p-3 w-[250px]'}
                    onClick={routeChange}>View codes
            </button>
        </div>
    </PageWrapper>
}

export default Landing;