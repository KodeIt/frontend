import {FC} from "react";
import {Language} from "../../util/enums";
import LanguageFilterItem from "./LanguageFilterItem";

const languageItems = [
    {
        text: 'C',
        language: Language.C
    },
    {
        text: 'C++',
        language: Language.CPP
    },
    {
        text: 'Java',
        language: Language.JAVA
    },
    {
        text: 'Python',
        language: Language.PYTHON
    },
    {
        text: 'Shell',
        language: Language.SHELL
    },
    {
        text: 'JavaScript',
        language: Language.JAVASCRIPT
    },
    {
        text: 'TypeScript',
        language: Language.TYPESCRIPT
    }
]

const LanguageFilter: FC<{ selectedItems: Language[]; addItem: (item: Language) => void; remove: (item: Language) => void }> = props => {

    return <div className={'grid gap-2  h-fit'}>
        <div className={'text-lg text-gray-600 mb-3 dark:text-gray-400'}>Languages</div>
        {languageItems.map(l => <LanguageFilterItem key={l.text} checked={props.selectedItems.includes(l.language)}
                                                    addItem={props.addItem} remove={props.remove} text={l.text}
                                                    language={l.language}/>)}
    </div>
}

export default LanguageFilter;