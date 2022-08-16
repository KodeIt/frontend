import {FC, useCallback} from "react";
import {Language} from "../../util/enums";
import c from "../../assets/c.png";
import cpp from "../../assets/cpp.png";
import java from "../../assets/java.png";
import shell from "../../assets/bash.png";
import javascript from "../../assets/javascript.png";
import python from "../../assets/python.png";
import typescript from "../../assets/typescript.png";
import {StarOutline, StarRounded} from "@mui/icons-material";
import {Code} from "../../util/entities";
import {Link, useNavigate} from "react-router-dom";
import useAuthorizedHttp from "../../hooks/useAuthorizedHttp";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";

const getLanguageImage = (language: Language) => {
    if (Language[language].toString() === Language.C.toString()) return c;
    if (Language[language].toString() === Language.CPP.toString()) return cpp;
    if (Language[language].toString() === Language.JAVA.toString()) return java;
    if (Language[language].toString() === Language.SHELL.toString()) return shell;
    if (Language[language].toString() === Language.JAVASCRIPT.toString()) return javascript;
    if (Language[language].toString() === Language.PYTHON.toString()) return python;
    if (Language[language].toString() === Language.TYPESCRIPT.toString()) return typescript;
};

const CodeItem: FC<{ code: Code; onStarred: (codeId: number) => void; onUnStarred: (codeId: number) => void }> = (props) => {
    const navigate = useNavigate();
    const makeAuthorizedRequest = useAuthorizedHttp();
    const isLoggedIn = useSelector((state: StoreStateType) => state.app.isLoggedIn);

    const navigateToCompiler = useCallback(() => {
        navigate('/compiler?id=' + props.code.id);
    }, [navigate, props.code.id]);

    const navigateToProfile = useCallback(() => {
        navigate('/profile/' + props.code.user!.id);
    }, [navigate, props.code.user]);

    const starCode = useCallback(() => {
        makeAuthorizedRequest({
                url: `/api/private/code/${props.code.id}/star`,
                method: 'put'
            },
            () => props.onStarred(props.code.id!)
        )
    }, [makeAuthorizedRequest, props]);

    const unStarCode = useCallback(() => {
        makeAuthorizedRequest({
                url: `/api/private/code/${props.code.id}/un-star`,
                method: 'put'
            },
            () => props.onUnStarred(props.code.id!)
        )
    }, [makeAuthorizedRequest, props]);

    return (
        <div
            className={"rounded p-5 dark:bg-slate-700 items-start flex gap-3 shadow hover:shadow-lg relative hover:-translate-y-1 transition-all ease-out duration-300 h-fit"}>
            <button onClick={navigateToCompiler}>
                <img className={"w-[40px] h-[40px] rounded-lg"} src={getLanguageImage(props.code.language!)}
                     alt={"lang"}/>
            </button>
            <div className={"flex-grow flex flex-col gap-3"}>
                <div className={"flex justify-between items-center"}>
                    <button onClick={navigateToCompiler}
                            className={"text-lg text-left text-sky-500 break-words"}>{props.code.title}</button>
                    <div className={'flex flex-col justify-center items-center'}>
                        {isLoggedIn && (props.code.isStarred ?
                            <button onClick={unStarCode} className={"text-sky-500"}>
                                <StarRounded/>
                            </button>
                            :
                            <button onClick={starCode} className={"text-sky-500"}>
                                <StarOutline/>
                            </button>)}
                        <Link className={'text-sm text-sky-500'}
                              to={'/code/' + props.code.id + '/stars'}>{props.code.stars} stars</Link>
                    </div>
                </div>
                <div className={"text-sm text-gray-500 dark:text-gray-400"}>
                    Last updated{" "}
                    {new Date(props.code.updated!).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "2-digit",
                        year: "2-digit",
                    })}
                </div>
                <button onClick={navigateToProfile}
                        className={"text-left text-sky-500 text-sm"}>{props.code.user?.name}</button>
            </div>
        </div>
    );
};

export default CodeItem;
