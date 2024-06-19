import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { FaEdit, FaTrash, FaEye, FaSearch } from 'react-icons/fa'; // Importar íconos de FontAwesome

function App() {
  const baseUrl = "https://localhost:44300/api/clientes";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalCargueMasivo, setModalCargueMasivo] = useState(false);
  const [modalDetalles, setModalDetalles] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState({ id: '', nombre: '', apellidos: '', edad: '', email: '', telefono: '', direccion: '', documento: '', tipo_documento: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(10); // Número de clientes por página
  const [searchTerm, setSearchTerm] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [csvErrors, setCsvErrors] = useState([]);

  // Función para manejar cambios en el formulario
  const handleChange = e => {
    const { name, value } = e.target;
    setClienteSeleccionado({ ...clienteSeleccionado, [name]: value });
  };

  // Abrir y cerrar modales
  const toggleModalInsertar = () => setModalInsertar(!modalInsertar);
  const toggleModalEditar = () => setModalEditar(!modalEditar);
  const toggleModalEliminar = () => setModalEliminar(!modalEliminar);
  const toggleModalCargueMasivo = () => setModalCargueMasivo(!modalCargueMasivo);
  const toggleModalDetalles = () => setModalDetalles(!modalDetalles);

  // Manejo de carga de archivo CSV
  const handleFileChange = e => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleUploadCsv = async () => {
    if (!csvFile) {
      alert("Por favor seleccione un archivo CSV.");
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await axios.post(`${baseUrl}/uploadcsv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Archivos cargados:', response.data);
      peticionGet(); // Actualizar la lista de clientes después de la carga masiva
      toggleModalCargueMasivo();
      alert("Carga masiva exitosa.");
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      if (error.response && error.response.data) {
        // Mostrar errores del CSV en el frontend
        setCsvErrors(error.response.data);
      }
      alert("Error al cargar el archivo CSV.");
    }
  };

  // Obtener lista de clientes
  const peticionGet = async () => {
    try {
      const response = await axios.get(baseUrl);
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  useEffect(() => {
    peticionGet();
  }, []);

  // Insertar cliente
  const peticionPost = async () => {
    delete clienteSeleccionado.id;
    clienteSeleccionado.edad = parseInt(clienteSeleccionado.edad);
    clienteSeleccionado.telefono = parseInt(clienteSeleccionado.telefono);
    clienteSeleccionado.documento = parseInt(clienteSeleccionado.documento);

    try {
      const response = await axios.post(baseUrl, clienteSeleccionado);
      setData([...data, response.data]);
      toggleModalInsertar();
      alert("Cliente creado exitosamente.");
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      alert("Error al crear el cliente.");
    }
  };

  // Editar cliente
  const peticionPut = async () => {
    clienteSeleccionado.edad = parseInt(clienteSeleccionado.edad);
    clienteSeleccionado.telefono = parseInt(clienteSeleccionado.telefono);
    clienteSeleccionado.documento = parseInt(clienteSeleccionado.documento);

    try {
      const response = await axios.put(`${baseUrl}/${clienteSeleccionado.id}`, clienteSeleccionado);
      setData(data.map(cliente => cliente.id === clienteSeleccionado.id ? response.data : cliente ));
      toggleModalEditar();
      alert("Cliente editado exitosamente.");
    } catch (error) {
      console.error('Error al editar el cliente:', error);
      alert("Error al editar el cliente.");
    }
  };

  // Eliminar cliente
  const peticionDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/${clienteSeleccionado.id}`);
      setData(data.filter(cliente => cliente.id !== clienteSeleccionado.id));
      toggleModalEliminar();
      alert("Cliente eliminado exitosamente.");
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      alert("Error al eliminar el cliente.");
    }
  };

  // Función para buscar por documento
  const filteredClients = data.filter(cliente =>
    cliente.documento.toString().includes(searchTerm)
  );

  // Paginación
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  // Cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <br /><br />
      <button onClick={toggleModalInsertar} className="btn btn-success">Insertar nuevo Cliente</button>
      <br /><br />
      <button onClick={toggleModalCargueMasivo} className="btn btn-info">Cargue Masivo de Clientes</button>
      <br /><br />
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="search-addon"><FaSearch /></span>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por documento"
          aria-label="Buscar por documento"
          aria-describedby="search-addon"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Correo Electrónico</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Documento</th>
            <th>Tipo Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentClients.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellidos}</td>
              <td>{cliente.edad}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.documento}</td>
              <td>{cliente.tipo_documento}</td>
              <td>
                <button className="btn btn-primary" onClick={() => { setClienteSeleccionado(cliente); toggleModalEditar(); }}><FaEdit /></button>{" "}
                <button className="btn btn-danger" onClick={() => { setClienteSeleccionado(cliente); toggleModalEliminar(); }}><FaTrash /></button>{" "}
                <button className="btn btn-info" onClick={() => { setClienteSeleccionado(cliente); toggleModalDetalles(); }}><FaEye /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>
        <PaginationItem>
          <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
        </PaginationItem>
        {[...Array(Math.ceil(filteredClients.length / clientsPerPage)).keys()].map(number => (
          <PaginationItem key={number} active={number + 1 === currentPage}>
            <PaginationLink onClick={() => paginate(number + 1)}>{number + 1}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink next onClick={() => paginate(currentPage + 1)} />
        </PaginationItem>
      </Pagination>

      {/* Modal para insertar cliente */}
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar nuevo Cliente</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" className="form-control" name="nombre" onChange={handleChange} />
            <br />
            <label>Apellidos</label>
            <input type="text" className="form-control" name="apellidos" onChange={handleChange} />
            <br />
            <label>Edad</label>
            <input type="text" className="form-control" name="edad" onChange={handleChange} />
            <br />
            <label>Correo Electrónico</label>
            <input type="text" className="form-control" name="email" onChange={handleChange} />
            <br />
            <label>Telefono</label>
            <input type="text" className="form-control" name="telefono" onChange={handleChange} />
            <br />
            <label>Direccion</label>
            <input type="text" className="form-control" name="direccion" onChange={handleChange} />
            <br />
            <label>Documento</label>
            <input type="text" className="form-control" name="documento" onChange={handleChange} />
            <br />
            <label>Tipo de Documento</label>
            <input type="text" className="form-control" name="tipo_documento" onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={peticionPost}>Insertar</button>{" "}
          <button className="btn btn-danger" onClick={toggleModalInsertar}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* Modal para editar cliente */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar datos de Clientes</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input type="text" className="form-control" readOnly value={clienteSeleccionado && clienteSeleccionado.id} />
            <br />
            <label>Nombre</label>
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.nombre} />
            <br />
            <label>Apellidos</label>
            <input type="text" className="form-control" name="apellidos" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.apellidos} />
            <br />
            <label>Edad</label>
            <input type="text" className="form-control" name="edad" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.edad} />
            <br />
            <label>Correo Electrónico</label>
            <input type="text" className="form-control" name="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email} />
            <br />
            <label>Telefono</label>
            <input type="text" className="form-control" name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono} />
            <br />
            <label>Direccion</label>
            <input type="text" className="form-control" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion} />
            <br />
            <label>Documento</label>
            <input type="text" className="form-control" name="documento" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.documento} />
            <br />
            <label>Tipo de Documento</label>
            <input type="text" className="form-control" name="tipo_documento" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.tipo_documento} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={peticionPut}>Editar</button>{" "}
          <button className="btn btn-danger" onClick={toggleModalEditar}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* Modal para eliminar cliente */}
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Confirme eliminar el cliente {clienteSeleccionado && clienteSeleccionado.id}, ¿está seguro?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={peticionDelete}>Sí</button>
          <button className="btn btn-secondary" onClick={toggleModalEliminar}>No</button>{" "}
        </ModalFooter>
      </Modal>

      {/* Modal para detalles del cliente */}
      <Modal isOpen={modalDetalles}>
        <ModalHeader>Detalles del Cliente</ModalHeader>
        <ModalBody>
          <p><strong>ID:</strong> {clienteSeleccionado && clienteSeleccionado.id}</p>
          <p><strong>Nombre:</strong> {clienteSeleccionado && clienteSeleccionado.nombre}</p>
          <p><strong>Apellidos:</strong> {clienteSeleccionado && clienteSeleccionado.apellidos}</p>
          <p><strong>Edad:</strong> {clienteSeleccionado && clienteSeleccionado.edad}</p>
          <p><strong>Correo Electrónico:</strong> {clienteSeleccionado && clienteSeleccionado.email}</p>
          <p><strong>Telefono:</strong> {clienteSeleccionado && clienteSeleccionado.telefono}</p>
          <p><strong>Dirección:</strong> {clienteSeleccionado && clienteSeleccionado.direccion}</p>
          <p><strong>Documento:</strong> {clienteSeleccionado && clienteSeleccionado.documento}</p>
          <p><strong>Tipo Documento:</strong> {clienteSeleccionado && clienteSeleccionado.tipo_documento}</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={toggleModalDetalles}>Cerrar</button>
        </ModalFooter>
      </Modal>

      {/* Modal para carga masiva de clientes desde CSV */}
      <Modal isOpen={modalCargueMasivo}>
        <ModalHeader>Cargue Masivo de Clientes</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <input type="file" onChange={handleFileChange} />
            <br />
            {csvErrors.length > 0 && (
              <div className="alert alert-danger" role="alert">
                Errores encontrados en el archivo CSV:
                <ul>
                  {csvErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleUploadCsv}>Cargar archivo</button>{" "}
          <button className="btn btn-secondary" onClick={toggleModalCargueMasivo}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
