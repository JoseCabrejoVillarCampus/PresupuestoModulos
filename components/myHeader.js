import config from "../storage/config.js";

const formulario = document.querySelector("#myForm");

let contIngresos = 0;
let contEgresos = 0; 
let disponible = 0;
let porcentajetotal = 0;
let cuenta = 0;

export default {
  show() {
    config.dataMyHeader();
    const { contenido } = JSON.parse(localStorage.getItem("myHeader"));
    const ws = new Worker("storage/wsMyHeader.js", { type: "module" });
    const id = ["#head1", "#head3"];
    let count = 0;

    ws.postMessage({ module: "showHeader", data: contenido });
    ws.postMessage({ module: "showIngresos", data: contenido });

    ws.addEventListener("message", (e) => {
      const doc = new DOMParser().parseFromString(e.data, "text/html");
      document.querySelector(id[count]).append(...doc.body.children);
      count += 1;

      if (count === id.length) {
        ws.terminate();
      }
    });


    formulario.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
        
      if (data.valor === "") {
        alert("Por favor, ingresa un valor.");
        return;
      }
      if (data.presupuesto === "Ingreso") {
        contIngresos += parseInt(data.valor);
        contenido.ingresos.datos.unshift(data);
        contenido.ingresos.contador = contIngresos;
      } else {
        contEgresos -= parseInt(data.valor);
        contenido.egresos.info.forEach((val) => {
          val.porcentajes = [];
          val.datos.unshift(data.valor);
          cuenta = 0;
          val.datos.forEach((val2) => {
            const calculoPorcentajes = parseInt(-(parseInt(val2) * 100) / contEgresos);
            val.porcentajes.push(calculoPorcentajes);
            cuenta += 1;
          });
        });
        contenido.egresos.datos.unshift(data);
        contenido.egresos.contador = contEgresos;
      }

      disponible = contIngresos - (-contEgresos);
      contenido.contador = disponible;
      porcentajetotal = contIngresos === 0 ? 0 : -(100 * contEgresos) / contIngresos;
      contenido.egresos.porcentaje = parseInt(porcentajetotal);
      formulario.reset();


      const ws = new Worker("storage/wsMyHeader.js", { type: "module" });
      const id = ["#head1", "#head3"];
      let count = 0;

      ws.postMessage({ module: "showHeader", data: contenido });
      ws.postMessage({ module: "showIngresos", data: contenido });

      ws.addEventListener("message", (e) => {
        document.querySelector(id[count]).innerHTML = e.data;
        count += 1;

        if (count === id.length) {
          ws.terminate();
        }
      });
      const getOptionChart = ()=>{

        return {
          xAxis: {
            type: 'category',
            data: ['INGRESOS', 'EGRESOS']
          },
          yAxis: {
            type: 'value'},
          series: [
            {
              data: [contenido.ingresos.contador,{value: -(contenido.egresos.contador) ,itemStyle: {color: '#a90000'}},],
              type: 'bar'
            }
          ]
        };
    };

    const initCharts = ()=>{
        const chart = echarts.init(document.querySelector("#graficas"));
        chart.setOption(getOptionChart());
    }
    initCharts();

    localStorage.setItem("myHeader", JSON.stringify({ contenido }));
    });
  },
  
};