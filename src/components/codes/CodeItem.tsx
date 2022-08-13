import { FC } from "react";
import { dummyCodeType } from "../../util/dummy-data";
import { Language } from "../../util/enums";
import c from "../../assets/c.png";
import cpp from "../../assets/cpp.png";
import java from "../../assets/java.png";
import shell from "../../assets/bash.png";
import javascript from "../../assets/javascript.png";
import python from "../../assets/python.png";
import typescript from "../../assets/typescript.png";
import { StarOutline } from "@mui/icons-material";
import { Code } from "../../util/entities";

const getLanguageImage = (language: Language) => {
	if (Language[language].toString() === Language.C.toString()) return c;
	if (Language[language].toString() === Language.CPP.toString()) return cpp;
	if (Language[language].toString() === Language.JAVA.toString()) return java;
	if (Language[language].toString() === Language.SHELL.toString()) return shell;
	if (Language[language].toString() === Language.JAVASCRIPT.toString()) return javascript;
	if (Language[language].toString() === Language.PYTHON.toString()) return python;
	if (Language[language].toString() === Language.TYPESCRIPT.toString()) return typescript;
};

const CodeItem: FC<{ code: Code }> = (props) => {
	getLanguageImage(props.code.language!);
	return (
		<div className={"rounded p-5 flex gap-3 shadow hover:shadow-lg relative hover:-translate-y-1 transition-all ease-out duration-300 h-fit"}>
			<div>
				<img className={"w-[40px] h-[40px] rounded-lg"} src={getLanguageImage(props.code.language!)} alt={"lang"} />
			</div>
			<div className={"flex-grow flex flex-col gap-3"}>
				<div className={"flex justify-between items-center"}>
					<button className={"text-lg text-left text-sky-500 break-all"}>{props.code.title}</button>
					<button className={"text-sky-500"}>
						<StarOutline />
					</button>
				</div>
				<div className={"text-sm text-gray-500"}>
					Last updated{" "}
					{new Date(props.code.updated!).toLocaleDateString("en-IN", {
						month: "short",
						day: "2-digit",
						year: "2-digit",
					})}
				</div>
				<button className={"text-left text-sky-500 text-sm"}>{props.code.user?.name}</button>
			</div>
		</div>
	);
};

export default CodeItem;
