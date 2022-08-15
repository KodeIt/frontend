import {FC} from "react";
import Button, {Color} from "../../ui/Button";

const Profile: FC = props => {

    return <div className={'flex flex-col gap-5'}>
        <div className={'text-gray-700 text-xl font-light border-b pb-5 dark:text-gray-300'}>
            <span className={'font-mono text-sky-500'}>Modify</span> how your profile functions
        </div>
        <div className={'flex flex-col gap-3'}>
            <div className={'text-lg text-gray-600 dark:text-gray-300'}>Delete your account</div>
            <div className={'text-gray-500 text-sm dark:text-gray-400'}>
                Deleting your account is just a click away. It would be hard for us to see you go.
                As a parting gift we would say that we don't keep any of your data with us(not even your codes!)
                after you say goodbye.
            </div>
            <Button filled color={Color.ROSE} className={'w-[400px]'}>I understand, delete my account</Button>
        </div>
    </div>
}

export default Profile;