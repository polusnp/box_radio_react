import Radio from "./components/Radio"
import "./index.css"

function App() {
  return (
    <div className="text-slate-800 font-bold text-center">
      <h1 className="text-3xl">Radio Box Player</h1>
      <h2 className="text-xl">
        Pick a genre, choose a station and enjoy listeninig
      </h2>
      <Radio />
    </div>
  )
}

export default App
