import Loading from '../components/Loading'

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to your app!</p>
      
      <div style={{ margin: '2rem 0' }}>
        <h2>Loading Components Demo</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Loading size="small" />
          <Loading size="medium" text="Loading..." />
          <Loading size="large" text="Please wait" />
        </div>
      </div>
    </div>
  )
}

export default Home