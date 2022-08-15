import {FC} from "react";
import PageWrapper from "../components/common/PageWrapper";
import CodeDisplay from "../components/common/CodeDisplay";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {Link, useNavigate, useParams} from "react-router-dom";

const CodesWritten: FC = () => {
    const {userId} = useParams();
    const naviage = useNavigate();

    if (!userId)
        naviage('/')

    return <PageWrapper className={'gap-5'}>
        <div className={'flex items-center text-sm text-sky-500'}>
            <KeyboardArrowLeft/>
            <Link to={'/'}>Back to home page</Link>
        </div>
        <div className={'text-gray-700 text-4xl font-bold flex gap-2 items-end border-b pb-5  mb-10'}>Codes
            <span className={'text-sky-500'}> written</span>
            by you
        </div>
        <CodeDisplay navigationEnabled url={'/api/public/code/written/' + userId}/>
    </PageWrapper>
}

export default CodesWritten