import {FC} from "react";
import CodeItemSkeleton from "./CodeItemSkeleton";

const StatisticsSkeleton: FC = () => {
    return <div className={'flex-grow flex flex-col gap-10'}>
        <div className={'flex justify-between pb-5 border-b dark:border-b-gray-700'}>
            <div className={'h-6 w-[20%] bg-gray-200 rounded-full dark:bg-gray-700'}></div>
            <div className={'h-6 w-[30%] bg-gray-200 rounded-full dark:bg-gray-700'}></div>
        </div>
        <div className={'w-full border-b dark:border-b-gray-700 pb-5'}>
            <div
                className={'h-6 w-[40%] bg-gray-200 rounded-full dark:bg-gray-700'}/>
        </div>
        <div className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-x-5'}>
            <CodeItemSkeleton/>
            <CodeItemSkeleton/>
            <CodeItemSkeleton/>
            <CodeItemSkeleton/>
            <CodeItemSkeleton/>
        </div>
        <div className={'w-full border-b dark:border-b-gray-700 pb-5'}>
            <div
                className={'h-6 w-[40%] bg-gray-200 rounded-full dark:bg-gray-700'}/>
        </div>
        <div className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-x-5'}>
            <CodeItemSkeleton/>
            <CodeItemSkeleton/>
            <CodeItemSkeleton/>
        </div>
    </div>
}

export default StatisticsSkeleton;