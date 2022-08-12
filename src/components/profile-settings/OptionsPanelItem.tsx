import {FC} from "react";
import {optionType} from "../../pages/ProfileSettings";

const OptionsPanelItem: FC<{ option: optionType, onOptionSelected: (id: number) => void; selectedId: number }> = props => {
    return <button
        onClick={() => props.onOptionSelected(props.option.id)}
        className={`text-left text-gray-600 font-light p-2 border-l-2 rounded-r border-l-transparent transition-all ease-out duration-300 hover:pl-5 hover:border-l-sky-500
        ${props.selectedId === props.option.id ? 'bg-gray-100' : 'hover:bg-gray-100'}
        `}>
        {props.option.name}
    </button>
}

export default OptionsPanelItem;