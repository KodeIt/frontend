import {FC, useCallback} from "react";
import {Link} from "react-router-dom";
import {HomeRounded, LogoutRounded, PersonRounded, SettingsRounded} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {persistor, StoreStateType} from "../../store/store";

const Dropdown: FC = () => {
    const userCtx = useSelector((state: StoreStateType) => state.user);

    const handleLogout = useCallback(() => {
        persistor.purge().then(() => window.location.href = "/");
    }, []);

    return <div
        className={'z-50 shadow-lg absolute top-[80px] right-[5%] md:right-[10%] lg:right-[15%] bg-gray-100 dark:bg-gray-800 w-[300px] rounded '}>
        <Link to={'/'}
              className={'flex items-center justify-start gap-10 p-5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ease-out duration-300'}>
            <HomeRounded className={'text-gray-700 dark:text-gray-300'}/>
            <div className={'text-sky-500'}>Home</div>
        </Link>
        <Link to={`/profile/${userCtx.user.id}`}
              className={'flex gap-10 items-center justify-start p-5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ease-out duration-300'}>
            <PersonRounded className={'text-gray-700 dark:text-gray-300'}/>
            <div className={'text-sky-500'}>Profile</div>
        </Link>
        <Link to={'/settings'}
              className={'flex gap-10 items-center justify-start p-5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ease-out duration-300'}>
            <SettingsRounded className={'text-gray-700 dark:text-gray-300'}/>
            <div className={'text-sky-500'}>Settings</div>
        </Link>
        <button onClick={handleLogout}
                className={'w-full flex gap-10 items-center justify-start p-5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all ease-out duration-300'}>
            <LogoutRounded className={'text-gray-700 dark:text-gray-300'}/>
            <div className={'text-sky-500'}>Log Out</div>
        </button>
    </div>
}

export default Dropdown;