import {FC, useCallback, useEffect, useState} from "react";
import {User} from "../../util/entities";
import useHttp from "../../hooks/makeRequest";
import PersonSkeleton from "../skeletons/PersonSkeleton";
import Person from "./Person";
import Button from "../../ui/Button";
import {KeyboardArrowLeftRounded, KeyboardArrowRightRounded} from "@mui/icons-material";

const PersonDisplay: FC<{ url: string; pageIndex?: number; navigationEnabled?: boolean }> = props => {
    const [pageIndex, setPageIndex] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const makeRequest = useHttp();
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        makeRequest(
            {
                url: props.url + '?pageIndex=' + (pageIndex ? pageIndex : 0)
            },
            data => {
                setUsers(data.content);
                setTotalPages(data.totalPages);
                console.log(data);
            },
            () => {
            },
            () => setLoading(false))
    }, [makeRequest, pageIndex, props.url])

    const handleUnfollowed = useCallback((userId: number) => {
        setUsers(prev => prev.filter(p => p.id !== userId))
    }, []);

    const handleFollowed = useCallback((userId: number) => {
        setUsers(prev => {
            const p = [...prev];
            p.forEach((u, index) => {
                if (u.id === userId) {
                    p[index].isFollowing = true;
                    return p;
                }
            })
            return p;
        })
    }, []);

    const handlePrevClick = useCallback(() => {
        setPageIndex(prev => prev - 1);
    }, []);

    const handleNextClick = useCallback(() => {
        setPageIndex(prev => prev + 1);
    }, []);

    return <div className={'flex flex-col gap-10 w-full'}>
        {loading ?
            <div className={'flex flex-col gap-5 w-full'}>
                <PersonSkeleton/>
                <PersonSkeleton/>
                <PersonSkeleton/>
                <PersonSkeleton/>
                <PersonSkeleton/>
            </div>
            :
            !loading && users.length === 0 ?
                <>
                    <div className={'text-gray-300 dark:text-gray-500 text-xl font-bold'}>Nothing to show yet...</div>
                </>
                :
                <>
                    <div className={'flex flex-col gap-5 w-full'}>
                        {users.map(u => <Person user={u} onUnfollow={handleUnfollowed} onFollow={handleFollowed}/>)}
                    </div>
                    {props.navigationEnabled && <div className={'flex mx-auto'}>
                        <Button disabled={pageIndex === 0 || loading} onClick={handlePrevClick}
                                filled><KeyboardArrowLeftRounded/>
                        </Button>
                        <div
                            className={'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-5 py-3  flex items-center'}>{pageIndex + 1}</div>
                        <Button disabled={pageIndex === totalPages - 1 || loading} onClick={handleNextClick}
                                filled><KeyboardArrowRightRounded/>
                        </Button>
                    </div>}
                </>
        }
    </div>
}

export default PersonDisplay