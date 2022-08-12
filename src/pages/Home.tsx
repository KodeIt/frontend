import {FC} from "react";
import PageWrapper from "../components/common/PageWrapper";

const Home: FC = () => {
    return <PageWrapper className={'gap-16'}>
        <div className={'text-gray-700 text-4xl font-bold '}>Hey, <button
            className={'text-sky-500 font-mono'}>Rajdip!</button> How's it going?
        </div>
        <div className={'text-2xl text-gray-700 border-b pb-5'}>Your <span
            className={'text-sky-500 font-mono'}>venture</span> at
            a <span
                className={'text-sky-500 font-mono'}>glance</span></div>
        <div className={'grid grid-cols-1 md:grid-cols-2 gap-10'}>
            <div className={'flex items-center justify-between p-10 rounded border'}>
                <div className={'text-xl font-light'}>Codes you <span className={'text-sky-500 font-mono'}>wrote</span>
                </div>
                <div>
                    <div className={'text-center text-4xl font-semibold text-sky-500'}>25</div>
                    <button className={'text-sky-500 text-sm'}>View all</button>
                </div>
            </div>
            <div className={'flex items-center justify-between p-10 rounded border'}>
                <div className={'text-xl font-light'}>Codes you <span
                    className={'text-sky-500 font-mono'}>starred</span></div>
                <div>
                    <div className={'text-center text-4xl font-semibold text-sky-500'}>60</div>
                    <button className={'text-sky-500 text-sm'}>View all</button>
                </div>
            </div>
        </div>
        <div className={'text-2xl text-gray-700 border-b pb-5'}><span
            className={'text-sky-500 font-mono'}>Jump</span> to your <span
            className={'text-sky-500 font-mono'}>favourite</span> section
        </div>
        <div className={'grid gap-3 text-left text-sky-500'}>
            <button className={'text-left '}>Visit the friendly compiler</button>
            <button className={'text-left'}>See what the others are doing</button>
        </div>
    </PageWrapper>
}

export default Home;