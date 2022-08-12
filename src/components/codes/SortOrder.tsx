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

const SortOrder: FC = props => {
    return <div className={'grid gap-2'}>
        <div className={'text-lg text-gray-600 mb-3'}>Sort Order</div>
        {sortOptions.map(s => <SortItem text={s.text} option={s.option}/>)}
    </div>
}

export default SortOrder;