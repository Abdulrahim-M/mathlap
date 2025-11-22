"use client";

import CompoundingFactors from "@/components/economy/CompoundingFactors"
import EffectiveInterest from "@/components/economy/effectiveInterest";
import AmountConversions from "@/components/economy/amountConversions";


export default function EconomyPage() {
    return(
        <div className="min-h-screen p-6 flex flex-col items-center bg-neutral-100 dark:bg-neutral-900">
            <h1 className="text-4xl font-bold mb-10">Economics</h1>

            <div className="flex flex-col gap-10 w-full max-w-5xl">
                <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6">
                    <CompoundingFactors />
                </div>

                <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6">
                    <EffectiveInterest />
                </div>

                <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6">
                    <AmountConversions />
                </div>
            </div>
        </div>

    )
}