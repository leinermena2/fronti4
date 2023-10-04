import axios from "axios";

const loginUsers = async (datas) => {
  let datos = {}
  try {
    const response = await axios
      .post("http://localhost:3000/login", datas, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        datos = response.data
      })
      .catch((error) => {
        console.error("Error:", error);
      });
   
  } catch (error) {
    console.error("Error login user:", error);
    throw error;
  }

  return datos;
};

export { loginUsers };
