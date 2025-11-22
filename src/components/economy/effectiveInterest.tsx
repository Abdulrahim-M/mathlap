
import { useEffect, useState} from "react";
import InputComponent from "@/components/inputComponent";
import { initWasm, convertNominalInterest, convertActualInterest } from "./calc";

export default function EffectiveInterest() {
    const [type, setType] = useState("Nom");
    const [interest, setInterest] = useState("");
    const [periods, setPeriods] = useState("");

    const [result, setResult] = useState("0");

    useEffect(() => {
        async function run() { initWasm(); }
        run();
    }, []);

    function calc() {
        const value = type === "Nom"
            ? convertNominalInterest(Number(interest), Number(periods))
            : convertActualInterest(Number(interest), Number(periods));

        setResult(value.toFixed(6));
    }


    return (
        <div className="flex flex-col gap-6">

            {/* Title (centered) */}
            <h2 className="text-2xl font-semibold text-center">
                Effective Interest Calculator
            </h2>

            {/* Settings */}
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="font-medium mb-1">Interest Type</h3>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                            <input
                                type="radio"
                                value="Nom"
                                checked={type === "Nom"}
                                onChange={(e) => setType(e.target.value)}
                                className="mr-1"
                            />
                            Nominal Interest (Likely yearly)
                        </label>

                        <label className="text-sm font-medium">
                            <input
                                type="radio"
                                value="Act"
                                checked={type === "Act"}
                                onChange={(e) => setType(e.target.value)}
                                className="mr-1"
                            />
                            Actual Interest (Likely in months)
                        </label>
                    </div>
                </div>

                <button
                    onClick={calc}
                    className="px-4 py-2 bg-gray-800 text-white rounded-md shadow"
                >
                    Get Interest
                </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputComponent
                    text="Interest"
                    input={interest}
                    hint="Enter nominal or actual interest"
                    setState={setInterest}
                />

                <InputComponent
                    text="Periods"
                    input={periods}
                    hint="Number of periods"
                    setState={setPeriods}
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