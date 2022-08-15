import {FC} from "react";
import {SortOrderType} from "../../util/enums";
import SortItem from "./SortItem";

const sortOptions = [
    {
        text: 'Ascending',
        option: SortOrderType.ASC
    },
    {
        text: 'Descending',
        option: SortOrderType.DESC
    },
]

const SortOrder: FC<{ selectedOption: SortOrderType; setSelectedOption: (option: number) => void }> = props => {
    return <div className={'grid gap-2 h-fit'}>
        <div className={'text-lg text-gray-600 mb-3 dark:text-gray-400'}>Sort Order</div>
        {sortOptions.map(s => <SortItem key={s.text} text={s.text} option={s.option}
                                        selectedOption={props.selectedOption}
                                        setSelectedOption={props.setSelectedOption}/>)}
    </div>
}

export default SortOrder;