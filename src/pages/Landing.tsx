import {FC, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/common/PageWrapper";


const Landing: FC = props => {
    
    let path: string = `/codes`; 
    const navigate = useNavigate(); 
    const routeChange = useCallback( (): void => { 
        navigate(path);
    }, [navigate, path] );

    return <PageWrapper>
        <div className={'flex flex-col h-full justify-center items-center gap-10 text-center'}>
            <div className={'text-4xl font-semibold text-sky-500 '}>Lorem ipsum dolor sit amet, consectetur adipiscing
                elit
            </div>
            <div className={'text-2xl font-light text-gray-700'}>Pellentesque id lacus sit amet orci laoreet semper
                vitae a leo. Aenean iaculis at neque id interdum. Ut pulvinar dignissim ligula sed auctor. Praesent
                varius odio non odio fringilla pellentesque
            </div>
            <button className={'text-xl font-light rounded border-2 border-sky-500 text-sky-500 p-3 w-[250px]'}
                    onClick={routeChange}>View codes
            </button>
        </div>
    </PageWrapper>
}

export default Landing;