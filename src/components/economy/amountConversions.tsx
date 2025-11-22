
import {SetStateAction, useEffect, useState} from "react";
import InputComponent from "@/components/inputComponent";
import {initWasm, convertFFAmount, convertDPAmount} from "./calc";

export default function AmountConversion() {
    const [type, setType] = useState("ff->dp");
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");

    const [result, setResult] = useState("0");

    useEffect(() => {
        async function run(){
            initWasm();
        }
        run();
    })

    function calc() {
        if (type === "ff->dp") setResult(
            String(
                convertFFAmount(
                    Number(amount),
                    Number(interest)
                ).toFixed(6)
            )
        );
        else setResult(
            String(
                convertDPAmount(
                    Number(amount),
                    Number(interest)
                ).toFixed(6)
            )
        );
    }


    return (
        <>
            <div className="flex flex-col items-center justify-center mr-5 my-28 md:my-14">
                <h1 className="md:text-xl font-semibold">Payment Continuous/Discrete Amount Conversion</h1>

                <div className="flex flex-col md:flex-row">
                    <div className="flex mt-8 justify-around flex-row md:flex-col">
                        <div className="flex flex-col">
                            <h5>The type of Interest used: </h5>
                            <label className="text-sm font-medium">
                                <input
                                    type="radio"
                                    value="ff->dp"
                                    checked={type === "ff->dp"}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-1"
                                />
                                {"Fund Flow -> Discrete"}
                            </label>
                            <label className="text-sm font-medium">
                                <input
                                    type="radio"
                                    value="dp->ff"
                                    checked={type === "dp->ff"}
                                    onChange={(e) => setType(e.target.value)}
                                    className="mr-1"
                                />
                                {"Discrete -> Fund Flow"}
                            </label>
                        </div>
                        <div className="flex flex-col mx-5 justify-center items-center content-center">
                            <button
                                onClick={() => {calc();}}
                                className="my-4 px-2 py-1 bg-gray-800 text-white rounded-md shadow"
                            >
                                Result
                            </button>
                            <div className="flex justify-center">{result}</div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-5 ">
                        <InputComponent text={"Amound"} input={amount} hint={"Fund-Flow/Discrete payment amount"} setState={setAmount} />
                        <InputComponent text={"Interest"} input={interest} hint={"Enter Interest"} setState={setInterest} />
                    </div>
                </div>

            </div>
        </>
    )
}