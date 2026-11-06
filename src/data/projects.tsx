export type Project = {
  name: string
  tag: string
  status: string
  description: string
  tech: string[]
  link?: string
  github?: string
}

export const projects: Project[] = [
  {
  name: 'Agora',
  tag: 'AGR',
  status: 'Archived',
  description:
    'An AI workspace for high school researchers. Notes, sources and team chat in one place, plus an AI assistant that remembers your whole project. Launched a public beta with student testers.',
  tech: ['AI', 'Web app', 'LaunchX'],
   },
  {
    name: 'PitSync',
    tag: 'PIT',
    status: 'Shipped',
    description:
      'A live scouting app for VEX robotics teams to track opponents during tournaments.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    github: '', // paste the GitHub link here
  },
  {
    name: 'VEX Autonomous',
    tag: 'VEX',
    status: 'Competing',
    description:
      'Autonomous routines for my team’s competition robot, programmed on VEX V5.',
    tech: ['C++', 'VEX V5', 'RW JAR template'],
  },
]