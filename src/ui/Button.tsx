import {FC, ReactNode} from "react";

export enum Color {
    ROSE,
    GREEN,
    SKY
}

const getColor = (color: Color | undefined, filled: boolean | undefined) => {
    if (color === Color.GREEN)
        if (filled)
            return 'border-green-500 text-slate-50 hover:shadow-xl bg-green-500 dark:shadow-green-500/10'
        else
            return 'border-green-500 text-green-500 hover:bg-green-500 hover:text-slate-50'
    if (color === Color.ROSE)
        if (filled)
            return 'border-rose-500 text-rose-50 hover:shadow-xl bg-rose-500 dark:shadow-rose-500/10'
        else
            return 'border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-rose-50 '
    if (filled)
        return 'border-sky-500 text-sky-50 hover:shadow-xl bg-sky-500 dark:shadow-sky-500/10'
    else
        return 'border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-sky-50 '
}

const Button: FC<{
    color?: Color;
    header?: string;
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    filled?: boolean;
    className?: string
}> = props => {
    return <div className={`h-fit`}>
        <div>{props.header}</div>
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={`p-3 disabled:bg-gray-400 disabled:dark:bg-gray-700 disabled:border-gray-400 disabled:text-gray-200 transition-all ease-out duration-300 rounded border-2 ${getColor(props.color, props.filled)} w-full ${props.className}`}>{props.children}</button>
    </div>
}

export default Button;