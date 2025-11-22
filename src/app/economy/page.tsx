"use client";

import CompoundingFactors from "@/components/economy/CompoundingFactors"
import EffectiveInterest from "@/components/economy/effectiveInterest";
import AmountConversions from "@/components/economy/amountConversions";


export default function EconomyPage() {
    return(
        <div className="flex flex-col sm:p-6 scale-90">
            <h1 className="flex justify-center mb-10 text-5xl">Economics</h1>
            <div className="dark:bg-neutral-900 bg-white shadow-lg rounded-xl w-full md:p-14 h-screen">
                <div className="flex flex-col md:flex-row justify-between md:mb-5 my-28 md:my-auto">
                    <CompoundingFactors />
                </div>
                <div className="flex flex-col md:flex-row justify-evenly m-5 md:h-auto">
                    <EffectiveInterest />
                    <AmountConversions />
                </div>
            </div>
        </div>

    )
}