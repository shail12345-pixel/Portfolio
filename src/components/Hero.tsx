import { useRef } from 'react'
import type { MouseEvent } from 'react'


function Hero() {
  const passRef = useRef<HTMLDivElement>(null)

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const pass = passRef.current
    if (!pass) return

    // Skip the effect for people who turned off motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = pass.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const tiltX = (0.5 - y) * 14
    const tiltY = (x - 0.5) * 14

    pass.style.setProperty('--tilt-x', `${tiltX}deg`)
    pass.style.setProperty('--tilt-y', `${tiltY}deg`)
    pass.style.setProperty('--glare-x', `${x * 100}%`)
    pass.style.setProperty('--glare-y', `${y * 100}%`)
  }

  function handleLeave() {
    const pass = passRef.current
    if (!pass) return
    pass.style.setProperty('--tilt-x', '0deg')
    pass.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <div className="hero">
      
      <div
        className="pass"
        ref={passRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className="pass-main">
          <p className="pass-label">Boarding Pass</p>
          <h1 className="pass-name">Sahil Indoria</h1>
          <p className="pass-intro">
            Avid coder, builder, and explorer, ready for the next adventure that lies ahead
          </p>

          <div className="pass-route">
            <div className="pass-city">
              <span className="pass-small">From</span>
              <span className="pass-code">NJ</span>
              <span className="pass-small">Rockaway</span>
            </div>
            <div className="pass-flight">
              <span className="pass-plane">✈</span>
            </div>
            <div className="pass-city pass-city-end">
              <span className="pass-small">To</span>
              <span className="pass-code">???</span>
              <span className="pass-small">Wherever's next</span>
            </div>
          </div>

          <div className="pass-details">
            <div>
              <span className="pass-small">Gate</span>
              <span>CS / Cyber</span>
            </div>
            <div>
              <span className="pass-small">Class</span>
              <span>2029</span>
            </div>
            <div>
              <span className="pass-small">Seat</span>
              <span>4610T</span>
            </div>
          </div>
        </div>

        <div className="pass-stub">
          <a href="https://github.com/shail12345-pixel">GitHub</a>
          <a href="mailto:sahil.indoria@gmail.com">Email</a>
        </div>
      </div>
    </div>
  )
}

export default Hero