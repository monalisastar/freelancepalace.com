'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

type Props = {
  onNext: () => void
}

const categories = [
  "Web3",
  "AI & Data",
  "Climate & Carbon",
  "Creative & Freelance",
  "Crypto Services",
  "Ethics & Governance",
  "Strategy & Future Systems",
]

const dynamicPrompts: Record<string, string> = {
  "Web3": "Mention the smart contracts, blockchains, or dApps you've worked on.",
  "AI & Data": "Mention ML frameworks, models deployed, or real datasets you've handled.",
  "Climate & Carbon": "Include GHG accounting tools, offset projects, or carbon standards experience.",
  "Creative & Freelance": "Describe your design, writing, animation, or content projects.",
  "Crypto Services": "Mention tokenomics, exchanges, NFT projects, or blockchain integrations.",
  "Ethics & Governance": "Discuss regulatory work, audits, AI ethics, or DAO governance input.",
  "Strategy & Future Systems": "Mention futurism research, system redesigns, or macro strategic work.",
}

const Step2Schema = z.object({
  category: z.string().min(1, 'Select a category'),
  skillsDetails: z.string().min(30, 'Tell us more about your experience.'),
})

type Step2Data = z.infer<typeof Step2Schema>

export const Step2Skills = ({ onNext }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Step2Data>({
    resolver: zodResolver(Step2Schema),
    mode: 'onChange',
  })

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-1">Step 2: Skills & Focus</h2>
      <p className="text-sm text-gray-300 mb-6">Choose your core category and share your real experience.</p>

      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select {...register('category')} onChange={handleCategoryChange} className="input">
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}
        </div>

        {selectedCategory && (
          <div className="text-sm text-gray-300 italic mb-1">
            💡 {dynamicPrompts[selectedCategory] || 'Please describe your experience.'}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Experience Details</label>
          <textarea
            {...register('skillsDetails')}
            rows={5}
            placeholder="Describe your tools, frameworks, real projects, client types, etc."
            className="input"
          />
          {errors.skillsDetails && <p className="text-red-400 text-sm">{errors.skillsDetails.message}</p>}
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

