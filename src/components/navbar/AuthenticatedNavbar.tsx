import {FC, useState} from "react";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";
import {KeyboardArrowDown, PersonRounded} from "@mui/icons-material";
import Dropdown from "./Dropdown";
import banner from "../../assets/banner.png";

const AuthenticatedNavbar: FC = () => {
    const userCtx = useSelector((state: StoreStateType) => state.user);
    const [dropdownCollapsed, setDropdownCollapsed] = useState(false);

    return (
        <div className={"fixed z-50 bg-gray-700 min-h-[80px] w-screen flex items-center"}>
            {dropdownCollapsed && <Dropdown/>}
            <div className={`w-[90%] md:w-[80%] lg:w-[70%] mx-auto flex justify-between items-center`}>
                <button onClick={() => window.location.href = '/'}
                        className={`cursor-pointer font-mono font-bold text-2xl text-sky-500`}>
                    <img className={'w-[130px]'} src={banner} alt={'KodeIt'}/>
                </button>
                <div className={"flex gap-5 md:gap-10 items-center"}>
                    <button
                        onClick={() => window.location.href = '/compiler'}
                        className={"text-gray-200 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light"}
                    >
                        Compiler
                    </button>
                    <button onClick={() => window.location.href = '/codes'}
                            className={"text-gray-200 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light"}>
                        Codes
                    </button>
                    <button onClick={() => setDropdownCollapsed(!dropdownCollapsed)}
                            className={"items-center flex gap-2 text-gray-600 dark:text-gray-300 group"}>
                        <div className={"w-[40px] h-[40px] rounded-full flex items-center"}>
                            {userCtx.user.avatar ? (
                                <img src={userCtx.user.avatar} className={"w-[40px] h-[40px] rounded-full"}
                                     alt={"avatar"}/>
                            ) : (
                                <PersonRounded/>
                            )}
                        </div>
                        <div

                            className={"text-gray-200 cursor-pointer transition-all ease-out duration-300 group-hover:text-sky-500 font-light"}
                        >
                            {userCtx.user.name?.split(" ")[0]}
                        </div>
                        <div
                            className={`group-hover:text-sky-500 transition-all ease-out duration-300 ${dropdownCollapsed && 'rotate-180'}`}>
                            <KeyboardArrowDown/>
                        </div>

                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthenticatedNavbar;
