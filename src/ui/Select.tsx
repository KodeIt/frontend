import {FC} from "react";

export type selectOptionType = {
    id: number | string;
    name: string;
}

const Select: FC<{ data: selectOptionType[]; placeholder?: string; className?: string; value: selectOptionType; setValue: (value: selectOptionType) => void; header?: string }> = props => {
    return <div className={'grid gap-1'}>
        <div className={'text-sm text-gray-500 pl-2'}>{props.header}</div>
        <select value={props.value.id} onChange={e => props.setValue({
            id: e.target.selectedOptions[0].value,
            name: e.target.selectedOptions[0].text
        })} placeholder={props.placeholder}
                className={`p-3 w-full rounded-lg border-2 outline-none text-gray-600 hover:bg-gray-100 bg-transparent focus:border-sky-500 focus:bg-gray-100 transition-all ease-out duration-300 ${props.className}`}>
            {props.data.map(i => <option value={i.id}>{i.name}</option>)}
        </select>
    </div>
}

export default Select;