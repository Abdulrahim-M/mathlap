
import { useEffect, useState} from "react";
import InputComponent from "@/components/inputComponent";
import {initWasm, convertFFAmount, convertDPAmount} from "./calc";

export default function AmountConversion() {
    const [type, setType] = useState("ff->dp");
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");

    const [result, setResult] = useState("0");

    useEffect(() => {
        async function run() { initWasm(); }
        run();
    }, []);

    function calc() {
        const value = type === "ff->dp"
            ? convertFFAmount(Number(amount), Number(interest))
            : convertDPAmount(Number(amount), Number(interest));

        setResult(value.toFixed(6));
    }


    return (
        <div className="flex flex-col gap-6">

            {/* Title (centered) */}
            <h2 className="text-2xl font-semibold text-center">
                Payment Continuous/Discrete Conversion
            </h2>

            {/* Settings */}
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="font-medium mb-1">Conversion Type</h3>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            <input
                                type="radio"
                                value="ff->dp"
                                checked={type === "ff->dp"}
                                onChange={(e) => setType(e.target.value)}
                                className="mr-1"
                            />
                            Fund Flow → Discrete
                        </label>

                        <label className="text-sm font-medium">
                            <input
                                type="radio"
                                value="dp->ff"
                                checked={type === "dp->ff"}
                                onChange={(e) => setType(e.target.value)}
                                className="mr-1"
                            />
                            Discrete → Fund Flow
                        </label>
                    </div>
                </div>

                <button
                    onClick={calc}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md shadow"
                >
                    Convert
                </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputComponent
                    text="Amount"
                    input={amount}
                    hint="Fund-Flow or Discrete amount"
                    setState={setAmount}
                />

                <InputComponent
                    text="Interest"
                    input={interest}
                    hint="Enter interest rate"
                    setState={setInterest}
                />
            </div>

            {/* Result (centered) */}
            <div className="pt-2 text-center">
                <h3 className="text-lg font-semibold mb-1">Result</h3>
                <div className="text-xl">{result}</div>
            </div>
        </div>
    );
}