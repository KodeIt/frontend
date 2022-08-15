import {FC, useCallback, useEffect, useState} from "react";
import PageWrapper from "../components/common/PageWrapper";
import {Language} from "../util/enums";
import {DeleteRounded, InfoRounded, PlayArrowRounded, SaveRounded, UploadRounded} from "@mui/icons-material";
import CodeEditor from "../ui/CodeEditor";
import {defaultCode} from "../util/default-codes";
import useHttp from "../hooks/makeRequest";
import {toast} from "react-toastify";
import {Code, ExecutionOutput, User} from "../util/entities";
import SaveModal from "../components/compiler/SaveModal";
import useAuthorizedHttp from "../hooks/useAuthorizedHttp";
import InfoModal from "../components/compiler/InfoModal";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoreStateType} from "../store/store";
import Button, {Color} from "../ui/Button";

const Compiler: FC = (props) => {
    const codeId = new URL(window.location.href).searchParams.get("id");
    const appCtx = useSelector((state: StoreStateType) => state.app);
    const navigate = useNavigate();
    const makeRequest = useHttp();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const makeAuthorizedRequest = useAuthorizedHttp();
    const [saveModalVisible, setSaveModalVisible] = useState(false);
    const [language, setLanguage] = useState<number>(Language.C.valueOf());
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<ExecutionOutput | null>(null);
    const [execSuccessMessage, setExecSuccessMessage] = useState("Execution successful!");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState<{ language: Language; text: string }[]>([
        {
            language: Language.C,
            text: defaultCode["0"],
        },
        {
            language: Language.CPP,
            text: defaultCode["1"],
        },
        {
            language: Language.JAVA,
            text: defaultCode["2"],
        },
        {
            language: Language.SHELL,
            text: defaultCode["3"],
        },
        {
            language: Language.PYTHON,
            text: defaultCode["4"],
        },
        {
            language: Language.JAVASCRIPT,
            text: defaultCode["5"],
        },
        {
            language: Language.TYPESCRIPT,
            text: defaultCode["6"],
        },
    ]);


    const handleCodeChange = useCallback(
        (text: string) => {
            setCode((prev) => {
                const p = [...prev];
                p[language].text = text;
                return p;
            });
        },
        [language]
    );

    const handleRunClick = useCallback(() => {
        toast.promise(
            () =>
                makeRequest(
                    {
                        url: "/api/public/code/run",
                        method: "put",
                        body: {
                            code: code[language.valueOf()].text,
                            input,
                            language,
                        },
                    },
                    (data: ExecutionOutput) => setOutput(data)
                ),
            {
                pending: "Executing your code...",
                success: execSuccessMessage,
                error: "Uh-oh! That didn't go too well",
            }
        );
    }, [code, execSuccessMessage, input, language, makeRequest]);

    const closeSaveModal = useCallback(() => setSaveModalVisible(false), []);

    const closeInfoModal = useCallback(() => setInfoModalVisible(false), []);

    const handleSaveClick = useCallback(
        (title: string, description: string) => {
            closeSaveModal();
            const body = {
                title,
                description,
                code: code[language].text,
                language,
                input,
            };

            let url = "/api/private/code/";
            let method = "post";

            if (codeId) {
                url = url + codeId;
                method = "put";
            }

            toast.promise(
                () =>
                    makeAuthorizedRequest({
                        url,
                        body,
                        method,
                    }),
                {
                    pending: "Uploading your code...",
                    success: "Uploaded your code!",
                    error: "Uh-oh! Something went wrong.",
                }
            );
        },
        [closeSaveModal, code, codeId, input, language, makeAuthorizedRequest]
    );

    const handleDeleteClick = useCallback(() => {
        toast.promise(() => makeAuthorizedRequest({
                    url: '/api/private/code/' + codeId,
                    method: 'delete'
                },
                () => navigate('/codes')),
            {
                pending: 'Deleting your code...',
                success: 'Successfully deleted your code!',
                error: 'Uh-oh! Something went wrong.'
            });
    }, []);

    useEffect(() => {
        if (codeId) {
            makeRequest({
                url: '/api/public/code/' + codeId
            }, (data: Code) => {
                data.title && setTitle(data.title);
                data.description && setDescription(data.description);
                data.language && setLanguage(+Language[data.language]);
                data.input && setInput(data.input);
                data.code && setCode(prev => {
                    const p = [...prev];
                    p[language].text = data.code!;
                    return p;
                });
                data.user && setUser(data.user);
            })
        }
    }, [codeId, language, makeRequest])

    // useEffect(() => {
    // 	if (output && ExecutionStatus[output.executionStatus].toString() === ExecutionStatus.SUCCESS.toString())
    // 		setExecSuccessMessage("Execution successful!");
    // 	else setExecSuccessMessage("Execution successful but has errors.");
    // }, [output, output?.executionStatus]);

    return (
        <>
            {infoModalVisible && user &&
                <InfoModal title={title} description={description} user={user} onCloseClick={closeInfoModal}/>}
            {saveModalVisible && <SaveModal title={title} description={description} onCancelClick={closeSaveModal}
                                            onSaveClick={handleSaveClick}/>}
            <PageWrapper>
                <div
                    className={"flex flex-col md:flex-row md:justify-between w-full items-start md:items-center gap-5"}>
                    <div
                        className={"text-gray-600 dark:text-gray-300 text-xl font-bold"}>{title ? title : 'Code what your heart wants to'}</div>
                    <div className={"flex gap-5 items-start justify-start w-fit"}>
                        <select
                            value={language}
                            className={"w-[200px] border-2 bg-transparent p-3 rounded border-gray-300 dark:text-gray-400 text-gray-700 dark:border-gray-600"}
                            onChange={(e) => setLanguage(+e.target.value)}
                        >
                            <option value={Language.C.valueOf()}>C</option>
                            <option value={Language.CPP.valueOf()}>C++</option>
                            <option value={Language.JAVA.valueOf()}>Java</option>
                            <option value={Language.JAVASCRIPT.valueOf()}>JavaScript</option>
                            <option value={Language.TYPESCRIPT.valueOf()}>TypeScript</option>
                            <option value={Language.SHELL.valueOf()}>Shell</option>
                            <option value={Language.PYTHON.valueOf()}>Python</option>
                        </select>
                        <Button
                            onClick={handleRunClick}
                            className={'w-fit'}
                        >
                            <PlayArrowRounded/>
                        </Button>
                        {user && <Button
                            onClick={() => setInfoModalVisible(true)}
                        >
                            <InfoRounded/>
                        </Button>}
                        {appCtx.isLoggedIn && <Button
                            onClick={() => setSaveModalVisible(true)}
                            color={Color.GREEN}
                        >
                            <UploadRounded/>
                        </Button>}
                        <Button
                            color={Color.GREEN}
                        >
                            <SaveRounded/>
                        </Button>

                        {user && appCtx.isLoggedIn && <Button
                            disabled={loading}
                            onClick={handleDeleteClick}
                            color={Color.ROSE}
                        >
                            <DeleteRounded/>
                        </Button>}
                    </div>
                </div>
                <div className={"flex flex-col lg:flex-row w-full gap-5 lg:gap-10"}>
                    <div className={"w-[100%] mt-10 lg:w-[70%] h-[500px] lg:h-[615px] border rounded"}>
                        <CodeEditor language={language} code={code[language].text} onChange={handleCodeChange}/>
                    </div>
                    <div className={" w-[30%] flex flex-col gap-5"}>
                        <div className={"grid gap-2"}>
                            <div className={"text-gray-600 text-lg dark:text-gray-400"}>Input</div>
                            <textarea
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={"Type the input your code needs"}
                                className={"w-full h-[30vh] dark:bg-dark dark:text-gray-300 border border-gray-300 rounded font-mono p-3 dark:border-gray-600"}
                            ></textarea>
                        </div>
                        <div className={"grid gap-2 "}>
                            <div className={"text-gray-600 text-lg dark:text-gray-400"}>Output</div>
                            <div
                                className={"w-full h-[30vh] dark:text-gray-300 border border-gray-300 rounded font-mono p-3 overflow-scroll dark:border-gray-600"}>
                                {!output ? "Your output goes here" : output.output}
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};

export default Compiler;
