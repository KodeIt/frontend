import {FC, useState} from "react";
import CodeItem from "../codes/CodeItem";
import {dummyCodes} from "../../util/dummy-data";

const Statistics: FC = props => {
    const [codesWritten, setCodesWritten] = useState(dummyCodes.slice(0, 5));
    const [codesStarred, setCodesStarred] = useState(dummyCodes.slice(3, 6));

    return <div className={'flex-grow flex flex-col gap-10'}>
        <div className={'flex justify-between items-center border-b pb-5'}>
            <div className={'text-2xl text-gray-600 font-semibold '}>Level <span
                className={'text-sky-500'}>10</span>
            </div>
            <div className={'font-light text-lg'}><span
                className={'text-sky-500'}>50</span> more points to <span
                className={'text-sky-500'}>Level 11</span></div>
        </div>
        <div className={'text-2xl text-gray-600 font-semibold border-b pb-5'}>Last <span
            className={'text-sky-500'}>5</span> codes
            <span
                className={'text-sky-500'}> written</span>
        </div>
        <div className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-x-5 md:gap-y-0'}>
            {codesWritten && codesWritten.map(c => <CodeItem code={c}/>)}
        </div>
        <div className={'text-2xl text-gray-600 font-semibold border-b pb-5'}>Last <span
            className={'text-sky-500'}>5</span> codes
            <span
                className={'text-sky-500'}> starred</span>
        </div>
        <div className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-x-5 md:gap-y-0'}>
            {codesStarred && codesStarred.map(c => <CodeItem code={c}/>)}
        </div>
    </div>
}

export default Statistics;