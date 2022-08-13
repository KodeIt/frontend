import { FC, ReactNode } from "react";

const Overlay: FC<{ children: ReactNode }> = (props) => {
	return <div className="absolute z-20 w-screen h-screen bg-gray-700/30 flex items-center justify-center">{props.children}</div>;
};

export default Overlay;
