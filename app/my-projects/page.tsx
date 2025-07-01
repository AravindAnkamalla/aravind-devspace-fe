'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

export default  function ProjectsPage() {

  
  const { data = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
     
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`
       )
      return res.data
    },
  })

  if (isLoading) return <p>Loading projects...</p>

  return (
    <div className="grid sm:grid-cols-2 gap-4 p-4">
      {data.map((proj: any) => (
        <ProjectCard key={proj.id} project={proj} />
      ))}
      {/* <Link href="/my-projects/create" className="p-4 border flex items-center justify-center text-blue-600">
        + Add Project
      </Link> */}
    </div>
  )
}
