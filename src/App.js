import axios from "axios";
import { useState } from "react";

function App() {
  const [data, setData] = useState({})
  const [search, setSearch] = useState('')

  const getWeatherInfo = () => {
    axios.get(`https://em-weather-app-backend.herokuapp.com/?place=${search}`).then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }


  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={getWeatherInfo}>Get Weather</button>

      <br />
      <br />

      {data &&
        <div>
          <p>{data.forecast}</p>
          <p>{data.location}</p>
          <p>{data.place}</p>
        </div>
      }

    </div>
  );
}

export default App;
