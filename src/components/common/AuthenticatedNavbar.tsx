import { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreStateType } from "../../store/store";
import { KeyboardArrowDown, PersonRounded } from "@mui/icons-material";

const AuthenticatedNavbar: FC = (props) => {
	const userCtx = useSelector((state: StoreStateType) => state.user);

	return (
		<div className={"bg-gray-100 min-h-[80px] w-screen flex items-center"}>
			<div className={`w-[90%] md:w-[80%] lg:w-[1300px] mx-auto flex justify-between items-center`}>
				<Link to={"/"} className={`cursor-pointer font-mono font-bold text-2xl text-sky-500`}>{`<KodeIt/>`}</Link>
				<div className={"flex gap-5 md:gap-10 items-center"}>
					<Link
						to={"/compiler"}
						className={"text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light"}
					>
						Compiler
					</Link>
					<Link to={"/codes"} className={"text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light"}>
						Codes
					</Link>
					<div className={"items-center flex gap-2"}>
						<div className={"w-[40px] h-[40px] rounded-full flex items-center"}>
							{userCtx.user.avatar ? (
								<img src={userCtx.user.avatar} className={"w-[40px] h-[40px] rounded-full"} alt={"avatar"} />
							) : (
								<PersonRounded />
							)}
						</div>
						<Link
							to={"/sign-in"}
							className={"text-gray-600 cursor-pointer transition-all ease-out duration-300 hover:text-sky-500 font-light"}
						>
							{userCtx.user.name?.split(" ")[0]}
						</Link>
						<KeyboardArrowDown />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthenticatedNavbar;
