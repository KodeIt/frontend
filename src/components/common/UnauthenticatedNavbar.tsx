import {FC} from "react";
import {Link} from "react-router-dom";

const UnauthenticatedNavbar: FC = props => {
    return <div className={'bg-gray-100 min-h-[80px] w-screen flex items-center'}>
        <div className={`w-[90%] md:w-[80%] lg:w-[1300px] mx-auto flex justify-between items-center`}>
            <Link to={'/'} className={`cursor-pointer font-mono font-bold text-2xl text-sky-500`}>{`<KodeIt/>`}</Link>
            <div className={'flex gap-5 md:gap-10'}>
                <Link to={'/compiler'}
                      className={'text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light'}>Compiler</Link>
                <Link to={'/codes'}
                      className={'text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light'}>Codes</Link>
                <Link to={'/sign-in'}
                      className={'text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light'}>Sign
                    In</Link>
            </div>
        </div>
    </div>
}

export default UnauthenticatedNavbar;