'use client'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios'
import InputField from './form/InputField'
import SocialInput from './form/SocialInput'
import { useRouter } from 'next/navigation'

export default function EditProfileForm() {
  const [activeField, setActiveField] = useState('')
  const [formData, setFormData] = useState<any>({
    name: '', bio: '', image: '', skillsets: '', socialLinks: { github: '', linkedin: '', instagram: '' }
  })
 const router = useRouter()
  const { getToken, userId } = useAuth()
  const queryClient = useQueryClient()

  const {
    data: profileData,
    isLoading,
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data
    },
    enabled: !!userId,
  })

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        bio: profileData.bio || '',
        image: profileData.image || '',
        skillsets: profileData.skillsets?.join(', ') || '',
        socialLinks: profileData.socialLinks || { github: '', linkedin: '', instagram: '' }
      })
    }
  }, [profileData])

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const token = await getToken()
      return axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] })

      alert('Profile updated successfully')
            router.replace('/profile')
    },
    onError: () => {
      alert('Failed to update')
    }
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }))
  }

  const handleSave = () => {
    const dataToSend = {
      ...formData,
      skillsets: formData.skillsets
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    }
    updateMutation.mutate(dataToSend)
  }

  if (isLoading) return <p className="text-center">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputField label="Full Name" value={formData.name} onChange={e => handleChange('name', e.target.value)} activeField={activeField} setActiveField={setActiveField} />
          <InputField label="Image URL" value={formData.image} onChange={e => handleChange('image', e.target.value)} activeField={activeField} setActiveField={setActiveField} />
          <InputField label="About Me" value={formData.bio} onChange={e => handleChange('bio', e.target.value)} activeField={activeField} setActiveField={setActiveField} textarea />
          <InputField label="Skills" value={formData.skillsets} onChange={e => handleChange('skillsets', e.target.value)} activeField={activeField} setActiveField={setActiveField} />
        </div>
        <div className="space-y-4">
          <SocialInput platform="github" value={formData.socialLinks.github} onChange={e => handleSocialChange('github', e.target.value)} />
          <SocialInput platform="linkedin" value={formData.socialLinks.linkedin} onChange={e => handleSocialChange('linkedin', e.target.value)} />
          <SocialInput platform="instagram" value={formData.socialLinks.instagram} onChange={e => handleSocialChange('instagram', e.target.value)} />
        </div>
      </div>
      <div className="mt-8 text-center">
        <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
