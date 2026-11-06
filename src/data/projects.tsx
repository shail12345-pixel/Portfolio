export type Project = {
  name: string
  tag: string
  status: string
  place: string
  location: [number, number]
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
    place: 'Tokyo',
    location: [35.68, 139.69],
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
    place: 'Sydney',
    location: [-33.87, 151.21],
    description:
      'I write the autonomous code for my team’s robot: the first 15 seconds of every match, when it drives itself with no one at the controls. It’s C++ on VEX V5, built on the RW JAR template. Three seasons in, across two teams. Two Judges Awards so far.',
    tech: ['C++', 'VEX V5', 'RW JAR template'],
    image: '/projects/vex.png',
  },
  {
    name: 'Agora',
    tag: 'AGR',
    status: 'Archived',
    place: 'San Francisco',
    location: [37.77, -122.42],
        description:
      'Agora put a research team’s notes, sources, and chat in one place. Its AI assistant, Odeon, kept track of the whole project, so you could ask “what should we research next?” without explaining everything again. We built it at LaunchX for high schoolers. The strongest interest came from college students instead. One offered to join our team and share it with his whole university, and that told us who it was really for.',
    tech: ['AI', 'Web app', 'LaunchX'],
    image: '/projects/agora.png',
  },
]