
import {Dispatch, SetStateAction} from "react";

type InputComponentProps = {
    text: string;
    input: string;
    hint: string;
    setState: Dispatch<SetStateAction<string>>;
};

export default function InputComponent ({ text, input, hint, setState}: InputComponentProps) {
    return (
        <div className="flex flex-col">
            <p className="md:text-l mt-4 md:font-semibold">{text}</p>
            <input
                type="text"
                value={input}
                className="mt-0 px-3 py-2 border rounded-md min-w-56 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={hint}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^-?\d*\.?\d*$/.test(value)) {
                        if (!isNaN(Number(value))) setState(value);
                    }
                }}
            />
        </div>
    )
}
