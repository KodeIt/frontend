import { ExecutionStatus, Language } from "./enums";

export interface Code {
	id?: number | null;
	code?: string | null;
	input?: string | null;
	language?: Language | null;
	updated?: Date | null;
	title?: string | null;
	description?: string | null;
	stars?: number | null;
	user?: User | null;
}

export interface User {
	id?: number | null;
	email?: string | null;
	avatar?: string | null;
	name?: string | null;
	bio?: string | null;
	level?: number | null;
	points?: number | null;
	memberSince?: Date | null;
	state?: State | null;
	country?: Country | null;
}

export interface State {
	id: number;
	name: string;
}

export interface Country {
	id: number;
	name: string;
}

export interface JWT {
	accessToken?: string | null;
	refreshToken?: string | null;
}

export interface ExecutionOutput {
	output: string;
	executionStatus: ExecutionStatus;
}
