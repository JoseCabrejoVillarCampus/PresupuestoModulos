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
        localStorage.setItem("myHeader", JSON.stringify(data));
    },
};