import {FC} from "react";
import {SortOptionType} from "../../util/enums";
import SortItem from "./SortItem";

const sortOptions = [
    {
        text: 'Title',
        option: SortOptionType.TITLE
    },
    {
        text: 'Language',
        option: SortOptionType.LANGUAGE
    },
    {
        text: 'Created on',
        option: SortOptionType.CREATED
    }
]

const SortOption: FC = props => {
    return <div className={'grid gap-2'}>
        <div className={'text-lg text-gray-600 mb-3'}>Sort By</div>
        {sortOptions.map(s => <SortItem text={s.text} option={s.option}/>)}
    </div>
}

export default SortOption;