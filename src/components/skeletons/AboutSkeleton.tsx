import {FC} from "react";

const AboutSkeleton: FC = () => {
    return <div className={'flex flex-col gap-10 animate-pulse'}>
        <div className={'bg-gray-200 w-[300px] h-[300px] rounded-full dark:bg-gray-700'}/>
        <div className={'w-full border-b dark:border-b-gray-600 pb-5'}>
            <div
                className={'h-6 w-[90%] bg-gray-200 rounded-full dark:bg-gray-700'}/>
        </div>
        <div className={'grid h-fit gap-3'}>
            <div className={'bg-gray-200 w-[90%] h-3 rounded-full dark:bg-gray-700'}></div>
            <div className={'bg-gray-200 w-[60%] h-3 rounded-full dark:bg-gray-700'}></div>
            <div className={'bg-gray-200 w-[75%] h-3 rounded-full dark:bg-gray-700'}></div>
        </div>
        <div className={'rounded-lg bg-gray-200 h-12 w-[100%] dark:bg-gray-700'}></div>
    </div>
}

export default AboutSkeleton;