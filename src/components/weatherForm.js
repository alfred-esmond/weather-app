import { useState } from "react";
import styles from "./weatherForm.module.css";

export default function WeatherForm({ onChangeCity }) {
  const [city, setCity] = useState(""); // Estado para almacenar el valor ingresado en el input

  // Función que se ejecuta cada vez que el usuario escribe en el input
  function onChange(e) {
    const value = e.target.value;

    // Si el valor no está vacío, se actualiza el estado de la ciudad
    if (value !== "") {
      setCity(value);
    }
  }

  // Función que se ejecuta cuando se envía el formulario
  function handleSubmit(e) {
    e.preventDefault(); // Previene la recarga de la página al enviar el formulario
    onChangeCity(city); // Llama a la función `onChangeCity` con el valor de la ciudad ingresada
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="text"
        onChange={onChange}
        className={styles.input}
        placeholder="Escribe una ciudad..." // Placeholder para indicar al usuario qué debe hacer
      />
    </form>
  );
}
