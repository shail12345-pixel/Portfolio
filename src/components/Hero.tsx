function Hero() {
  return (
    <section className="hero">
      <div className="pass">
        <div className="pass-main">
          <p className="pass-label">Boarding Pass</p>
          <h1 className="pass-name">Sahil Indoria</h1>
          <p className="pass-intro">Avid coder, builder, and explorer, ready for the next adventure that lies ahead.</p>

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
    </section>
  )
}

export default Hero