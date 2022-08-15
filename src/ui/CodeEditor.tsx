import AceEditor from "react-ace";
import {FC} from "react";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java"
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/snippets/c_cpp"
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python"
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript"
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/snippets/typescript"
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-cloud9_day";
import "ace-builds/src-noconflict/ext-language_tools";
import {Language} from "../util/enums";
import {useSelector} from "react-redux";
import {StoreStateType} from "../store/store";

const getMode = (language: number) => {
    if (language === Language.C.valueOf() || language.toString() === Language.CPP.toString()) return 'c_cpp';
    if (language === Language.JAVA.valueOf()) return 'java';
    if (language === Language.PYTHON.valueOf()) return 'python';
    if (language === Language.TYPESCRIPT.valueOf()) return 'typescript';
    if (language === Language.JAVASCRIPT.valueOf()) return 'javascript';
    return 'c_cpp';
}

const CodeEditor: FC<{ code: string; onChange: (code: string) => void; language: number }> = props => {
    const isDarkMode = useSelector((state: StoreStateType) => state.app.isDarkMode);

    return <AceEditor
        style={{width: '100%', height: '100%'}}
        placeholder={props.code}
        mode={getMode(props.language)}
        theme={isDarkMode ? "one_dark" : "cloud9_day"}
        onChange={props.onChange}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={props.code}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
        }}/>
}

export default CodeEditor;