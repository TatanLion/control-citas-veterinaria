import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import Header from "./components/Header"

function App() {
  //Estado donde estan todos los pacientes
  const [pacientes, setPacientes] = useState([]);
  //Estado para modificar un paciente
  const [paciente, setPaciente] = useState({})
  // console.log('Estado editar', paciente);

  useEffect(() => {
    const obtenerpacientesLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      // console.log(pacientesLS);
      setPacientes(pacientesLS);
    }
    obtenerpacientesLS();
  }, [])

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizados);
  }

  // console.log(pacientes);

  return (
    <div className="container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          setPaciente={setPaciente}
          //Objeto para editar
          paciente={paciente}
        />
        <ListadoPacientes
          setPaciente={setPaciente}
          pacientes={pacientes}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
