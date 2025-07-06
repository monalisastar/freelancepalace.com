'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type Props = {
  formData: Record<string, any>
  onSubmit: () => void // fallback, but we'll override with real call
}

export const Step5Review = ({ formData, onSubmit }: Props) => {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/freelancer/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Submission failed.')
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred.')
    } finally {
      setLoading(false)
    }
  }

  const displayEntry = (label: string, value: any) => (
    <div className="text-sm">
      <span className="text-gray-400">{label}:</span>{' '}
      <span className="text-white">{value || '—'}</span>
    </div>
  )

  if (submitted) {
    return (
      <motion.div
        key="submitted"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-green-900/20 backdrop-blur-xl rounded-2xl p-8 shadow-xl text-center space-y-4"
      >
        <h2 className="text-2xl font-bold text-green-400">✅ Application Submitted</h2>
        <p className="text-sm text-gray-300">We’ve received your application. You’ll be notified via email upon review.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl space-y-6"
    >
      <h2 className="text-2xl font-bold">🎉 Review & Submit</h2>
      <p className="text-sm text-gray-300">
        You’ve completed all steps. Please confirm the details below and submit your application.
      </p>

      <div className="border border-white/20 rounded-xl p-4 space-y-2 bg-white/5">
        {displayEntry("Name", formData.name)}
        {displayEntry("Email", formData.email)}
        {displayEntry("Phone", formData.phone)}
        {displayEntry("Country", formData.country)}
        {displayEntry("Timezone", formData.timezone)}
        {displayEntry("Category", formData.category)}
        {displayEntry("Experience", formData.skillsDetails)}
        {displayEntry("Motivation", formData.motivation)}

        <div className="text-sm text-white">
          <div className="mt-2 font-semibold">Portfolio Links</div>
          <ul className="list-disc ml-6">
            {formData.portfolioLinks?.map((link: string, i: number) =>
              link ? <li key={i}><a href={link} target="_blank" className="text-blue-400 underline">{link}</a></li> : null
            )}
          </ul>

          <div className="mt-2 font-semibold">Certifications</div>
          <ul className="list-disc ml-6">
            {formData.certificationLinks?.map((link: string, i: number) =>
              link ? <li key={i}><a href={link} target="_blank" className="text-blue-400 underline">{link}</a></li> : null
            )}
          </ul>
        </div>
      </div>

      <div className="text-green-400 bg-green-900/20 p-3 rounded-lg text-sm">
        ✅ If your profile is verified, you’ll earn an <strong>FLR bonus</strong> upon approval.
      </div>

      <div className="text-sm text-gray-400">
        📬 You’ll be notified by <strong>email</strong> and optionally onboarded via <strong>Discord</strong> after review.
      </div>

      {error && <div className="text-sm text-red-400">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full bg-green-500 hover:bg-green-600 py-2 rounded-xl font-semibold ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </motion.div>
  )
}


