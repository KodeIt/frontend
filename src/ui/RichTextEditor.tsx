import React, {FC} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const RichTextEditor: FC<{ value: any; onChange: (value: any) => void; placeholder?: string; header?: string }> = (props) => {
    return <div className={''}>
        <div className={'text-sm text-gray-500 pl-2 mb-1 dark:text-gray-400'}>{props.header}</div>
        <ReactQuill
            className={'dark:text-gray-300'}
            placeholder={props.placeholder}
            modules={{
                toolbar: {
                    container: [
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        ['bold', 'italic', 'underline'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'align': []}],
                        ['link', 'image'],
                        ['clean'],
                        [{'color': []}]
                    ],
                    // handlers: {
                    //     image: this.imageHandler
                    // }
                },
            }} theme="snow" value={props.value} onChange={props.onChange}
        />
    </div>
}

export default RichTextEditor;
