import {FC} from "react";

export type selectOptionType = {
    id: number;
    name: string;
}

const Select: FC<{ disabled?: boolean; data: { id: number; name: string }[]; placeholder?: string; className?: string; value: { id: number; name: string }; setValue: (value: { id: number; name: string }) => void; header?: string }> = props => {
    return <div className={'grid gap-1'}>
        <div className={'text-sm text-gray-500 pl-2'}>{props.header}</div>
        <select disabled={props.disabled} value={props.value.id} onChange={e => props.setValue({
            id: +e.target.selectedOptions[0].value,
            name: e.target.selectedOptions[0].text
        })} placeholder={props.placeholder}
                className={`disabled:bg-gray-300 dark:disabled:bg-gray-600 dark:border-gray-700 dark:hover:bg-gray-700/50 dark:focus:bg-gray-700/50 dark:text-gray-300 p-3 w-full rounded-lg border-2 outline-none text-gray-600 hover:bg-gray-100 bg-transparent focus:border-sky-500 focus:bg-gray-100 transition-all ease-out duration-300 ${props.className}`}>
            {props.data.map(i => <option value={i.id}>{i.name}</option>)}
        </select>
    </div>
}

export default Select;