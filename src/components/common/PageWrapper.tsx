import {FC, ReactNode} from "react";
import UnauthenticatedNavbar from "./UnauthenticatedNavbar";

const PageWrapper: FC<{ children?: ReactNode; className?: string }> = props => {
    return <div className='w-full h-screen flex flex-col'>
        <UnauthenticatedNavbar/>
        <div
            className={`w-[90%] py-10 md:w-[80%] lg:w-[1300px] mx-auto flex flex-col h-full ${props.className}`}>{props.children}</div>
    </div>
}

export default PageWrapper;