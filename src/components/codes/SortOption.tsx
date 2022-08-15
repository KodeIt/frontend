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
        option: SortOptionType.UPDATED
    }
]

const SortOption: FC<{ selectedOption: SortOptionType; setSelectedOption: (option: number) => void }> = props => {
    return <div className={'grid gap-2  h-fit'}>
        <div className={'text-lg text-gray-600 mb-3 dark:text-gray-400'}>Sort By</div>
        {sortOptions.map(s => <SortItem key={s.text} text={s.text} option={s.option}
                                        selectedOption={props.selectedOption}
                                        setSelectedOption={props.setSelectedOption}/>)}
    </div>
}

export default SortOption;