import Radio from "./components/Radio"
import "./index.css"

function App() {
  return (
    <div className="flex items-center flex-col bg-[url(./assets/bg-3.jpg)] ">
      <h1>Radio Box Player</h1>
      <h2>Pick a genre, choose a station and enjoy listeninig</h2>
      <Radio />
    </div>
  )
}

export default App
