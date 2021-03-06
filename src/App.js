import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  //array de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas])

  // funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  }
  
  //funcion que elimina cita por id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tis citas';


  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {
              citas.map(cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
