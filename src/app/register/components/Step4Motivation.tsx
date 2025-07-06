'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

type Props = {
  onNext: () => void
}

const Step4Schema = z.object({
  motivation: z.string().min(30, 'Please explain your motivation.'),
  agreeConduct: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Code of Conduct.' }),
  }),
  confirmTruth: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm the information is truthful.' }),
  }),
  rejectAI: z.literal(true, {
    errorMap: () => ({ message: 'You must agree not to submit AI-generated work.' }),
  }),
})

type Step4Data = z.infer<typeof Step4Schema>

export const Step4Motivation = ({ onNext }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Step4Data>({
    resolver: zodResolver(Step4Schema),
    mode: 'onChange',
  })

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-1">Step 4: Motivation & Ethics</h2>
      <p className="text-sm text-gray-300 mb-6">Tell us why you want to join Freelancers Palace, and confirm your ethical commitment.</p>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Your Motivation</label>
          <textarea
            {...register('motivation')}
            rows={5}
            placeholder="Why do you want to join? What makes you a great fit?"
            className="input"
          />
          {errors.motivation && <p className="text-red-400 text-sm">{errors.motivation.message}</p>}
        </div>

        <div className="space-y-2 text-sm">
          <label className="flex items-start gap-2">
            <input type="checkbox" {...register('agreeConduct')} />
            <span>I agree to the Code of Conduct and client-first ethics.</span>
          </label>
          {errors.agreeConduct && <p className="text-red-400 text-sm">{errors.agreeConduct.message}</p>}

          <label className="flex items-start gap-2">
            <input type="checkbox" {...register('confirmTruth')} />
            <span>I confirm that all information I’ve submitted is truthful and verifiable.</span>
          </label>
          {errors.confirmTruth && <p className="text-red-400 text-sm">{errors.confirmTruth.message}</p>}

          <label className="flex items-start gap-2">
            <input type="checkbox" {...register('rejectAI')} />
            <span>I will not submit AI-generated content or certificates.</span>
          </label>
          {errors.rejectAI && <p className="text-red-400 text-sm">{errors.rejectAI.message}</p>}
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

