// src/lib/financeCalc.ts
import init, {
    sp_compound_amount,
    sp_present_worth,
    ep_compound_amount,
    ep_sinking_fund,
    ep_present_worth,
    ep_capital_recovery,
    ug_series,
    sp_cc_compound_amount,
    sp_cc_present_worth,
    ep_cc_compound_amount,
    ep_cc_sinking_fund,
    ep_cc_present_worth,
    ep_cc_capital_recovery,
    ug_cc_series,
    ep_ff_compound_amount,
    ep_ff_sinking_fund,
    ep_ff_present_worth,
    ep_ff_capital_recovery,

    ep_ff_dp_conversion,
    ep_dp_ff_conversion,
    nominal_to_effective,
    actual_to_effective
} from "@/lib/sem7/eq_sem7_lib2";

let wasmInitialized = false;

export async function initWasm() {
    if (!wasmInitialized) {
        await init();
        wasmInitialized = true;
    }
}

// Map of formula keys to Rust functions
const functionMap: { [key: string]: (...args: number[]) => number } = {
    "(F/P i,n)": sp_compound_amount,
    "(P/F i,n)": sp_present_worth,
    "(F/A i,n)": ep_compound_amount,
    "(A/F i,n)": ep_sinking_fund,
    "(P/A i,n)": ep_present_worth,
    "(A/P i,n)": ep_capital_recovery,
    "(F/G i,n)": ug_series,
    "(F/P r,n)": sp_cc_compound_amount,
    "(P/F r,n)": sp_cc_present_worth,
    "(F/A r,n)": ep_cc_compound_amount,
    "(A/F r,n)": ep_cc_sinking_fund,
    "(P/A r,n)": ep_cc_present_worth,
    "(A/P r,n)": ep_cc_capital_recovery,
    "(F/G r,n)": ug_cc_series,
    "[F/Abar r,n]": ep_ff_compound_amount,
    "[Abar/F r,n]": ep_ff_sinking_fund,
    "[P/Abar r,n]": ep_ff_present_worth,
    "[Abar/P r,n]": ep_ff_capital_recovery,
};

// Get arguments based on formula type
export function getArgs(
    selected: string,
    P: number,
    F: number,
    A: number,
    G: number,
    i: number,
    n: number
): number[] {
    switch (true) {
        // P-based formulas
        case ["(F/P i,n)", "(A/P i,n)", "(F/P r,n)", "(A/P r,n)", "[Abar/P r,n]"].includes(selected):
            return [P, i, n];

        // F-based formulas
        case ["(P/F i,n)", "(A/F i,n)", "(P/F r,n)", "(A/F r,n)", "[Abar/F r,n]"].includes(selected):
            return [F, i, n];

        // A-based formulas
        case ["(F/A i,n)", "(P/A i,n)", "(F/A r,n)", "(P/A r,n)", "[F/Abar r,n]", "[P/Abar r,n]"].includes(selected):
            return [A, i, n];

        // G-based
        case ["(F/G i,n)", "(F/G r,n)"].includes(selected):
            return [G, i, n];

        default:
            return [0, 0, 0];
    }
}

// Main calculate function
export function CalcFactor(selected: string, P: number, F: number, A: number, G: number, i: number, n: number): number {
    const fn = functionMap[selected];
    if (!fn) return 0;

    const args = getArgs(selected, P, F, A, G, i, n);
    return fn(...args);
}

// Converts Fund flow to Discrete payments
export function convertFFAmount (a: number, r: number) {
    return ep_ff_dp_conversion(a, r);
}

// Converts Discrete payments to Fund flow
export function convertDPAmount (a: number, r: number) {
    return ep_dp_ff_conversion(a, r);
}

export function convertNominalInterest (r: number, c: number) {
    return nominal_to_effective(r, c);
}
export function convertActualInterest (r: number, c: number) {
    return actual_to_effective(r, c);
}