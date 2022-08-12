import {FC} from "react";
import BlueButton from "../../ui/BlueButton";

const Profile: FC = props => {
    return <div className={'flex flex-col gap-5'}>
        <div className={'text-gray-700 text-xl font-light border-b pb-5 '}>
            <span className={'font-mono text-sky-500'}>Modify</span> how your profile functions
        </div>
        <div className={'flex flex-col gap-3'}>
            <div className={'text-lg text-gray-600'}>Delete your account</div>
            <div className={'text-gray-500 text-sm'}>
                Deleting your account is just a click away. It would be hard for us to see you go.
                As a parting gift we would say that we don't keep any of your data with us(not even your codes!)
                after you say goodbye.
            </div>
            <BlueButton className={'w-fit border-rose-500 text-rose-500 rounded'} onClick={() => {
            }}>I understand, delete my account</BlueButton>
        </div>
    </div>
}

export default Profile;