import {FC, ReactNode} from "react";

const BlueButton: FC<{ children: ReactNode; onClick: () => void; filled?: boolean; className?: string }> = props => {
    return <button className={`p-3  border-sky-500 border-2 ${props.filled ?
        'text-slate-50 bg-sky-500' :
        'text-sky-500'}
         ${props.className}`}>{props.children}</button>
}

export default BlueButton;