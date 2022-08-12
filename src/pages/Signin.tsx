import {FC} from "react";
import PageWrapper from "../components/common/PageWrapper";
import {DoneRounded, FacebookRounded, GitHub, Google} from "@mui/icons-material";
import BlueButton from "../ui/BlueButton";

const Signin: FC = props => {
    return <PageWrapper>
        <div className={`pt-20 lg:pt-0 mx-auto flex flex-col h-full justify-center w-full gap-16`}>
            <div className={`text-sky-500 text-4xl text-left font-semibold`}>Sign in to get the most of us.</div>
            <div className={'flex flex-col lg:flex-row justify-between gap-20 lg:gap-0'}>
                <div className={'flex flex-col gap-2 w-[90vw] lg:w-[50%]'}>
                    <div className={'text-2xl text-gray-600 mb-5'}>Why sign up with us?</div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Save your codes for others to see them.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Star someone's code that you liked.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Invite your friends over to code along with you.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Get your own ranked profile.</div>
                    </div>
                    <div className={'flex gap-3'}>
                        <DoneRounded className={'text-green-500'}/>
                        <div className={'text-gray-500'}>Protect your eyes with the dark mode!</div>
                    </div>
                </div>
                <div className={'flex flex-col gap-5 w-[90vw] lg:w-[50%] items-end'}>
                    <BlueButton className={'flex flex-row gap-5 w-[90vw] lg:w-[500px] items-center justify-center'}
                                filled onClick={() => {
                    }}>
                        <Google fontSize={'large'}/>
                        <div>Continue with Google</div>
                    </BlueButton>
                    <BlueButton className={'flex flex-row gap-5 w-[90vw] lg:w-[500px] items-center justify-center'}
                                filled onClick={() => {
                    }}>
                        <FacebookRounded fontSize={'large'}/>
                        <div>Continue with Facebook</div>
                    </BlueButton>
                    <BlueButton className={'flex flex-row gap-5 w-[90vw] lg:w-[500px] items-center justify-center'}
                                filled onClick={() => {
                    }}>
                        <GitHub fontSize={'large'}/>
                        <div>Continue with Github</div>
                    </BlueButton>
                </div>
                <div></div>
            </div>
        </div>
    </PageWrapper>
}

export default Signin;