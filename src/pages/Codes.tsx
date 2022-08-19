import {FC, useCallback, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import LanguageFilter from "../components/codes/LanguageFilter";
import SortOption from "../components/codes/SortOption";
import SortOrder from "../components/codes/SortOrder";
import CodeDisplay from "../components/common/CodeDisplay";
import Input from "../ui/Input";
import {Language, SortOptionType, SortOrderType} from "../util/enums";
import { useChangeTitle } from "../hooks";

const Codes: FC = () => {
    useChangeTitle("Codes");
    const [search, setSearch] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([
        Language.C,
        Language.CPP,
        Language.JAVA,
        Language.PYTHON,
        Language.JAVASCRIPT,
        Language.TYPESCRIPT,
        Language.SHELL
    ]);
    const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrderType>(SortOrderType.DESC);
    const [selectedSortOption, setSelectedSortOption] = useState<SortOptionType>(SortOptionType.UPDATED);

    const handleAddLanguage = useCallback((i: Language) => {
        setSelectedLanguages(prev => [...prev, i]);
    }, []);

    const handleRemoveLanguage = useCallback((i: Language) => {
        setSelectedLanguages(prev => prev.filter(p => p !== i));
    }, []);

    return (
        <PageWrapper className={"gap-5"}>
            <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6622971471365186"
                    crossOrigin="anonymous"></script>
            <ins className="adsbygoogle"
                 style={{display: 'block'}}
                 data-ad-format="fluid"
                 data-ad-layout-key="-hh+g-c-5v+bq"
                 data-ad-client="ca-pub-6622971471365186"
                 data-ad-slot="6666173361"></ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            <div className={"text-gray-600 text-xl font-bold dark:text-gray-300"}>Search from a pool of community
                codes
            </div>
            <div className={"flex w-full items-center gap-3"}>
                <Input
                    value={search}
                    setValue={setSearch}
                    placeHolder={"Search codes by title"}
                    className={
                        "w-full"
                    }
                />
            </div>
            <div className={"flex flex-col md:flex-row gap-10"}>
                <div className={"grid h-fit gap-5 w-[100%] md:w-[180px] order-last md:order-first"}>
                    <LanguageFilter addItem={handleAddLanguage} remove={handleRemoveLanguage}
                                    selectedItems={selectedLanguages}/>
                    <SortOption selectedOption={selectedSortOption} setSelectedOption={setSelectedSortOption}/>
                    <SortOrder selectedOption={selectedSortOrder} setSelectedOption={setSelectedSortOrder}/>
                </div>
                <CodeDisplay navigationEnabled url={'/api/public/code/'} searchOptions={{
                    languages: selectedLanguages,
                    sortBy: selectedSortOption,
                    sortOrder: selectedSortOrder,
                    title: search
                }}/>
            </div>
        </PageWrapper>
    );
};

export default Codes;
