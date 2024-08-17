import styles from "./weatherMainInfo.module.css";

export default function WeatherMainInfo({ weather }) {
  return (
    <div className={styles.mainInfo}>
      {/* Muestra el nombre de la ciudad */}
      <div className={styles.city}>{weather?.location.name}</div>

      {/* Muestra el país de la ciudad */}
      <div className={styles.country}>{weather?.location.country}</div>

      {/* Contenedor para la imagen del clima y las condiciones actuales */}
      <div className={styles.row}>
        <div>
          {/* Imagen del ícono del clima actual */}
          <img
            src={`http:${weather?.current.condition.icon}`}
            width="128px"
            alt={weather?.current.condition.text}
          />
        </div>
        <div className={styles.weatherConditions}>
          {/* Texto que describe las condiciones del clima actual */}
          <div className={styles.condition}>
            {weather?.current.condition.text}
          </div>
          {/* Temperatura actual en grados Celsius */}
          <div className={styles.current}>{weather?.current.temp_c}º</div>
        </div>
      </div>

      {/* Mapa incrustado de Google Maps que muestra la ubicación de la ciudad */}
      <iframe
        title="mapa"
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26418.240918617143!2d${weather?.location.lon}027!3d${weather?.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2ses!4v1723843254770!5m2!1sen!2ses`}
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
