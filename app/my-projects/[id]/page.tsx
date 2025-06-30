'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import ProjectForm from '@/components/ProjectForm'
import { useAuth } from "@clerk/nextjs";
export default function ProjectDetailPage() {
  const params = useSearchParams()
  const id = params.get('id')
  const router = useRouter()
   const { getToken } = useAuth();
   
  const { data, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: async () => { 
        const token = await getToken();
        return axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(r => r.data);
    },
    enabled: !!id,
  })

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>Project not found</p>

  return (
    <div className="p-4">
      <img src={data.image} alt={data.title} className="w-full h-60 object-cover rounded" />
      <h1 className="text-2xl mt-2 font-bold">{data.title}</h1>
      <p className="mt-1">{data.description}</p>
      <div className="flex gap-2 my-2">
        <a href={data.githubLink} target="_blank">GitHub</a>
        <a href={data.liveLink} target="_blank">Live</a>
        <a href={data.linkedinLink} target="_blank">LinkedIn</a>
      </div>
      <ProjectForm />
    </div>
  )
}
