import { supabase } from '@/lib/supabase'

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  // Fetch company data
  const { data: salaries } = await supabase
    .from('salaries')
    .select('*')
    .eq('company', slug.replace(/-/g, ' '))
  
  if (!salaries || salaries.length === 0) {
    return <div className="p-8 text-white">Company not found</div>
  }

  const avgSalary = salaries.reduce((acc, s) => acc + s.total_comp, 0) / salaries.length

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-4">{salaries[0].company}</h1>
      <p className="text-gray-400 mb-8">Average Total Compensation: ${avgSalary.toLocaleString()}</p>
      
      <div className="grid gap-6">
        {salaries.map((salary) => (
          <div key={salary.id} className="bg-gray-900 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold">{salary.role}</h3>
            <p className="text-gray-400">{salary.level} • {salary.location}</p>
            <div className="mt-4 space-y-2">
              <p>Base: ${salary.base_salary.toLocaleString()}</p>
              <p>Bonus: ${salary.bonus.toLocaleString()}</p>
              <p>Equity: ${salary.equity.toLocaleString()}</p>
              <p className="text-2xl font-bold text-emerald-400">
                Total: ${salary.total_comp.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}