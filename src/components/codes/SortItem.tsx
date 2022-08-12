import {FC} from "react";
import {SortOptionType, SortOrderType} from "../../util/enums";

const SortItem: FC<{ text: string; option: SortOptionType | SortOrderType }> = props => {
    return <label className={'flex gap-2 items-center text-sm text-gray-500'}>
        <input type={'radio'} className={'accent-sky-600 w-[15px] h-[15px]'}/>
        {props.text}
    </label>
}

export default SortItem