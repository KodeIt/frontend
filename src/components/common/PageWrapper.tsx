import {FC, ReactNode} from "react";
import UnauthenticatedNavbar from "../navbar/UnauthenticatedNavbar";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";
import AuthenticatedNavbar from "../navbar/AuthenticatedNavbar";

const PageWrapper: FC<{ children?: ReactNode; className?: string }> = props => {
    const appCtx = useSelector((state: StoreStateType) => state.app);

    return <div className='w-screen overflow-y-scroll flex flex-col dark:bg-[#282c34]'>
        {appCtx.isLoggedIn ? <AuthenticatedNavbar/> : <UnauthenticatedNavbar/>}
        <div
            className={`py-[110px] md:w-[80%] lg:w-[70%] mx-auto flex flex-col h-[100vh] ${props.className}`}>{props.children}</div>
    </div>
}

export default PageWrapper;