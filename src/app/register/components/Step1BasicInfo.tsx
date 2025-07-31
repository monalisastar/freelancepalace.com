'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'

type Props = {
  onNext: () => void
}

const Step1Schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Enter valid phone number'),
  country: z.string().min(2, 'Select your country'),
  timezone: z.string().min(2, 'Select your timezone'),
})

type Step1Data = z.infer<typeof Step1Schema>

export const Step1BasicInfo = ({ onNext }: Props) => {
  const [showBadge, setShowBadge] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<Step1Data>({
    resolver: zodResolver(Step1Schema),
    mode: 'onChange',
  })

  const phone = watch('phone')

  // Optional phone number formatting (auto-inserts + if missing)
  useEffect(() => {
    if (phone && !phone.startsWith('+')) {
      setValue('phone', '+' + phone)
    }
  }, [phone, setValue])

  useEffect(() => {
    setShowBadge(isValid)
  }, [isValid])

  const countries = ['Kenya', 'Nigeria', 'South Africa', 'United States', 'United Kingdom']
  const timezones = ['EAT (UTC+3)', 'WAT (UTC+1)', 'SAST (UTC+2)', 'EST (UTC-5)', 'GMT (UTC+0)']

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold mb-1">Step 1: Basic Info</h2>
      <p className="text-sm text-gray-300 mb-6">Let’s get to know you. All fields are required.</p>

      <form onSubmit={handleSubmit(onNext)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input {...register('name')} className="input input-bordered w-full" />
          {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input {...register('email')} type="email" className="input input-bordered w-full" />
          {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            {...register('phone')}
            className="input input-bordered w-full"
            placeholder="+254712345678"
          />
          {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Country</label>
          <select {...register('country')} className="select select-bordered w-full text-black">
            <option value="">-- Select --</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-400 text-sm">{errors.country.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Timezone</label>
          <select {...register('timezone')} className="select select-bordered w-full text-black">
            <option value="">-- Select --</option>
            {timezones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.timezone && <p className="text-red-400 text-sm">{errors.timezone.message}</p>}
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

        {showBadge && (
          <div className="mt-4 text-green-400 flex items-center gap-2 text-sm">
            <span>✅ Verified Info</span>
            <span className="text-xs bg-green-800/40 px-2 py-0.5 rounded-full">Trust Badge</span>
          </div>
        )}
      </form>
    </motion.div>
  )
}

