export default {
  dataMyHeader() {
    const data = {
      contenido: {
        contador: "",
        ingresos: {
          contador: "",
          datos: [],
        },
        egresos: {
          contador: "",
          porcentaje: "",
          info: [
            {
              datos: [],
              porcentajes: [],
            },
          ],
          datos: [],
        },
      },
    };
    const feto = localStorage.getItem("myHeader");
    if (!feto) localStorage.setItem("myHeader", JSON.stringify(data));
  },
};
