import {FC} from "react";
import {User} from "../../util/entities";
import {getPointsToNextLevel} from "../../util/calculation";
import CodeDisplay from "../common/CodeDisplay";

const Statistics: FC<{ user: User }> = ({user}) => {

    return <div className={'flex-grow flex flex-col gap-10'}>
        <div className={'flex justify-between items-center border-b pb-5 dark:border-b-gray-600'}>
            <div className={'flex gap-2 items-end'}>
                <div className={'text-2xl text-gray-600 font-semibold dark:text-gray-300'}>Level <span
                    className={'text-sky-500'}>{user.level}</span>
                </div>
                <div className={'text-lg text-gray-600 dark:text-gray-300'}>
                    ({user.points} xp)
                </div>
            </div>
            <div className={'font-light text-lg'}><span
                className={'text-sky-500 '}>{(getPointsToNextLevel(user.level!, user.points!) - user.points!)} xp </span>
                <span
                    className={'dark:text-gray-300'}>more
                to</span> <span
                    className={'text-sky-500 '}>Level {user.level! + 1}</span></div>
        </div>
        <div
            className={'text-2xl text-gray-600 font-semibold border-b pb-5 dark:text-gray-300 dark:border-b-gray-600'}>Last <span
            className={'text-sky-500'}>5</span> codes
            <span
                className={'text-sky-500'}> written</span>
        </div>

        <CodeDisplay url={'/api/public/code/written/' + user.id} searchOptions={{pageSize: 5}}/>
        <div
            className={'text-2xl text-gray-600 font-semibold border-b pb-5 dark:text-gray-300 dark:border-b-gray-600'}>Last <span
            className={'text-sky-500'}>5</span> codes
            <span
                className={'text-sky-500'}> starred</span>
        </div>
        <CodeDisplay url={'/api/public/code/starred/' + user.id} searchOptions={{pageSize: 5}}/>
    </div>
}

export default Statistics;