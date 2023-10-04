import axios from "axios";

const getListType = (type) => {
    return axios.get(`http://localhost:3000/listasByType/${type}`);
  };

  const getListPartner = (partner) => {
    return axios.get(`http://localhost:3000/listasAsociadas/${partner}`);
  };

  const getEncuentas = (partner) => {
    return axios.get(`http://localhost:3000/encuestas/`);
  };

  const guardarEncuestas = async (datas) => {
    let datos = {}
    try {

    const response = await axios
      .post("http://localhost:3000/encuestas", datas, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        datos =response.data
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    } catch (error) {
        console.error("Error creando encuestas:", error);
        throw error;
    }
    return datos;
}

const editarEncuestas = async (id, datas) => {

    try {
      const response = await axios.put(`http://localhost:3000/encuestas/${id}`, datas, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error editando encuesta:", error);
      throw error;
    }
  };

  const inhabiliarEncuesta = async (id, datas) => {

    try {
      const response = await axios.put(`http://localhost:3000/inactivar-encuestas/${id}`, datas, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error inhabilitando encuesta:", error);
      throw error;
    }
  };

export { getListType, getListPartner, guardarEncuestas, getEncuentas, editarEncuestas, inhabiliarEncuesta };