import {FC} from "react";
import PageWrapper from "../components/common/PageWrapper";
import CodeDisplay from "../components/common/CodeDisplay";
import {useSelector} from "react-redux";
import {StoreStateType} from "../store/store";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {Link} from "react-router-dom";

const CodesStarred: FC = () => {
    const userCtx = useSelector((state: StoreStateType) => state.user);

    return <PageWrapper className={'gap-5'}>
        <div className={'flex items-center text-sm text-sky-500'}>
            <KeyboardArrowLeft/>
            <Link to={'/'}>Back to home page</Link>
        </div>
        <div className={'text-gray-700 text-4xl font-bold flex gap-2 items-end border-b pb-5 mb-10'}>Codes
            <span className={'text-sky-500'}> starred</span>
            by you
        </div>
        <CodeDisplay navigationEnabled url={'/api/public/code/starred/' + userCtx.user.id}/>
    </PageWrapper>
}

export default CodesStarred;