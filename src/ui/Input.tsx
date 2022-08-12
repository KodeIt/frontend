import {FC} from "react";

const Input: FC<{ className?: string; placeHolder?: string; value: string; setValue: (value: string) => void; header?: string }> = props => {
    return <div className={'grid gap-1'}>
        <div className={'text-sm text-gray-500 pl-2'}>{props.header}</div>
        <input placeholder={props.placeHolder} type={'text'}
               className={`p-3 w-full rounded-lg border-2 outline-none text-gray-600 hover:bg-gray-100 focus:border-sky-500 focus:bg-gray-100 transition-all ease-out duration-300 ${props.className}`}/>
    </div>
}

export default Input;