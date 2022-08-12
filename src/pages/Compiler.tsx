import {FC, useEffect, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import {Language} from "../util/enums";
import {DeleteRounded, InfoRounded, PlayArrowRounded, SaveRounded, UploadRounded} from "@mui/icons-material";
import CodeEditor from "../ui/CodeEditor";
import {defaultCode} from "../util/default-codes";

const Compiler: FC = props => {
    const [language, setLanguage] = useState<number>(Language.C.valueOf());
    const [code, setCode] = useState<string>(defaultCode[0]);
    const [value, setValue] = useState('');

    useEffect(() => {
        // @ts-ignore
        setCode(defaultCode[language.toString()]);
    }, [language]);

    return <PageWrapper className={'pt-10 gap-10'}>
        <div className={'flex flex-col md:flex-row md:justify-between w-full items-start md:items-center gap-5'}>
            <div className={'text-gray-600 text-xl font-bold'}>Code what your heart wants to</div>
            <div className={'flex gap-5 items-center'}>
                <select
                    className={'w-[200px] border-2 bg-transparent p-3 rounded border-gray-300 text-gray-700'}
                    onChange={e => setLanguage(+e.target.value)}
                >
                    <option value={Language.C.valueOf()}>C</option>
                    <option value={Language.CPP.valueOf()}>C++</option>
                    <option value={Language.JAVA.valueOf()}>Java</option>
                    <option value={Language.JAVASCRIPT.valueOf()}>JavaScript</option>
                    <option value={Language.TYPESCRIPT.valueOf()}>TypeScript</option>
                    <option value={Language.SHELL.valueOf()}>Shell</option>
                    <option value={Language.PYTHON.valueOf()}>Python</option>
                </select>
                <button
                    className={'transition-all ease-out duration-300 hover:bg-sky-500 hover:text-slate-50 rounded border-2 border-sky-500 p-2 text-sky-500'}>
                    <PlayArrowRounded/></button>
                <button
                    className={'transition-all ease-out duration-300 hover:bg-emerald-500 hover:text-slate-50 rounded border-2 border-emerald-500 p-2 text-emerald-500'}>
                    <UploadRounded/></button>
                <button
                    className={'transition-all ease-out duration-300 hover:bg-emerald-500 hover:text-slate-50 rounded border-2 border-emerald-500 p-2 text-emerald-500'}>
                    <SaveRounded/></button>
                <button
                    className={'transition-all ease-out duration-300 hover:bg-emerald-500 hover:text-slate-50 rounded border-2 border-emerald-500 p-2 text-emerald-500'}>
                    <InfoRounded/></button>
                <button
                    className={'transition-all ease-out duration-300 hover:bg-rose-500 hover:text-slate-50 rounded border-2 border-rose-500 p-2 text-rose-500'}>
                    <DeleteRounded/></button>
            </div>
        </div>
        <div className={'flex flex-col lg:flex-row w-full gap-5 lg:gap-10'}>
            <div className={'w-[100%] lg:w-[70%] h-[500px] lg:h-full border rounded'}>
                <CodeEditor language={language} code={code} onChange={setCode}/>
            </div>
            <div className={'flex-grow flex flex-col gap-5'}>
                <div className={'grid gap-2'}>
                    <div className={'text-gray-600 text-lg'}>Input</div>
                    <textarea placeholder={'Type the input your code needs'}
                              className={'w-full h-[30vh] border border-gray-300 rounded font-mono p-3'}></textarea>
                </div>
                <div className={'grid gap-2'}>
                    <div className={'text-gray-600 text-lg'}>Output</div>
                    <div className={'w-full h-[30vh] border border-gray-300 rounded font-mono p-3'}></div>
                </div>
            </div>
        </div>

    </PageWrapper>
}

export default Compiler;