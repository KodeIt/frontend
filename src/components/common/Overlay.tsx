import {FC, ReactNode} from "react";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";

const Overlay: FC<{ children: ReactNode }> = (props) => {
    const isDarkMode = useSelector((state: StoreStateType) => state.app.isDarkMode);

    return <div
        className={`absolute z-20 w-screen h-screen bg-gray-700/30 flex items-center justify-center ${isDarkMode && 'dark'}`}>{props.children}</div>;
};

export default Overlay;
