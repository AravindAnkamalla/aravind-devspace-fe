'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'

type ExperienceFormProps = {
  initialData?: {
    id?: string
    title: string
    company: string
    location?: string
    startDate: string
    endDate?: string
    description?: string
    image?: string // base64 string or URL
  }
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function ExperienceForm({ initialData, onSubmit, onCancel }: ExperienceFormProps) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        startDate: initialData.startDate?.split('T')[0],
        endDate: initialData.endDate?.split('T')[0],
      })
      setPreview(initialData.image || null)
    }
  }, [initialData, reset])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setValue('image', base64)
        setPreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const onFormSubmit = (data: any) => {
    onSubmit(data) // All values are JSON-safe, including base64 image
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Avatar Image Upload */}
      <div className="flex justify-center">
        <div
          className="w-28 h-28 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} className="w-full h-full object-cover rounded-full" />
          ) : (
            <span className="text-sm text-gray-500 text-center">Upload</span>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        <input type="hidden" {...register('image')} />
      </div>

      <input placeholder="Title" className="border p-2 w-full" {...register('title', { required: true })} />
      <input placeholder="Company" className="border p-2 w-full" {...register('company', { required: true })} />
      <input placeholder="Location" className="border p-2 w-full" {...register('location')} />
      <input type="date" className="border p-2 w-full" {...register('startDate', { required: true })} />
      <input type="date" className="border p-2 w-full" {...register('endDate')} />
      <textarea placeholder="Description" rows={3} className="border p-2 w-full" {...register('description')} />

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {initialData ? 'Update' : 'Add'} Experience
        </button>
        {initialData && (
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
