/* tslint:disable */
/* eslint-disable */
export function main(): void;
export function ep_cc_present_worth(a: number, i: number, n: number): number;
export function ep_cc_capital_recovery(p: number, i: number, n: number): number;
export function ep_cc_sinking_fund(f: number, i: number, n: number): number;
export function ug_cc_series(g: number, i: number, n: number): number;
export function sp_cc_present_worth(f: number, i: number, n: number): number;
export function ep_cc_compound_amount(a: number, i: number, n: number): number;
export function sp_cc_compound_amount(p: number, i: number, n: number): number;
/**
 * Interest Conversion formula from Actual interest
 * to effective interest 
 * 
 * r = Actual interest
 * c = Periouds in which actual interest is compounded
 */
export function actual_to_effective(r: number, c: number): number;
/**
 * Interest Conversion formula from nominal interest (announced)
 * to effective interest 
 * 
 * r = nominal interest
 * c = periouds in which actual interest is compounded
 */
export function nominal_to_effective(r: number, c: number): number;
/**
 * Computes single-payment compound amount
 * p = principal, i = interest rate, n = periods
 */
export function sp_compound_amount(p: number, i: number, n: number): number;
/**
 * Computes single-payment present worth
 * f = future value, i = interest rate, n = periods
 */
export function sp_present_worth(f: number, i: number, n: number): number;
/**
 * Computes Equal-payment-series compound amount
 * a = payment amount, i = interest rate, n = periods
 */
export function ep_compound_amount(a: number, i: number, n: number): number;
/**
 * Computes Equal-payment-series sinking fund
 * f = future value, i = interest rate, n = periods
 */
export function ep_sinking_fund(f: number, i: number, n: number): number;
/**
 * Computes Uniform-gradient-series
 * g = gradient amount, i = interest rate, n = periods
 */
export function ug_series(g: number, i: number, n: number): number;
/**
 * Computes Equal-payment-series present worth
 * a = payment amount, i = interest rate, n = periods
 */
export function ep_present_worth(a: number, i: number, n: number): number;
/**
 * Computes Equal-payment-series capital recovery
 * p = principal, i = interest rate, n = periods
 */
export function ep_capital_recovery(p: number, i: number, n: number): number;
/**
 * Fund-Flow Amount conversion to discrete payments
 * to be able to use discrete compounding formulas
 * a = fund-flow amount, r = interest rate
 */
export function ep_ff_dp_conversion(a: number, r: number): number;
export function ep_ff_sinking_fund(f: number, i: number, n: number): number;
/**
 * Discrete payments conversion to Fund-Flow Amount 
 * 
 * a = fund-flow amount, r = interest rate
 */
export function ep_dp_ff_conversion(a: number, r: number): number;
export function ep_ff_compound_amount(a: number, i: number, n: number): number;
export function ep_ff_capital_recovery(p: number, i: number, n: number): number;
export function ep_ff_present_worth(a: number, i: number, n: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly actual_to_effective: (a: number, b: number) => number;
  readonly main: () => void;
  readonly nominal_to_effective: (a: number, b: number) => number;
  readonly sp_cc_compound_amount: (a: number, b: number, c: number) => number;
  readonly ep_ff_capital_recovery: (a: number, b: number, c: number) => number;
  readonly ug_series: (a: number, b: number, c: number) => number;
  readonly ep_ff_compound_amount: (a: number, b: number, c: number) => number;
  readonly ep_dp_ff_conversion: (a: number, b: number) => number;
  readonly ep_ff_dp_conversion: (a: number, b: number) => number;
  readonly ep_compound_amount: (a: number, b: number, c: number) => number;
  readonly ep_cc_present_worth: (a: number, b: number, c: number) => number;
  readonly ep_ff_sinking_fund: (a: number, b: number, c: number) => number;
  readonly ep_cc_capital_recovery: (a: number, b: number, c: number) => number;
  readonly ep_sinking_fund: (a: number, b: number, c: number) => number;
  readonly ug_cc_series: (a: number, b: number, c: number) => number;
  readonly ep_capital_recovery: (a: number, b: number, c: number) => number;
  readonly sp_present_worth: (a: number, b: number, c: number) => number;
  readonly ep_cc_sinking_fund: (a: number, b: number, c: number) => number;
  readonly sp_compound_amount: (a: number, b: number, c: number) => number;
  readonly ep_ff_present_worth: (a: number, b: number, c: number) => number;
  readonly sp_cc_present_worth: (a: number, b: number, c: number) => number;
  readonly ep_cc_compound_amount: (a: number, b: number, c: number) => number;
  readonly ep_present_worth: (a: number, b: number, c: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
