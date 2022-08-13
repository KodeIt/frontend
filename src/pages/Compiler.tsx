import { FC, useCallback, useEffect, useState } from "react";
import PageWrapper from "../components/common/PageWrapper";
import { ExecutionStatus, Language } from "../util/enums";
import { DeleteRounded, InfoRounded, PlayArrowRounded, SaveRounded, UploadRounded } from "@mui/icons-material";
import CodeEditor from "../ui/CodeEditor";
import { defaultCode } from "../util/default-codes";
import useHttp from "../hooks/makeRequest";
import { toast } from "react-toastify";
import { ExecutionOutput } from "../util/entities";
import SaveModal from "../components/compiler/SaveModal";
import useAuthorizedHttp from "../hooks/useAuthorizedHttp";

const Compiler: FC = (props) => {
	const codeId = new URL(window.location.href).searchParams.get("id");
	const [saveModalVisible, setSaveModalVisible] = useState(false);
	const [language, setLanguage] = useState<number>(Language.C.valueOf());
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<ExecutionOutput | null>(null);
	const [execSuccessMessage, setExecSuccessMessage] = useState("Execution successful!");
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

	const makeRequest = useHttp();
	const makeAuthorizedRequest = useAuthorizedHttp();

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
					(data: ExecutionOutput) => {
						setOutput(data);
						console.log(data);
					}
				),
			{
				pending: "Executing your code...",
				success: execSuccessMessage,
				error: "Uh-oh! That didn't go too well",
			}
		);
	}, [code, execSuccessMessage, input, language, makeRequest]);

	const closeModal = useCallback(() => setSaveModalVisible(false), []);

	const handleSaveClick = useCallback(
		(title: string, description: string) => {
			closeModal();
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
		[closeModal, code, codeId, input, language, makeAuthorizedRequest]
	);

	// useEffect(() => {
	// 	if (output && ExecutionStatus[output.executionStatus].toString() === ExecutionStatus.SUCCESS.toString())
	// 		setExecSuccessMessage("Execution successful!");
	// 	else setExecSuccessMessage("Execution successful but has errors.");
	// }, [output, output?.executionStatus]);

	return (
		<>
			{saveModalVisible && <SaveModal onCancelClick={closeModal} onSaveClick={handleSaveClick} />}
			<PageWrapper className={"pt-10 gap-10"}>
				<div className={"flex flex-col md:flex-row md:justify-between w-full items-start md:items-center gap-5"}>
					<div className={"text-gray-600 text-xl font-bold"}>Code what your heart wants to</div>
					<div className={"flex gap-5 items-center"}>
						<select
							className={"w-[200px] border-2 bg-transparent p-3 rounded border-gray-300 text-gray-700"}
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
						<button
							onClick={handleRunClick}
							className={
								"transition-all ease-out duration-300 hover:bg-sky-500 hover:text-slate-50 rounded border-2 border-sky-500 p-2 text-sky-500"
							}
						>
							<PlayArrowRounded />
						</button>
						<button
							onClick={() => setSaveModalVisible(true)}
							className={
								"transition-all ease-out duration-300 hover:bg-emerald-500 hover:text-slate-50 rounded border-2 border-emerald-500 p-2 text-emerald-500"
							}
						>
							<UploadRounded />
						</button>
						<button
							className={
								"transition-all ease-out duration-300 hover:bg-emerald-500 hover:text-slate-50 rounded border-2 border-emerald-500 p-2 text-emerald-500"
							}
						>
							<SaveRounded />
						</button>
						<button
							className={
								"transition-all ease-out duration-300 hover:bg-emerald-500 hover:text-slate-50 rounded border-2 border-emerald-500 p-2 text-emerald-500"
							}
						>
							<InfoRounded />
						</button>
						<button
							className={
								"transition-all ease-out duration-300 hover:bg-rose-500 hover:text-slate-50 rounded border-2 border-rose-500 p-2 text-rose-500"
							}
						>
							<DeleteRounded />
						</button>
					</div>
				</div>
				<div className={"flex flex-col lg:flex-row w-full gap-5 lg:gap-10"}>
					<div className={"w-[100%] lg:w-[70%] h-[500px] lg:h-full border rounded"}>
						<CodeEditor language={language} code={code[language].text} onChange={handleCodeChange} />
					</div>
					<div className={" w-[30%] flex flex-col gap-5"}>
						<div className={"grid gap-2"}>
							<div className={"text-gray-600 text-lg"}>Input</div>
							<textarea
								onChange={(e) => setInput(e.target.value)}
								placeholder={"Type the input your code needs"}
								className={"w-full h-[30vh] border border-gray-300 rounded font-mono p-3"}
							></textarea>
						</div>
						<div className={"grid gap-2 "}>
							<div className={"text-gray-600 text-lg"}>Output</div>
							<div className={"w-full h-[30vh] border border-gray-300 rounded font-mono p-3 overflow-scroll"}>
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
