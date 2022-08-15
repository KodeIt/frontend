import {FC} from "react";

const CodeItemSkeleton: FC = () => {
    return <div className={'border rounded p-5 flex gap-5 animate-pulse h-fit dark:border-gray-700'}>
        <div className={'bg-gray-200 dark:bg-gray-700 w-[50px] h-[50px] rounded-full'}/>
        <div className={'flex-grow grid gap-5 h-fit'}>
            <div className={'rounded-full w-[90%] h-3 bg-gray-200 dark:bg-gray-700'}/>
            <div className={'rounded-full w-[60%] h-3 bg-gray-200 dark:bg-gray-700'}/>
            <div className={'rounded-full w-[70%] h-3 bg-gray-200 dark:bg-gray-700'}/>
        </div>
    </div>
}

export default CodeItemSkeleton;