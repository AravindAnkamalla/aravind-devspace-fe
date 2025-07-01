'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import ProjectForm from '@/components/ProjectForm'
import SkillBadges from '@/components/SkillBadges'
import { useAuth } from '@clerk/nextjs'

export default function ProjectDetailPage() {
  const params = useParams()
  const id = params.id as string
  console.log(id)
  const { getToken } = useAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => {
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
    enabled: !!id,
  })

  if (isLoading) return <p className="text-center py-10 text-gray-500">Loading project...</p>
  if (error || !data) return <p className="text-center py-10 text-red-500">Project not found.</p>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-lg overflow-hidden shadow bg-white dark:bg-gray-900 border dark:border-gray-700">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{data.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2">{data.description}</p>

          <div className="mt-4">
            <SkillBadges skills={data.techStacks} />
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            {data.githubLink && (
              <a
                href={data.githubLink}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}
            {data.liveLink && (
              <a
                href={data.liveLink}
                target="_blank"
                className="text-green-600 hover:underline"
              >
                Live Demo
              </a>
            )}
            {data.linkedinLink && (
              <a
                href={data.linkedinLink}
                target="_blank"
                className="text-purple-600 hover:underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
        <ProjectForm />
      </div> */}
    </div>
  )
}
