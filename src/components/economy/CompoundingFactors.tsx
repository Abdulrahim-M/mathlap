"use client";

import InputComponent from "@/components/inputComponent";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { initWasm, CalcFactor } from "./calc";


export default function CompoundingFactors() {
    const [selected, setSelected] = useState("(F/P i,n)");
    const [group, setGroup] = useState<Group>("discrete");

    const [futureAmount, setF] = useState('');
    const [principalSum, setP] = useState('');
    const [equalPayAmount, setA] = useState('');
    const [gradientAmount, setG] = useState('');
    const [interestRate, setI] = useState('');
    const [compoundFreq, setN] = useState('');

    const [result, setResult] = useState('0');

    useEffect(() => { async function run() { await initWasm() } run(); }, []);

    function calc() {
        const result =  CalcFactor(
            selected,
            Number(principalSum),
            Number(futureAmount),
            Number(equalPayAmount),
            Number(gradientAmount),
            Number(interestRate),
            Number(compoundFreq)
        );
        setResult(String(result.toFixed(2)));
        return result;
    }

    const inputMap: {
        [key: string]: Array<{ text: string; state: [string, Dispatch<SetStateAction<string>>]; hint: string }>
    } = {
        // P-based inputs
        "(F/P i,n)": [{ text: "Principal Sum (P)", state: [principalSum, setP], hint: "Principal Sum" }],
        "(A/P i,n)": [{ text: "Principal Sum (P)", state: [principalSum, setP], hint: "Principal Sum" }],
        "(F/P r,n)": [{ text: "Principal Sum (P)", state: [principalSum, setP], hint: "Principal Sum" }],
        "(A/P r,n)": [{ text: "Principal Sum (P)", state: [principalSum, setP], hint: "Principal Sum" }],
        "[Abar/P r,n]": [{ text: "Principal Sum (P)", state: [principalSum, setP], hint: "Principal Sum" }],

        // F-based inputs
        "(P/F i,n)": [{ text: "Future Amount (F)", state: [futureAmount, setF], hint: "Future Amount" }],
        "(A/F i,n)": [{ text: "Future Amount (F)", state: [futureAmount, setF], hint: "Future Amount" }],
        "(P/F r,n)": [{ text: "Future Amount (F)", state: [futureAmount, setF], hint: "Future Amount" }],
        "(A/F r,n)": [{ text: "Future Amount (F)", state: [futureAmount, setF], hint: "Future Amount" }],
        "[Abar/F r,n]": [{ text: "Future Amount (F)", state: [futureAmount, setF], hint: "Future Amount" }],

        // A-based inputs
        "(F/A i,n)": [{ text: "Equal Payment Amount (A)", state: [equalPayAmount, setA], hint: "Equal Payment Amount" }],
        "(P/A i,n)": [{ text: "Equal Payment Amount (A)", state: [equalPayAmount, setA], hint: "Equal Payment Amount" }],
        "(F/A r,n)": [{ text: "Equal Payment Amount (A)", state: [equalPayAmount, setA], hint: "Equal Payment Amount" }],
        "(P/A r,n)": [{ text: "Equal Payment Amount (A)", state: [equalPayAmount, setA], hint: "Equal Payment Amount" }],
        "[F/Abar r,n]": [{ text: "Equal Payment Amount (A)", state: [equalPayAmount, setA], hint: "Equal Payment Amount" }],
        "[P/Abar r,n]": [{ text: "Equal Payment Amount (A)", state: [equalPayAmount, setA], hint: "Principal Sum" }],

        // G-based
        "(F/G i,n)": [{ text: "Gradient Amount (G)", state: [gradientAmount, setG], hint: "Gradient Amount" }],
        "(F/G r,n)": [{ text: "Gradient Amount (G)", state: [gradientAmount, setG], hint: "Gradient Amount" }]
    };

    type Group = "discrete" | "continuous" | "fundflow";

    const formulaGroups: Record<Group, { key: string; label: string }[]>  = {
        discrete:[
            { key: "(F/P i,n)", label: "Single-Payment Compound-Amount" },
            { key: "(P/F i,n)", label: "Single-Payment Present-worth" },
            { key: "(F/A i,n)", label: "Equal-payment-series Compound-Amount" },
            { key: "(A/F i,n)", label: "Equal-payment-series Sinking Fund" },
            { key: "(P/A i,n)", label: "Equal-payment-series Present-worth" },
            { key: "(A/P i,n)", label: "Equal-payment-series Capital-recovery" },
            { key: "(F/G i,n)", label: "Uniform-gradient-series" },
        ],
        
        continuous: [
            { key: "(F/P r,n)", label: "Single-Payment Compound-Amount" },
            { key: "(P/F r,n)", label: "Single-Payment Present-worth" },
            { key: "(F/A r,n)", label: "Equal-payment-series Compound-Amount" },
            { key: "(A/F r,n)", label: "Equal-payment-series Sinking Fund" },
            { key: "(P/A r,n)", label: "Equal-payment-series Present-worth" },
            { key: "(A/P r,n)", label: "Equal-payment-series Capital-recovery" },
            { key: "(F/G r,n)", label: "Uniform-gradient-series" },
        ],

        fundflow: [
            { key: "[F/Abar r,n]", label: "Equivalent-Series Compound-Amount" },
            { key: "[Abar/F r,n]", label: "Equivalent-Series Sinking Fund" },
            { key: "[P/Abar r,n]", label: "Equivalent-Series Present-worth" },
            { key: "[Abar/P r,n]", label: "Equivalent-Series Capital-recovery" },
        ]
    };

    const inputsToRender = inputMap[selected] || [];

    return (
        <div className="flex flex-col gap-6 ">
            <h2 className="text-2xl font-semibold text-center">Compounding Factors</h2>

            {/* Settings */}
            <div className="flex flex-col gap-4">
                <div>
                    <h3 className="font-medium mb-1">Interest Calculation Type</h3>
                    <select
                        value={group}
                        onChange={(e) => {
                            const g = e.target.value as Group;
                            setGroup(g);
                            setSelected(formulaGroups[g][0].key);
                        }}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-900"
                    >
                        <option value="discrete">Discrete Compounding</option>
                        <option value="continuous">Continuous Compounding</option>
                        <option value="fundflow">Fund Flow</option>
                    </select>
                </div>

                <div>
                    <h3 className="font-medium mb-1">Formula</h3>
                    <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-neutral-900"
                    >
                        {formulaGroups[group].map((f) => (
                            <option key={f.key} value={f.key}>
                                {f.label}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={calc}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Calculate
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {inputsToRender.map((i) => (
                    <InputComponent key={i.text} text={i.text} input={i.state[0]} setState={i.state[1]} hint={i.hint} />
                ))}
                <InputComponent text="Interest Rate (i)" input={interestRate} setState={setI} hint="Interest Rate" />
                <InputComponent text="Compound Frequency (n)" input={compoundFreq} setState={setN} hint="Compound Frequency" />
            </div>

            <div className="pt-2 text-center">
                <h3 className="text-lg font-semibold mb-1">
                    {(selected === "(F/G i,n)" || selected === "(F/G r,n)") ? "Discrete Payments" : "Result"}
                </h3>
                <div className="text-xl">{result}$</div>
            </div>
        </div>
    )
}