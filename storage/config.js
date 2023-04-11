export default {
  dataMyHeader() {
    const data = {
      contenido: {
        contador: 0,
        ingresos: {
          contador: 0,
          datos: [],
        },
        egresos: {
          contador: 0,
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
