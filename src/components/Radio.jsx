import { useState, useEffect } from "react"
import { RadioBrowserApi } from "radio-browser-api"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"
import defaultImage from "../assets/logo_fallback.png"
import { filters } from "../constans/filters"

const setDefaultSrc = (e) => {
  e.target.src = defaultImage
}

function Radio() {
  const [stations, setStations] = useState()
  const [stationFilter, setStationFilter] = useState("all")

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data)
    })
  }, [stationFilter])

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "Radio App")
    const stations = await api
      .searchStations({
        language: "english",
        tag: stationFilter,
        limit: 50,
      })
      .then((data) => {
        return data
      })
    return stations
  }

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter) => {
          return (
            <span
              className={stationFilter === filter ? "selected" : ""}
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </span>
          )
        })}
      </div>
      <div className="stations">
        {stations &&
          stations.map((station, index) => {
            return (
              <div className="flex flex-col" key={index}>
                {/* className="station" */}
                <div className="flex justify-center">
                  <div className="">
                    <img
                      className="logo"
                      src={station.favicon}
                      alt="station-logo"
                      onError={setDefaultSrc}
                    />
                    <div>
                      <div className="name">{station.name}</div>
                      <div className="">{station.country}</div>
                      <div>
                        {station.bitrate ? `${station.bitrate} Mhz` : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <AudioPlayer
                  className="player"
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                  showFilledVolume={true}
                  volume={0.3}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Radio
