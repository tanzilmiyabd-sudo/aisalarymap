export interface City {
  id: number
  city_name: string
  slug: string
  country: string
  country_code: string
  continent: string
  population: number
  cost_living_index: number
  rent_1bhk_usd: number
  rent_3bhk_usd: number
  internet_mbps: number
  quality_score: number
  digital_nomad_visa: boolean
  english_friendly: boolean
  timezone: string
  latitude: number
  longitude: number
  image_url?: string
  description?: string
}

export interface Job {
  id: number
  job_title: string
  slug: string
  category: string
  experience_level: string
  remote_possible: boolean
  description?: string
  avg_salary_usd: number
  demand_score: number
  growth_rate: number
}

export interface AISkill {
  id: number
  skill_name: string
  slug: string
  category: string
  difficulty: string
  avg_learning_hours: number
  demand_score: number
  salary_boost_percent: number
  description?: string
}

export interface Salary {
  id: number
  city_id: number
  job_id: number
  avg_salary_usd: number
  salary_min_usd: number
  salary_max_usd: number
  with_ai_skills_premium: number
  sample_size: number
  city?: City
  job?: Job
}