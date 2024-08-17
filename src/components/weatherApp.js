import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import Loading from "./loading";

import styles from "./weatherApp.module.css";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null); // Estado para almacenar los datos del clima
  const [error, setError] = useState(false); // Estado para manejar si hay un error al buscar una ciudad

  // Efecto que carga la información del clima cuando el componente se monta
  useEffect(() => {
    loadInfo();
  }, []);

  // Efecto que actualiza el título de la página con el nombre de la ciudad
  useEffect(() => {
    document.title = `Weather | ${weather?.location?.name ?? ""}`;
  }, [weather]);

  // Función asíncrona que realiza la petición a la API para obtener los datos del clima
  async function loadInfo(city = "london") {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );

      const json = await request.json();

      // Si la API devuelve un error (ciudad no encontrada), se actualiza el estado de error
      if (json.error) {
        setError(true);
        setWeather(null); // Se asegura de que los datos de clima se reseteen
      } else {
        setWeather(json); // Si los datos son válidos, se actualiza el estado de clima
        setError(false); // Se resetea el estado de error
      }
    } catch (error) {
      setError(true); // Si ocurre un error en la petición, se actualiza el estado de error
    }
  }

  // Función que se llama cuando el usuario cambia la ciudad
  function handleChangeCity(city) {
    setWeather(null); // Resetea los datos de clima mientras se carga la nueva información
    loadInfo(city); // Carga la información de la nueva ciudad
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleChangeCity} />
      {weather ? (
        // Si hay datos de clima, se muestra la información principal
        <WeatherMainInfo weather={weather} />
      ) : error ? (
        // Si hay un error (ciudad no encontrada), se muestra un mensaje de error
        <div className={styles.error}>
          Ciudad no encontrada, intenta otra vez.
        </div>
      ) : (
        // Mientras se carga la información, se muestra un icono de carga
        <Loading />
      )}
    </div>
  );
}
