import {FC} from "react";

const Input: FC<{ className?: string; placeHolder?: string; value: string; setValue: (value: string) => void; header?: string }> = props => {
    return <div className={'grid gap-1 w-full'}>
        {props.header && <div className={'text-sm text-gray-500 pl-2 dark:text-gray-400'}>{props.header}</div>}
        <input value={props.value} onChange={e => props.setValue(e.target.value)} placeholder={props.placeHolder}
               type={'text'}
               className={`p-3 dark:text-gray-400 bg-transparent dark:hover:bg-gray-700/50 dark:border-gray-700 w-full rounded-lg border-2 outline-none text-gray-600 hover:bg-gray-100 focus:border-sky-500 dark:focus:bg-gray-700/50 focus:bg-gray-100 transition-all ease-out duration-300 ${props.className}`}/>
    </div>
}

export default Input;