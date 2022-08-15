import {FC, useCallback, useState} from "react";
import Input from "../../ui/Input";
import RichTextEditor from "../../ui/RichTextEditor";
import Overlay from "../common/Overlay";
import Button from "../../ui/Button";
import {toast} from "react-toastify";

const SaveModal: FC<{ onSaveClick: (title: string, description: string) => void; onCancelClick: () => void; title: string; description: string }> = (props) => {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);

    const handleSaveClick = useCallback(() => {
        if (!title || title === '') {
            toast.error('Title can\'t be empty!');
            return;
        }

        props.onSaveClick(title, description);
    }, [description, props, title]);

    return (
        <Overlay>
            <div className="shadow-xl w-[600px] h-fit bg-white dark:bg-dark p-10 flex flex-col gap-5 rounded-lg">
                <div
                    className="font-bold text-2xl text-gray-700 border-b pb-3 dark:text-gray-300 border-b-gray-600">Save
                    your code
                </div>
                <Input value={title} setValue={setTitle} placeHolder="Hello world program" header="Enter code title"/>
                <RichTextEditor
                    value={description}
                    onChange={setDescription}
                    placeholder="Shows a beautiful hello world message"
                    header="Describe what this code does"
                />
                <Button onClick={props.onCancelClick}>
                    Cancel
                </Button>
                <Button
                    filled
                    onClick={handleSaveClick}
                >
                    Save
                </Button>
            </div>
        </Overlay>
    );
};

export default SaveModal;
