import {FC} from "react";

const UnauthenticatedNavbar: FC = () => {
    return <div className={'fixed z-50 bg-gray-100 min-h-[80px] w-screen flex items-center'}>
        <div className={`w-[90%] md:w-[80%] lg:w-[70%] mx-auto flex justify-between items-center`}>
            <button onClick={() => window.location.href = '/'}
                    className={`cursor-pointer font-mono font-bold text-2xl text-sky-500`}>{`<KodeIt/>`}</button>
            <div className={'flex gap-5 md:gap-10'}>
                <button onClick={() => window.location.href = '/compiler'}
                        className={'text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light'}>Compiler
                </button>
                <button onClick={() => window.location.href = '/codes'}
                        className={'text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light'}>Codes
                </button>
                <button onClick={() => window.location.href = '/sign-in'}
                        className={'text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light'}>Sign
                    In
                </button>
            </div>
        </div>
    </div>
}

export default UnauthenticatedNavbar;