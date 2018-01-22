import Head from './Head'

export default ({ children }) => (
  <div>
    <Head />

    <div className='container'>
      { children }
    </div>

    <style jsx>{`
      .container {
        margin: 0 auto;
        max-width: 1400px;
        min-width: 300px;
      }
    `}</style>
  </div>
)
