import {Language} from "./enums";

export type dummyCodeType = {
    id: number;
    title: string;
    language: Language;
    updated: Date;
    user: {
        avatar: string;
        name: string;
    }
}

export const dummyCodes = [
    {
        id: 1,
        title: 'Merge sort using java',
        language: Language.JAVA,
        updated: new Date(),
        user: {
            avatar: '',
            name: 'John Doe'
        }
    },
    {
        id: 2,
        title: 'Boolean operations',
        language: Language.TYPESCRIPT,
        updated: new Date(),
        user: {
            avatar: '',
            name: 'Jane Doe'
        }
    },
    {
        id: 3,
        title: 'Web Scraper using python',
        language: Language.PYTHON,
        updated: new Date(),
        user: {
            avatar: '',
            name: 'Mark Klien'
        }
    },
    {
        id: 4,
        title: 'Base64 Encode/Decode',
        language: Language.JAVASCRIPT,
        updated: new Date(),
        user: {
            avatar: '',
            name: 'Joseph Seed'
        }
    },
    {
        id: 5,
        title: 'Pointer understanding',
        language: Language.C,
        updated: new Date(),
        user: {
            avatar: '',
            name: 'Tony Blacksmith'
        }
    },
    {
        id: 6,
        title: "Djikstra's Algorithm",
        language: Language.CPP,
        updated: new Date(),
        user: {
            avatar: '',
            name: 'Hurk Schneider'
        }
    },
    {
        id: 7,
        title: 'Basic Linux commands',
        language: Language.SHELL,
        updated: new Date(),
        user: {
            avatar: '',
            name: 'Oskar Schindler'
        }
    },
]

export const dummyCountries = [
    {
        id: 1,
        name: 'India'
    },
    {
        id: 2,
        name: 'Britain'
    },
    {
        id: 3,
        name: 'Australia'
    },
    {
        id: 4,
        name: 'Russia'
    },
]

export const dummyStates = [
    {
        id: 1,
        name: 'West Bengal'
    },
    {
        id: 2,
        name: 'Karnataka'
    },
    {
        id: 3,
        name: 'Rajasthan'
    },
    {
        id: 4,
        name: 'Mumbai'
    },
]