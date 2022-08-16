import {FC, useState} from "react";
import {Switch} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";
import {appActions} from "../../store/app-slice";

const Appearance: FC = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: StoreStateType) => state.app.isDarkMode);
    const [darkEnabled, setDarkEnabled] = useState(isDarkMode);

    return <div className={'flex flex-col gap-5'}>
        <div className={'text-gray-700 text-xl font-light border-b pb-5 dark:text-gray-300 dark:border-b-gray-600'}>
            <span className={'font-mono text-sky-500'}>Choose</span> how the website looks
        </div>
        <div className={'flex flex-col'}>
            <div className={'text-lg text-gray-600 dark:text-gray-300'}>Enable dark mode</div>
            <div className={'flex gap-5 justify-between items-center '}>
                <div className={'text-gray-500 text-sm dark:text-gray-400'}>We care about your beautiful eyes. Enable
                    dark mode
                    to unburden
                    them
                    from the stress of UV at
                    night(and at daytime if you are nocturnal as us!)
                </div>
                <Switch
                    checked={darkEnabled}
                    onChange={() => {
                        setDarkEnabled(!darkEnabled);
                        dispatch(appActions.toggleDarkMode());
                    }}
                />
            </div>
        </div>
    </div>
}

export default Appearance;