'use client'

import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '@clerk/nextjs'

interface ProfileData {
  name: string
  bio: string
  image: string
  github: string
  linkedin: string
  instagram: string
  skills: string
}

export default function EditProfileForm() {
  const { getToken } = useAuth()

  const { register, handleSubmit, reset } = useForm<ProfileData>()

  const { isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      reset(res.data)
      return res.data
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: ProfileData) => {
      const token = await getToken()
      await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    },
  })

  const onSubmit = (data: ProfileData) => mutation.mutate(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('name')} placeholder="Name" className="input" />
      <input {...register('bio')} placeholder="Bio" className="input" />
      <input {...register('image')} placeholder="Image URL" className="input" />
      <input {...register('github')} placeholder="GitHub URL" className="input" />
      <input {...register('linkedin')} placeholder="LinkedIn URL" className="input" />
      <input {...register('instagram')} placeholder="Instagram URL" className="input" />
      <input {...register('skills')} placeholder="Skills (comma-separated)" className="input" />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Profile
      </button>
    </form>
  )
}
