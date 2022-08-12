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

const LanguageFilter: FC = props => {
    return <div className={'grid gap-2'}>
        <div className={'text-lg text-gray-600 mb-3'}>Languages</div>
        {languageItems.map(l => <LanguageFilterItem text={l.text} language={l.language}/>)}
    </div>
}

export default LanguageFilter;