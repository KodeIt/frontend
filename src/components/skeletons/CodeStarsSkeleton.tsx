import {FC} from "react";
import PersonSkeleton from "./PersonSkeleton";

const CodeStarsSkeleton: FC = () => {
    return <div className={'flex flex-col gap-10 animate-pulse'}>
        <div className={'flex justify-between items-center pb-5 border-b dark:border-b-gray-700'}>
            <div className={'w-[30%] bg-gray-200 dark:bg-gray-700 h-5 rounded-full'}/>
            <div className={'w-[20%] bg-gray-200 dark:bg-gray-700 h-5 rounded-full'}/>
        </div>
        <div className={'flex flex-col gap-5'}>
            <PersonSkeleton/>
            <PersonSkeleton/>
            <PersonSkeleton/>
            <PersonSkeleton/>
            <PersonSkeleton/>
        </div>
    </div>
}

export default CodeStarsSkeleton;