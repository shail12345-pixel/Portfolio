import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

const BIO = [
  "I'm a sophomore at Morris Hills High School in New Jersey, and I like building things people actually use. Most of what I'm into sits where computer science, cybersecurity, and economics meet.",
  "I code in Java, C++, and Python, and I've built web apps with React and TypeScript. I care about design too. If a tool is ugly or confusing, nobody uses it, no matter how good the code is.",
  'Off the screen, I ski, play drums, and travel whenever I get the chance.',
  "If you're building something interesting, I'd love to hear about it.",
]

const FACTS = [
  ['Based in', 'New Jersey'],
  ['School', 'Morris Hills HS, Class of 2029'],
  ['Currently', 'CyberPatriot season + building this site'],
  ['Open to', 'Summer programs, research, internships'],
]

// Logos come from Devicon, a free library of programming logos
const SKILLS = [
  { name: 'Java', icon: 'java' },
  { name: 'C++', icon: 'cplusplus' },
  { name: 'Python', icon: 'python' },
  { name: 'HTML', icon: 'html5' },
  { name: 'CSS', icon: 'css3' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Tailwind', icon: 'tailwindcss' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Git', icon: 'git' },
  { name: 'Linux', icon: 'linux' },
]

const iconUrl = (icon: string) =>
  `https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons/${icon}/${icon}-original.svg`

function About() {
  const sectionRef = useRef<HTMLElement>(null)

  // Start the word-by-word reveal the first time the section scrolls into view
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  let wordIndex = 0 // counts words across all paragraphs so they light up in order

  return (
    <section className="section section-wide about" id="about" ref={sectionRef}>
      <p className="section-label">Who I am</p>
      <h2 className="section-title">About</h2>

      <div className="about-grid">
        <div className="about-photo-frame">
          <img className="about-photo" src="/about/me.jpg" alt="Sahil Indoria" />
        </div>

        <div>
          {BIO.map((paragraph, p) => (
            <p className="about-p" key={p}>
              {paragraph.split(' ').map((word, w) => {
                const i = wordIndex++
                return (
                  <span className="word" key={w} style={{ '--i': i } as CSSProperties}>
                    {word}{' '}
                  </span>
                )
              })}
            </p>
          ))}

          <dl className="facts">
            {FACTS.map(([label, value]) => (
              <div className="fact" key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <h3 className="about-sub">Tools I use</h3>
      <ul className="skills">
        {SKILLS.map((skill) => (
          <li className="skill" key={skill.name}>
            <img src={iconUrl(skill.icon)} alt="" />
            <span className="skill-name">{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default About