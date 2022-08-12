import {FC, useState} from "react";
import {Switch} from "@mui/material";

const Appearance: FC = props => {
    const [darkEnabled, setDarkEnabled] = useState(false);

    return <div className={'flex flex-col gap-5'}>
        <div className={'text-gray-700 text-xl font-light border-b pb-5 '}>
            <span className={'font-mono text-sky-500'}>Choose</span> how the website looks
        </div>
        <div className={'flex flex-col'}>
            <div className={'text-lg text-gray-600'}>Enable dark mode</div>
            <div className={'flex gap-5 justify-between items-center'}>
                <div className={'text-gray-500 text-sm'}>We care about your beautiful eyes. Enable dark mode
                    to unburden
                    them
                    from the stress of UV at
                    night(and at daytime if you are nocturnal as us!)
                </div>
                <Switch
                    checked={darkEnabled}
                    onChange={() => setDarkEnabled(!darkEnabled)}
                />
            </div>
        </div>
    </div>
}

export default Appearance;