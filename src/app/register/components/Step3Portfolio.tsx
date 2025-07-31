'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

type Props = {
  onNext: () => void
}

const trustedPortfolioDomains = ['github.com', 'behance.net', 'medium.com', 'kaggle.com']
const trustedCertDomains = ['credly.com', 'linkedin.com', 'udemy.com', 'coursera.org']

const isValidTrustedUrl = (url: string, domains: string[]) => {
  try {
    const parsed = new URL(url)
    return domains.some(domain => parsed.hostname.includes(domain))
  } catch {
    return false
  }
}

const Step3Schema = z.object({
  portfolioLinks: z
    .array(z.string())
    .refine(
      (links) => links.some(link => isValidTrustedUrl(link, trustedPortfolioDomains)),
      { message: 'At least one valid portfolio link is required (GitHub, Behance, etc.)' }
    ),
  certificationLinks: z
    .array(z.string())
    .refine(
      (links) => links.some(link => isValidTrustedUrl(link, trustedCertDomains)),
      { message: 'At least one valid certification link is required (Credly, LinkedIn, etc.)' }
    )
})

type Step3Data = z.infer<typeof Step3Schema>

export const Step3Portfolio = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    getValues
  } = useForm<Step3Data>({
    resolver: zodResolver(Step3Schema),
    mode: 'onChange',
    defaultValues: {
      portfolioLinks: ['', '', ''],
      certificationLinks: ['', '', ''],
    }
  })

  // Normalize empty strings onChange
  useEffect(() => {
    const clean = (field: 'portfolioLinks' | 'certificationLinks') => {
      const values = getValues(field)
      setValue(field, values.map(v => v.trim()))
    }

    clean('portfolioLinks')
    clean('certificationLinks')
  }, [getValues, setValue])

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-1">Step 3: Portfolio & Certifications</h2>
      <p className="text-sm text-gray-300 mb-6">
        We need proof of work and credentials. At least one link per section is required.
      </p>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Portfolio Links</label>
          <p className="text-xs text-gray-400 mb-1">GitHub, Behance, Medium, Kaggle, etc.</p>
          {[0, 1, 2].map(i => (
            <input
              key={i}
              {...register(`portfolioLinks.${i}`)}
              placeholder="https://github.com/your-project"
              className="input input-bordered w-full mb-2"
            />
          ))}
          {errors.portfolioLinks && (
            <p className="text-red-400 text-sm">{errors.portfolioLinks.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Certification Links</label>
          <p className="text-xs text-gray-400 mb-1">Credly, LinkedIn, Udemy, Coursera, etc.</p>
          {[0, 1, 2].map(i => (
            <input
              key={i}
              {...register(`certificationLinks.${i}`)}
              placeholder="https://credly.com/your-cert"
              className="input input-bordered w-full mb-2"
            />
          ))}
          {errors.certificationLinks && (
            <p className="text-red-400 text-sm">{errors.certificationLinks.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full bg-green-500 hover:bg-green-600 py-2 rounded-xl font-semibold ${
            !isValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Continue
        </button>
      </form>
    </motion.div>
  )
}
