import {FC, useCallback} from "react";
import {Language} from "../../util/enums";

const LanguageFilterItem: FC<{
    checked: boolean;
    text: string;
    language: Language;
    addItem: (item: Language) => void;
    remove: (item: Language) => void
}> = props => {
    const handleChange = useCallback((e: any) => {
        if (e.target.checked)
            props.addItem(props.language);
        else
            props.remove(props.language);
    }, [props]);

    return <label className={'flex gap-2 items-center text-sm text-gray-500'}>
        <input checked={props.checked} onChange={handleChange} type={'checkbox'}
               className={'accent-sky-600 w-[15px] h-[15px]'}/>
        {props.text}
    </label>
}

export default LanguageFilterItem;