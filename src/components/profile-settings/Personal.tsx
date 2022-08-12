import {FC, useEffect, useRef, useState} from "react";
import Input from "../../ui/Input";
import RichTextEditor from "../../ui/RichTextEditor";
import Select, {selectOptionType} from "../../ui/Select";
import {dummyCountries, dummyStates} from "../../util/dummy-data";
import BlueButton from "../../ui/BlueButton";

const Personal: FC = props => {
    const [name, setName] = useState('')
    const [bio, setBio] = useState('');
    const [state, setState] = useState<selectOptionType>(dummyStates[0]);
    const [country, setCountry] = useState<selectOptionType>(dummyCountries[0]);
    const fileRef = useRef<HTMLInputElement>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (!logo) return;

        const p = URL.createObjectURL(logo);
        setPreview(p);

        return () => URL.revokeObjectURL(p);
    }, [logo]);

    return <div className={'flex flex-col'}>
        <div className={'text-gray-700 text-xl font-light border-b pb-5 '}>
            <span className={'font-mono text-sky-500'}>Configure</span> your about
        </div>
        <div className={'flex flex-row gap-10 py-10'}>
            <div className={'w-[60%] flex flex-col gap-5'}>
                <Input header={'Enter your name'} placeHolder={'What should people know you by?'} value={name}
                       setValue={setName}/>
                <RichTextEditor header={'Set your bio'} placeholder={'What should people see in you?'} value={bio}
                                onChange={setBio}/>
                <Select header={'Select your country of origin'} data={dummyCountries} value={country}
                        setValue={setCountry}/>
                <Select header={'Select your state'} data={dummyStates} value={state} setValue={setState}/>
            </div>
            <div className={'flex-grow gap-5 flex flex-col items-center justify-center'}>
                <div className="grid gap-10">
                    <label className="text-md text-gray-500">Upload your logo</label>
                    <div className="flex items-center justify-center gap-20">
                        <button onClick={() => fileRef.current?.click()}
                                className="group w-[300px] h-[300px] rounded-full bg-gray-400">
                            <div
                                className="group-hover:opacity-100 relative z-20 opacity-0 transition-all ease-out duration-300 bg-gray-400/40 w-full h-full rounded-full flex items-center justify-center text-slate-50">
                                Browse for logo
                            </div>
                            {preview && (
                                <img
                                    className="object-cover relative z-10 -top-[300px] w-[300px] h-[300px] rounded-full"
                                    src={preview}
                                    alt={"LOGO"}
                                />
                            )}
                            <input onChange={(e) => setLogo(e.target.files![0])} ref={fileRef} type="file"
                                   hidden={true}/>
                        </button>

                    </div>
                </div>
                <BlueButton className={'rounded w-full md:w-[60%]'} onClick={() => {
                }}>Reset</BlueButton>
                <BlueButton className={'rounded w-full md:w-[60%]'} filled onClick={() => {
                }}>Upload</BlueButton>
            </div>
        </div>
        <BlueButton className={'w-fit rounded'} filled onClick={() => {
        }}>Save changes</BlueButton>
    </div>
}

export default Personal;