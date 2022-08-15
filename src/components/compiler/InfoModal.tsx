import {FC, useCallback} from "react";
import Overlay from "../common/Overlay";
import {User} from "../../util/entities";
import BlueButton from "../../ui/BlueButton";
import {useNavigate} from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

const InfoModal: FC<{ title: string; description: string; user: User; onCloseClick: () => void }> = props => {
    const navigate = useNavigate();

    const navigateToProfile = useCallback(() => navigate('/profile/' + props.user.id), [navigate, props.user.id])

    return <Overlay>
        <div className="dark:bg-dark shadow-xl w-[600px] h-fit bg-white p-10 flex flex-col gap-5 rounded-lg">
            <div
                className={'text-2xl font-bold text-gray-600 border-b pb-3 dark:text-gray-300 dark:border-b-gray-600'}>{props.title}</div>
            {props.description ? <div className={'ql-editor'} dangerouslySetInnerHTML={{__html: props.description}}/> :
                <div className={'text-gray-700 dark:text-gray-400 text-xl'}>No description provided</div>}
            <div className={'flex gap-2 text-sm items-end justify-end'}>
                <div className={'text-gray-700 dark:text-gray-400'}>Author:</div>
                <button onClick={navigateToProfile} className={'text-sky-500'}>{props.user.name}</button>
            </div>
            <BlueButton className={'rounded'} onClick={props.onCloseClick}>Close this box</BlueButton>
        </div>
    </Overlay>
}

export default InfoModal