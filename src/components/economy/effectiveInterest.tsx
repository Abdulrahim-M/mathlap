
import {SetStateAction, useEffect, useState} from "react";
import InputComponent from "@/components/inputComponent";
import { initWasm, convertNominalInterest, convertActualInterest } from "./calc";

export default function EffectiveInterest() {
    const [type, setType] = useState("Nom");
    const [interest, setInterest] = useState("");
    const [periods, setPeriods] = useState("");

    const [result, setResult] = useState("0");

    useEffect(() => {
        async function run(){
            initWasm();
        }
        run();
    })

    function calc() {
        if (type === "Nom") setResult(
            String(
                convertNominalInterest(
                    Number(interest),
                    Number(periods)
                ).toFixed(6)
            )
        );
        else setResult(
            String(
                convertActualInterest(
                    Number(interest),
                    Number(periods)
                ).toFixed(6)
            )
        );
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center mr-5 my-28 md:my-14">
                <h1 className="md:text-xl font-semibold">Effective Interest Calculator</h1>

                <div className="flex flex-col md:flex-row">
                    <div className="flex mt-8 justify-around flex-row md:flex-col">
                        <div className="flex flex-col">
                            <h5>The type of Interest used: </h5>
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
                        <div className="flex flex-col">
                            <button
                                onClick={() => {calc();}}
                                className="my-4 px-2 py-1 bg-gray-800 text-white rounded-md shadow"
                            >
                                Get Interest
                            </button>
                            <div className="flex justify-center">{result}</div>
                        </div>
                    </div>

                    <div className="flex flex-col mb-5 ">
                        <InputComponent text={"Interest"} input={interest} hint={"Enter Interest used (nominal/effective)"} setState={setInterest} />
                        <InputComponent text={"Periods of effective interest"} input={periods} hint={"either "} setState={setPeriods} />
                    </div>
                </div>

            </div>
        </>
    )
}