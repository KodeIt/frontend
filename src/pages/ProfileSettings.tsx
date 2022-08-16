import {FC, useCallback, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import Personal from "../components/profile-settings/Personal";
import Appearance from "../components/profile-settings/Appearance";
import Account from "../components/profile-settings/Account";
import OptionsPanel from "../components/profile-settings/OptionsPanel";

export type optionType = {
    id: number,
    name: string,
}

const options = [
    {
        id: 0,
        name: "Personal",
    },
    {
        id: 1,
        name: "Appearance",
    },
    {
        id: 2,
        name: "Account",
    }
];

const elements = [
    <Personal/>, <Appearance/>, <Account/>
]

const ProfileSettings: FC = () => {
    const [selectedId, setSelectedId] = useState(0);

    const handleOptionSelected = useCallback((id: number) => {
        if (selectedId !== id)
            setSelectedId(id);
    }, [selectedId]);

    return <PageWrapper className={'gap-16'}>
        <div className={'text-gray-700 text-4xl font-bold dark:text-gray-300'}><span
            className={'text-sky-500 font-mono'}>Update</span> your profile settings
        </div>
        <div className={'flex gap-5'}>
            <OptionsPanel selectedId={selectedId} options={options} onOptionSelected={handleOptionSelected}/>
            <div className={'flex-grow w-full'}>{elements[selectedId]}</div>
        </div>
    </PageWrapper>
}

export default ProfileSettings;