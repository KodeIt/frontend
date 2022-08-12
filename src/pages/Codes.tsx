import {FC, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import BlueButton from "../ui/BlueButton";
import {SearchRounded} from "@mui/icons-material";
import LanguageFilter from "../components/codes/LanguageFilter";
import SortOption from "../components/codes/SortOption";
import SortOrder from "../components/codes/SortOrder";
import {dummyCodes} from "../util/dummy-data";
import CodeItem from "../components/codes/CodeItem";

const Codes: FC = props => {
    const [codes, setCodes] = useState(dummyCodes);

    return <PageWrapper className={'gap-5'}>
        <div className={'text-gray-600 text-xl font-bold'}>Search from a pool of community codes</div>
        <div className={'flex w-full bg-sky-200'}>
            <input type={'text'}
                   placeholder={'Search codes by title'}
                   className={'w-full flex-grow rounded-l border-2 border-gray-300 focus:border-sky-500 outline-none p-2 text-gray-600 transition-all ease-out duration-300'}/>
            <BlueButton
                onClick={() => {
                }}
                filled={true}
                className={'flex gap-2 rounded-r w-[200px] items-center justify-center'}
            >
                <SearchRounded/>
                <div>Search</div>
            </BlueButton>
        </div>
        <div className={'flex flex-col md:flex-row gap-10'}>
            <div className={'grid gap-5 w-[100%] md:w-[180px] order-last md:order-first'}>
                <LanguageFilter/>
                <SortOption/>
                <SortOrder/>
            </div>
            <div className={'flex-grow grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-x-5 md:gap-y-0'}>
                {codes && codes.map(c => <CodeItem key={c.id} code={c}/>)}
            </div>
        </div>
    </PageWrapper>
}

export default Codes;