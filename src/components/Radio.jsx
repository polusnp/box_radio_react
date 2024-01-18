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

  // const setupApi = async (stationFilter) => {
  //   const api = new RadioBrowserApi(fetch.bind(window), "Radio App")
  //   const stations = await api
  //     .searchStations({
  //       language: "english",
  //       tag: stationFilter,
  //       limit: 50,
  //     })
  //     .then((data) => {
  //       return data
  //     })
  //   return stations
  // }

  const setupApi = async (stationFilter) => {
    const proxyUrl = "https://crossorigin.me/"
    const apiUrl = "http://all.api.radio-browser.info/json/servers"
    const fullUrl = proxyUrl + apiUrl

    const api = new RadioBrowserApi(fetch.bind(window), "Radio App")

    try {
      const stations = await api
        .searchStations({
          language: "english",
          tag: stationFilter,
          limit: 50,
          url: fullUrl,
        })
        .then((data) => {
          return data
        })
      return stations
    } catch (error) {
      console.error("Error fetching stations:", error)
      throw error
    }
  }

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, index) => {
          return (
            <span
              key={index}
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
              <div className="station bg-custom-gray" key={index}>
                <div className="stationName">
                  <img
                    className="logo"
                    src={station.favicon}
                    alt="station-logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">
                    <div>
                      {station.name.length > 20
                        ? `${station.name.slice(0, 20)}...`
                        : station.name}
                    </div>
                    <div>
                      {station.country
                        ? `${station.country.slice(0, 18)}`
                        : "unknown country"}
                    </div>
                    <div>
                      {station.bitrate
                        ? `${station.bitrate} Mhz`
                        : "unknown Mhz"}
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
