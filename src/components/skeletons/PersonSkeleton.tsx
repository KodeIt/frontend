import {FC} from "react";

const PersonSkeleton: FC = () => {
    return <div
        className={'flex justify-between p-5 items-center border dark:border-gray-700 rounded-lg animate-pulse'}>
        <div className={'flex gap-5 items-center'}>
            <div className={'w-[50px] h-[50px] rounded-full bg-gray-200 dark:bg-gray-700'}>
            </div>
            <div className={'h-5 w-[250px] rounded-full bg-gray-200 dark:bg-gray-700'}></div>
        </div>
        <div className={'flex gap-5'}>
            <div className={'h-10 w-[150px] rounded-lg bg-gray-200 dark:bg-gray-700'}/>
            <div className={'h-10 w-[150px] rounded-lg bg-gray-200 dark:bg-gray-700'}/>
        </div>
    </div>
}

export default PersonSkeleton;