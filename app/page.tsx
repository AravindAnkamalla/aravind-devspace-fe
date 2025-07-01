'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import SkillBadges from '@/components/SkillBadges'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

export default function Home() {

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log('hii')
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`)
      console.log(res)
      return res.data
    },
  })

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center text-center dark:bg-gray-900  shadow-md p-8">
        {/* Profile Image */}
        <img
          src={data?.image}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-md border-4 border-blue-500 object-cover mb-4"
        />

        {/* Name */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {data?.name}
        </h1>

        {/* Bio */}
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mb-4">
          {data?.bio}
        </p>

        {/* Social Links */}
        <div className="flex gap-6 mt-2 text-xl text-blue-600 dark:text-blue-400">
          {data?.socialLinks?.github && (
            <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="hover:text-blue-800 transition" />
            </a>
          )}
          {data?.socialLinks?.linkedin && (
            <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="hover:text-blue-800 transition" />
            </a>
          )}
          {data?.socialLinks?.instagram && (
            <a href={data.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-blue-800 transition" />
            </a>
          )}
        </div>

        {/* Skills */}
        <div className="w-full mt-8 text-left">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Skillsets
          </h2>
          <div className="flex flex-wrap gap-2">
            <SkillBadges skills={data?.skillsets} />
          </div>
        </div>
      </div>
    </div>
  )
}
