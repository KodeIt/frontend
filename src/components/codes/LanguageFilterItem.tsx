import {FC} from "react";
import {Language} from "../../util/enums";

const LanguageFilterItem: FC<{ text: string; language: Language }> = props => {
    return <label className={'flex gap-2 items-center text-sm text-gray-500'}>
        <input type={'checkbox'} className={'accent-sky-600 w-[15px] h-[15px]'}/>
        {props.text}
    </label>
}

export default LanguageFilterItem;