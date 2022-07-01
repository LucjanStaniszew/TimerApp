import React from 'react';
import './Timer.css'

const Timer = () => {
  const[segundos, setSegundos] = React.useState(0);
  const[activo, setActivo] = React.useState(false);
  const [tipo, setTipo] = React.useState("Contador");
  const myRef = React.useRef(null);

  function toggle(){
    setActivo(!activo);
  }

  function reset() {
    setSegundos(0);
    setActivo(false);
    if (tipo === 'Cuenta Regresiva' && myRef.current.value !== 0) myRef.current.value = ""
  }

  function cambioTipo(){
    if (tipo === "Contador") setTipo('Cuenta Regresiva')
    if (tipo === "Cuenta Regresiva") setTipo('Contador')
  }

  function agregaSegundos() {
    let ref = myRef.current.value
    setSegundos(ref)
  }

  React.useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'Contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }
    if (activo && tipo === 'Cuenta Regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos -1)
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'Contador') {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  return (
    <div className="app">
      <div className="time">
        {segundos}
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${activo ? 'active' : 'inactive'}`} onClick={toggle}>
          {activo ? 'Pausa' : 'Inicio'}
        </button>
      </div>
      <div className="row">
        <button className="button-reset" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button-cambio" onClick={cambioTipo}>
          {tipo}
      </button>
      {tipo === 'Cuenta Regresiva' && <input className="addNumber" type="number" ref={myRef} onChange={agregaSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>}
    </div>
  );
};

export default Timer;