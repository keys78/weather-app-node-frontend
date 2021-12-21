import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({})
  const [search, setSearch] = useState('')
  const [flip, setFlip] = useState(false)
  const [loading, setLoading] = useState(false)

  const loader = "https://cutewallpaper.org/21/loading-gif-transparent-background/CBP-Portal.gif"

  const getWeatherInfo = (e) => {
    e.preventDefault();
    setLoading(true)

    axios.get(`https://em-weather-app-backend.herokuapp.com/?place=${search}`).then((res) => {

      console.log(res.data)
      setData(res.data)
      setLoading(false)
      setFlip(true)
    })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        loading(false)
      })
  }

  const returnToSearch = () => {
    setFlip(false)
  }


  return (
    <section className="text-white">
      <div className="w-full bg-black border-b border-gray-700 ">
        <div className="sm:w-9/12 w-11/12 mx-auto py-6">
          <h1 className="sm:text-3xl text-2xl ">Weather App</h1>
        </div>
      </div>

      <div className="main">
        <div className="md:w-4/12 sm:w-9/12 w-11/12">
          {!flip &&
            <form onSubmit={getWeatherInfo}>
              <input
                type="search"
                placeholder="Enter name of a place"
                className="py-2 px-3 outline-none w-full rounded-2xl mb-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
              <button className="bg-green-600 rounded-2xl py-2 px-5 w-full mb-4">Get Weather Info</button>
            </form>
          }

          <div>{data.error}</div>
          <div>{loading && <img className="w-60 mx-auto" src={loader} alt="loader" />}</div>

          {flip &&
            <div className="weather-data">
              <p><span>Forecast: </span> {data.forecast}</p>
              <p><span>Location: </span> {data.location}</p>
              <p><span>Country: </span> {data.place}</p>
              <p><span>LocalTime: </span> {data.localtime}</p>
              <div className="mt-4 flex items-center justify-between">
                <img src={data.icon} alt="icon" />
                <button
                  className="rounded-xl bg-red-800 py-2 px-3 "
                  onClick={returnToSearch}>
                  Try again
                </button>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  );
}

export default App;
