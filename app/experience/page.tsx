'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import ExperienceForm from '@/components/ExperienceForm'
import ExperienceCard from '@/components/ExperienceCard'
import { useAuth } from '@clerk/nextjs'
import { useState } from 'react'


export default function ExperiencePage() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const [editingExp, setEditingExp] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: async () => {
      const token = await getToken()
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experiences`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
  })

  // Upsert mutation
  const mutation = useMutation({
    mutationFn: async (formData: any) => {
      const token = await getToken()
      if (formData.id) {
        return axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experiences/${formData.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        return axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experiences`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] })
      setEditingExp(null)
      setShowForm(false)
    },
  })

  // Delete experience
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()
      return axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experiences/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] })
    },
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Past Experience</h2>
          <button
            onClick={() => {
              setEditingExp(null)
              setShowForm(!showForm)
            }}
            className="text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {showForm ? 'Close Form' : 'Add Experience'}
          </button>
        </div>

        {showForm && (
          <ExperienceForm
            initialData={editingExp}
            onSubmit={(data) => mutation.mutate(data)}
            onCancel={() => {
              setEditingExp(null)
              setShowForm(false)
            }}
          />
        )}

        <div className="grid gap-4 mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            experiences.map((exp: any) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onEdit={() => {
                  setEditingExp(exp)
                  setShowForm(true)
                }}
                onDelete={() => deleteMutation.mutate(exp.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
