import { FC, useState } from "react";
import BlueButton from "../../ui/BlueButton";
import Input from "../../ui/Input";
import RichTextEditor from "../../ui/RichTextEditor";
import Overlay from "../common/Overlay";

const SaveModal: FC<{ onSaveClick: (title: string, description: string) => void; onCancelClick: () => void }> = (props) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	return (
		<Overlay>
			<div className="shadow-xl w-[600px] h-fit bg-white p-10 flex flex-col gap-5">
				<div className="font-bold text-2xl text-gray-700 border-b pb-3">Save your code</div>
				<Input value={title} setValue={setTitle} placeHolder="Hello world program" header="Enter code title" />
				<RichTextEditor
					value={description}
					onChange={setDescription}
					placeholder="Shows a beautiful hello world message"
					header="Describe what this code does"
				/>
				<BlueButton onClick={props.onCancelClick} className="rounded">
					Cancel
				</BlueButton>
				<BlueButton
					className="rounded"
					filled
					onClick={() => {
						props.onSaveClick(title, description);
					}}
				>
					Save
				</BlueButton>
			</div>
		</Overlay>
	);
};

export default SaveModal;
