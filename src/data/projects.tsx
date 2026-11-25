export type Project = {
  name: string
  tag: string
  status: string
  description: string
  tech: string[]
  image?: string
  link?: string
  github?: string
}

export const projects: Project[] = [
  {
    name: 'PitSync',
    tag: 'PIT',
    status: 'Shipped',
    description:
      'PitSync lets a scout in the stands send match notes straight to their team’s drivers in the pit, live, with just a session code. No accounts. I first built it with an AI tool, got called out on a VEX Discord for “AI slop,” and rebuilt the whole thing by hand in React and Supabase. Then I asked about 20 VEX competitors if they’d actually use it. Most wouldn’t, and that taught me more than the code did.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    image: '/projects/pitsync.png',
    link: 'https://pit-sync.vercel.app',
  },
  {
    name: 'VEX Autonomous',
    tag: 'VEX',
    status: 'Competing',
    description:
      'I write the autonomous code for my team’s robot: the first 15 seconds of every match, when it drives itself with no one at the controls. It’s C++ on VEX V5, built on the RW JAR template. Three seasons in, across two teams. Two Judges Awards so far.',
    tech: ['C++', 'VEX V5', 'RW JAR template'],
    image: '/projects/vex.png',
  },
  {
    name: 'Agora',
    tag: 'AGR',
    status: 'Archived',
    description:
      'Agora put a research team’s notes, sources, and chat in one place. Its AI assistant, Odeon, kept track of the whole project, so you could ask “what should we research next?” without explaining everything again. We built it at LaunchX for high schoolers. The strongest interest came from college students instead. One offered to join our team and share it with his whole university, and that told us who it was really for.',
    tech: ['AI', 'Web app', 'LaunchX'],
    image: '/projects/agora.png',
  },
  {
    name: 'This Website',
    tag: 'WEB',
    status: 'Live',
    description:
      'The site you’re on. I built it from scratch in React and TypeScript, with no template. The first version had a 3D globe and a plane that flew between my projects. It looked cool, but it didn’t say anything about the work, so I cut it. Simpler turned out better.',
    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    image: '/projects/portfolio.png',
    github: 'https://github.com/shail12345-pixel/Portfolio',
  },
]