import {FC} from "react";
import {EmailRounded, GroupRounded, LocationOnRounded} from "@mui/icons-material";
import BlueButton from "../../ui/BlueButton";

const About: FC = props => {
    return <div className={'w-[300px] flex flex-col gap-10 mx-auto md:m-0'}>
        <div className={'bg-gray-200 w-[300px] h-[300px] rounded-full'}>
            <img className={'w-[300px] h-[300px] rounded-full'}
                 src={'https://avatars.githubusercontent.com/u/83924254?v=4'} alt={'avatar'}/>
        </div>
        <div className={'flex flex-col gap-3'}>
            <div className={'text-gray-700 text-2xl font-bold border-b pb-3'}>Rajdip Bhattacharya</div>
            <div className={'text-gray-500 flex gap-5 text-sm items-center'}><LocationOnRounded/>
                <div>Kolkata, West Bengal</div>
            </div>
            <div className={'text-gray-500 flex gap-5 text-sm items-center'}><EmailRounded/>
                <div>agentR47@gmail.com</div>
            </div>
            <div className={'text-gray-500 flex gap-2 text-sm items-center'}>
                <GroupRounded/>
                <button className={'ml-3'}><span>3</span> followers</button>
                <div className={'h-1 w-1 rounded-full bg-gray-500'}></div>
                <button><span>5</span> following</button>
            </div>
        </div>
        <BlueButton className={'rounded'} onClick={() => {
        }}>Edit profile</BlueButton>
    </div>
}

export default About;