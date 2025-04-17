import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const apiKey = "4312563cef4ee4bae9144ed09df56453";

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: apiKey,
            lang: "pt_br",
            units: "metric",
          },
        }
      );
      setWeatherData(response.data);
      setError("");
      setHistory((prev) => [city, ...prev.filter((c) => c !== city)]);
    } catch (err) {
      setError("Cidade não encontrada");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#11181f",
    }}>
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
        backgroundColor: "#17202a",
        maxWidth: "500px",
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
}}>

        <h1 style={{ marginBottom: "1rem" }}>App de Clima</h1>
  
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{
              padding: "0.6rem",
              width: "220px",
              marginRight: "10px",
              border: "1px solid #17202a",
              borderRadius: "5px"
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "0.6rem 1.2rem",
              backgroundColor: "#5dade2",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Buscar
          </button>
        </div>
  
        {loading && <p>Carregando...</p>}
  
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
  
        {weatherData && (
          <div style={{
            backgroundColor: "#566573",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
            marginBottom: "2rem",
            width: "250px"
          }}>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description} - {weatherData.main.temp.toFixed(1)}°C</p>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="Ícone do clima"
            />
          </div>
        )}
  
        {history.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h3>Histórico de buscas</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {history.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCity(item);
                    handleSearch();
                  }}
                  style={{
                    cursor: "pointer",
                    color: "#c6b8b8",
                    marginBottom: "5px",
                    textDecoration: "bold",
                    textAlign: "center"
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );  
};

export default Weather;
