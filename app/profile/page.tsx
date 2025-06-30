'use client'

import { useState, useEffect } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import { toast } from 'sonner'

export default function EditProfilePage() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState('')
  const [image, setImage] = useState('')
  const [socials, setSocials] = useState({
    github: '',
    linkedin: '',
    instagram: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const { bio, skills, image, socials } = res.data
      setBio(bio || '')
      setSkills(skills?.join(', ') || '')
      setImage(image || '')
      setSocials(socials || {})
    }

    if (user) fetchProfile()
  }, [user])

  const handleSave = async () => {
    const token = await getToken()
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profile`,
      {
        bio,
        skills: skills.split(',').map((s) => s.trim()),
        image,
        socials,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    toast.success('Profile updated!')
  }

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        <div className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            placeholder="About me"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Skills (comma-separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="GitHub link"
            value={socials.github}
            onChange={(e) => setSocials({ ...socials, github: e.target.value })}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="LinkedIn link"
            value={socials.linkedin}
            onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Instagram link"
            value={socials.instagram}
            onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
          />

          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </main>
    </>
  )
}
