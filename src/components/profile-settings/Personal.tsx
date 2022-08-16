import {FC, useCallback, useEffect, useRef, useState} from "react";
import Input from "../../ui/Input";
import RichTextEditor from "../../ui/RichTextEditor";
import {Country, State} from "../../util/entities";
import useAuthorizedHttp from "../../hooks/useAuthorizedHttp";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../store/store";
import {toast} from "react-toastify";
import {userActions} from "../../store/user-slice";
import useFileUpload from "../../hooks/useFileUpload";

const maxFileSize = 5 * 1024 * 1024;
const imageExtensions = ["jpg", "jpeg", "gif", "tiff", "psd", "raw", "png", "svg"];

const Personal: FC = () => {
    const makeUpload = useFileUpload();
    const dispatch = useDispatch();
    const userCtx = useSelector((state: StoreStateType) => state.user);
    const makeAuthorizedRequest = useAuthorizedHttp();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState(userCtx.user.name ? userCtx.user.name : "");
    const [bio, setBio] = useState(userCtx.user.bio ? userCtx.user.bio : "");
    const [state, setState] = useState<State | null>(null);
    const [country, setCountry] = useState<Country | null>(null);
    const [states, setStates] = useState<State[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);
    const [logo, setLogo] = useState<File | null>(null);
    const [preview, setPreview] = useState(userCtx.user.avatar);

    useEffect(() => {
        setLoading(true);
        makeAuthorizedRequest({
            url: '/api/private/misc/countries'
        }, data => {
            setCountries(data);
            setCountry(userCtx.user.country ? userCtx.user.country : data[0]);
            setLoading(false);
        }, data => console.log(data))
    }, [makeAuthorizedRequest, userCtx.user.country]);

    useEffect(() => {
        setLoading(true);
        country && makeAuthorizedRequest({
            url: '/api/private/misc/states?countryId=' + country.id
        }, data => {
            setStates(data);
            setState(userCtx.user.state ? userCtx.user.state : data[0]);
            setLoading(false);
        })
    }, [country, makeAuthorizedRequest, userCtx.user.state]);

    useEffect(() => {
        if (!logo) return;

        if (logo.size > maxFileSize) {
            toast.error("File size exceeds 5mb!");
            return;
        }

        let extension = logo.name.split(".");
        if (!imageExtensions.includes(extension[extension.length - 1])) {
            return;
        }

        const p = URL.createObjectURL(logo);
        setPreview(p);

        return () => URL.revokeObjectURL(p);
    }, [logo]);

    const handleUploadLogo = useCallback(() => {
        setLoading(true);
        const data = new FormData();
        data.append("file", logo!);
        toast.promise(() => makeUpload({
            url: '/api/private/user/logo',
            method: 'post',
            body: data
        }, (data) => {
            dispatch(userActions.updateUser({avatar: data}))
        }, () => {
        }, () => setLoading(false)), {
            pending: 'Updating your profile...',
            error: 'Error updating your profile!',
            success: 'Updated your profile successfully!'
        })

    }, [dispatch, logo, makeUpload])

    const handleSaveClick = useCallback(() => {
        setLoading(true);

        toast.promise(() => makeAuthorizedRequest({
                url: '/api/private/user/',
                method: 'put',
                body: {
                    name,
                    bio,
                    state: {
                        id: state?.id
                    },
                    country: {
                        id: country?.id
                    }
                }
            },
            data => {
                dispatch(
                    userActions.updateUser({
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        avatar: data.avatar,
                        bio: data.bio,
                        memberSince: data.memberSince,
                        state: data.state,
                        country: data.country,
                    })
                );
            },
            () => {
            },
            () => {
                setLoading(false)
            }
        ), {
            pending: 'Updating your profile...',
            error: 'Error updating your profile!',
            success: 'Updated your profile successfully!'
        })
    }, [bio, country?.id, dispatch, makeAuthorizedRequest, name, state?.id]);

    return <div className={'flex flex-col'}>
        <div className={'text-gray-700 text-xl font-light border-b pb-5 dark:text-gray-300'}>
            <span className={'font-mono text-sky-500'}>Configure</span> your about
        </div>
        <div className={'flex flex-row gap-10 py-10'}>
            <div className={'w-[60%] flex flex-col gap-5'}>
                <Input header={'Enter your name'} placeHolder={'What should people know you by?'} value={name}
                       setValue={setName}/>
                <RichTextEditor header={'Set your bio'} placeholder={'What should people see in you?'} value={bio}
                                onChange={setBio}/>
                {country &&
                    <Select disabled={countries.length === 0} header={'Select your country of origin'} data={countries}
                            value={country}
                            setValue={setCountry}/>}
                {state &&
                    <Select disabled={states.length === 0} header={'Select your state'} data={states} value={state}
                            setValue={setState}/>}
            </div>
            <div className={'flex-grow gap-5 flex flex-col items-center justify-center'}>
                <div className="grid gap-10">
                    <label className="text-md text-gray-400 dark:text-gray-300">Upload your logo</label>
                    <div className="flex items-center justify-center gap-20">
                        <button onClick={() => fileRef.current?.click()}
                                className="group w-[300px] h-[300px] rounded-full bg-gray-400 dark:bg-gray-700">
                            <div
                                className="group-hover:opacity-80 dark:bg-gray-700 relative z-20 opacity-0 transition-all ease-out duration-300 bg-gray-400/40 w-full h-full rounded-full flex items-center justify-center text-slate-50">
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
                <Button className={'rounded w-[200px]'} onClick={() => {
                }}>Reset</Button>
                <Button disabled={loading || !logo} className={'rounded w-[200px]'} filled
                        onClick={handleUploadLogo}>Upload</Button>
            </div>
        </div>
        <Button className={'w-[200px]'} disabled={loading} filled onClick={handleSaveClick}>Save changes</Button>
    </div>
}

export default Personal;