import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function App() {

  const baseUrl="https://localhost:44300/api/clientes";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [modalCargueMasivo, setModalCargueMasivo]=useState(false);
  const [clienteSeleccionado, setclienteSeleccionado]=useState({
    id: '',
    nombre: '',
    apellidos: '',
    edad: '',
    email: '',
    telefono: '',
    direccion: '',
    documento: '',
    tipo_documento: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setclienteSeleccionado({
      ...clienteSeleccionado,
      [name]: value
    });
    console.log(clienteSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalCargueMasivo=()=>{
    setModalCargueMasivo(!modalCargueMasivo);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    delete clienteSeleccionado.id;
    clienteSeleccionado.edad= parseInt(clienteSeleccionado.edad);
    clienteSeleccionado.telefono= parseInt(clienteSeleccionado.telefono);
    clienteSeleccionado.documento= parseInt(clienteSeleccionado.documento);
    await axios.post(baseUrl, clienteSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    clienteSeleccionado.edad= parseInt(clienteSeleccionado.edad);
    clienteSeleccionado.telefono= parseInt(clienteSeleccionado.telefono);
    clienteSeleccionado.documento= parseInt(clienteSeleccionado.documento);
    await axios.put(baseUrl+"/"+clienteSeleccionado.id, clienteSeleccionado)
    .then(response=>{
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(cliente=>{
        if (cliente.id===clienteSeleccionado.id) {
          cliente.nombre=respuesta.nombre;
          cliente.apellidos=respuesta.apellidos;
          cliente.edad=respuesta.edad;
          cliente.email=respuesta.email;
          cliente.telefono=respuesta.telefono;
          cliente.direccion=respuesta.direccion;
          cliente.documento=respuesta.documento;
          cliente.tipo_documento=respuesta.tipo_documento;
        }
      })
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+clienteSeleccionado.id)
    .then(response=>{
      setData(data.filter(cliente=>cliente.id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCliente=(cliente, caso)=>{
    setclienteSeleccionado(cliente);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div className="App">
      <br/><br/>
      <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success" margin-right >  Insertar nuevo Cliente</button>
      <br/><br/>
      <button onClick={()=>abrirCerrarModalCargueMasivo()} className="btn btn-info"> Cargue Masivo de Clientes</button>
      <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Edad</th>
            <th>Correo Electronico</th>
            <th>Telefono</th>
            <th>Direccion</th>
            <th>Documento</th>
            <th>Tipo Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(cliente=>(
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
                <button className="btn btn-primary" onClick={()=>seleccionarCliente(cliente, "Editar")}>Editar</button> {" "}
                <button className="btn btn-danger" onClick={()=>seleccionarCliente(cliente, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar datos de Clientes</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre</label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
            <br />
            <label>Apellidos</label>
            <br />
            <input type="text" className="form-control" name="apellidos" onChange={handleChange}/>
            <br />
            <label>Edad</label>
            <br />
            <input type="text" className="form-control" name="edad" onChange={handleChange}/>
            <br />
            <label>Correo Electronico</label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange}/>
            <br />
            <label>Telefono</label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
            <br />
            <label>Direccion</label>
            <br />
            <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
            <br />
            <label>Documento</label>
            <br />
            <input type="text" className="form-control" name="documento" onChange={handleChange}/>
            <br />
            <label>Tipo de Documento</label>
            <br />
            <input type="text" className="form-control" name="tipo_documento" onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar datos de Clientes</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <br />
            <input type="text" className="form-control" readOnly value={clienteSeleccionado && clienteSeleccionado.id}/>
            <br />
            <label>Nombre</label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.nombre}/>
            <br />
            <label>Apellidos</label>
            <br />
            <input type="text" className="form-control" name="apellidos" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.apellidos}/>
            <br />
            <label>Edad</label>
            <br />
            <input type="text" className="form-control" name="edad" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.edad}/>
            <br />
            <label>Correo Electronico</label>
            <br />
            <input type="text" className="form-control" name="email" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.email}/>
            <br />
            <label>Telefono</label>
            <br />
            <input type="text" className="form-control" name="telefono" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.telefono}/>
            <br />
            <label>Direccion</label>
            <br />
            <input type="text" className="form-control" name="direccion" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.direccion}/>
            <br />
            <label>Documento</label>
            <br />
            <input type="text" className="form-control" name="documento" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.documento}/>
            <br />
            <label>Tipo de Documento</label>
            <br />
            <input type="text" className="form-control" name="tipo_documento" onChange={handleChange} value={clienteSeleccionado && clienteSeleccionado.tipo_documento}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-success" onClick={()=>peticionPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Confirme elimnar el cliente {clienteSeleccionado && clienteSeleccionado.id}, ¿está seguro?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>Sí</button>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>{"   "}
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCargueMasivo}>
        <ModalHeader>Cargue Masivo de Clientes</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <br /><br />
            <input type="file" name="nombre"/>
            <br /><br />
            <button className="btn btn-primary">Insertar archivo</button>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={()=>abrirCerrarModalCargueMasivo()}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
