'use client'

import { useState } from 'react'
import { Step1BasicInfo } from './components/Step1BasicInfo'
import { Step2Skills } from './components/Step2Skills'
import { Step3Portfolio } from './components/Step3Portfolio'
import { Step4Motivation } from './components/Step4Motivation'
import { Step5Review } from './components/Step5Review'

export default function RegisterPage() {
  const [step, setStep] = useState(1)

  const handleFinalSubmit = () => {
    // TODO: connect to backend at /api/freelancer/apply
    console.log("📦 Submitting application…")
    alert("Application submitted!")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-zinc-800 text-white p-6 flex items-center justify-center">
      {step === 1 && <Step1BasicInfo onNext={() => setStep(2)} />}
      {step === 2 && <Step2Skills onNext={() => setStep(3)} />}
      {step === 3 && <Step3Portfolio onNext={() => setStep(4)} />}
      {step === 4 && <Step4Motivation onNext={() => setStep(5)} />}
      {step === 5 && (
        <Step5Review
          formData={{}} // 🔧 Temporary placeholder — will be replaced with real form data later
          onSubmit={handleFinalSubmit}
        />
      )}
    </main>
  )
}







