import {FC} from "react";
import {SortOptionType, SortOrderType} from "../../util/enums";

const SortItem: FC<{
    text: string;
    option: SortOptionType | SortOrderType;
    selectedOption: SortOrderType | SortOptionType;
    setSelectedOption: (option: SortOrderType | SortOptionType) => void
}> = props => {
    return <label className={'flex gap-2 items-center text-sm text-gray-500'}>
        <input onChange={() => props.setSelectedOption(props.option)} checked={props.selectedOption === props.option}
               type={'radio'}
               className={'accent-sky-600 w-[15px] h-[15px]'}/>
        {props.text}
    </label>
}

export default SortItem