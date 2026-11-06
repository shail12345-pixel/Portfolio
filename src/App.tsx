import Background from './components/Background'
import Hero from './components/Hero'
import FlightPath from './components/FlightPath'
import Projects from './components/Projects'
import Globe from './components/Globe'

function App() {
  return (
    <>
    <Background />
    <Globe />
    <main>
      <Hero />
      <FlightPath />
      <Projects />
    </main>
  </>
  )
}


export default App