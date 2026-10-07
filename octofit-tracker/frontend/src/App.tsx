import { Link, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'

function Home() {
  return (
    <main className="container py-5">
      <header className="d-flex align-items-center gap-3 mb-5">
        <img src={octofitLogo} width="64" height="64" alt="" />
        <span className="h4 fw-bold mb-0">OctoFit Tracker</span>
      </header>
      <p className="text-uppercase fw-semibold text-success mb-2">Your team fitness workspace</p>
      <h1 className="display-5 fw-bold">Move better, together.</h1>
      <p className="lead text-secondary mb-4">
        Your team fitness and activity tracking workspace is ready.
      </p>
      <Link className="btn btn-success" to="/activity">
        Open activity
      </Link>
    </main>
  )
}

function NotFound() {
  return (
    <main className="container py-5">
      <h1 className="h2">Page not found</h1>
      <Link to="/">Return to OctoFit Tracker</Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/activity" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
