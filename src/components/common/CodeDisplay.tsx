import {FC, useCallback, useEffect, useState} from "react";
import {Code} from "../../util/entities";
import CodeItem from "./CodeItem";
import CodeItemSkeleton from "../skeletons/CodeItemSkeleton";
import {Language, SortOptionType, SortOrderType} from "../../util/enums";
import useHttp from "../../hooks/makeRequest";
import {KeyboardArrowLeftRounded, KeyboardArrowRightRounded} from "@mui/icons-material";
import Button from "../../ui/Button";

export type searchOptions = {
    title?: string;
    languages?: Language[],
    sortBy?: SortOptionType,
    sortOrder?: SortOrderType,
    pageIndex?: number;
    pageSize?: number;
}

const CodeDisplay: FC<{
    searchOptions?: searchOptions;
    url: string;
    navigationEnabled?: boolean
}> = ({
          navigationEnabled, searchOptions, url
      }) => {
    const makeRequest = useHttp();
    const [codes, setCodes] = useState<Code[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleStarred = useCallback((codeId: number) => {
        setCodes(prev => {
            const p = [...prev!];
            p.forEach((c, index) => {
                if (c.id === codeId)
                    p[index].isStarred = true;
            })
            return p;
        })
    }, []);

    const handleUnStarred = useCallback((codeId: number) => {
        setCodes(prev => {
            const p = [...prev!];
            p.forEach((c, index) => {
                if (c.id === codeId)
                    p[index].isStarred = false;
            })
            return p;
        })
    }, []);

    useEffect(() => {
        if (searchOptions)
            searchOptions = {...searchOptions, ...{pageIndex: page}};
        else
            searchOptions = {pageIndex: page};
        makeRequest(
            {
                url: url,
                method: 'put',
                body: searchOptions
            },
            (data) => {
                setCodes(data.content);
                setTotalPages(data.totalPages);
            },
            (data) => console.log(data),
            () => setLoading(false)
        );
    }, [makeRequest, page, searchOptions, url]);

    const handlePrevClick = useCallback(() => {
        setPage(prev => prev - 1);
    }, []);

    const handleNextClick = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);

    return <div className={'h-fit w-full'}>
        {(loading || (codes && codes.length !== 0)) && <div
            className={"flex-grow flex gap-10 flex-col items-center justify-center"}>
            {!loading && codes && <>
                <div className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-x-5 h-fit w-full'}>
                    {codes.map((c) => <CodeItem onStarred={handleStarred} onUnStarred={handleUnStarred}
                                                key={c.id} code={c}/>)}

                </div>
                {navigationEnabled &&
                    <div className={'flex'}>
                        <Button disabled={page === 0 || loading} onClick={handlePrevClick}
                                filled><KeyboardArrowLeftRounded/>
                        </Button>
                        <div
                            className={'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-5 py-3  flex items-center'}>{page + 1}</div>
                        <Button disabled={page === totalPages - 1 || loading} onClick={handleNextClick}
                                filled><KeyboardArrowRightRounded/>
                        </Button>
                    </div>
                }
            </>
            }
            {loading &&
                <div className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 md:gap-x-5 h-fit w-full'}>
                    <CodeItemSkeleton/>
                    <CodeItemSkeleton/>
                    <CodeItemSkeleton/>
                    <CodeItemSkeleton/>
                    <CodeItemSkeleton/>
                </div>}
        </div>}
        {!loading && codes && codes.length === 0 &&
            <div className={'flex h-full items-center justify-center text-2xl text-gray-400 w-full'}>
                Nothing to show! sadly :(
            </div>}
    </div>
}

export default CodeDisplay;