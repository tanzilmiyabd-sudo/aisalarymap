'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [salaries, setSalaries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('salaries')
        .select('*')
        .limit(5)
      
      if (error) {
        console.error('Error:', error)
      } else {
        setSalaries(data || [])
      }
      setLoading(false)
    }
    
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">AI Salary Data (Test)</h1>
      
      {salaries.length === 0 ? (
        <p className="text-red-400">No data found. Check Supabase connection.</p>
      ) : (
        <div className="space-y-4">
          {salaries.map((salary) => (
            <div key={salary.id} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold">{salary.company}</h2>
              <p className="text-gray-400">{salary.role} - {salary.level}</p>
              <p className="text-emerald-400 font-mono text-lg mt-2">
                ${salary.total_comp?.toLocaleString() || 'N/A'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}