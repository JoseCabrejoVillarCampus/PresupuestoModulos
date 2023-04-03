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

      function deleteData(index, p1) {
        // Elimina el elemento con el índice proporcionado del array de datos de egresos
        p1.egresos.datos.splice(index, 1);
      
        // Actualiza los porcentajes en el array de información de egresos
        const total = p1.egresos.datos.reduce((acc, curr) => acc + curr.valor, 0);
        p1.egresos.info.forEach((item) => {
          const percent = (item.total / total) * 100;
          item.porcentajes.splice(index, 1);
          item.porcentajes.push(percent);
        });
      
        // Actualiza la tabla HTML para reflejar los cambios
        const table = document.getElementById('tabla-egresos');
        const tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        p1.egresos.datos.forEach((item) => {
          const row = document.createElement('tr');
          const descripcion = document.createElement('td');
          descripcion.textContent = item.descripcion;
          row.appendChild(descripcion);
          const valor = document.createElement('td');
          valor.textContent = item.valor;
          row.appendChild(valor);
          p1.egresos.info.forEach((info) => {
            const porcentaje = document.createElement('td');
            porcentaje.textContent = info.porcentajes[index] + '%';
            row.appendChild(porcentaje);
          });
          const button = document.createElement('button');
          button.id = 'btn' + index;
          button.classList.add('btn');
          button.addEventListener('click', () => {
            deleteData(index, p1);
          });
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', '26');
          svg.setAttribute('height', '26');
          svg.setAttribute('fill', 'currentColor');
          svg.setAttribute('class', 'bi bi-trash');
          svg.setAttribute('viewBox', '0 0 16 16');
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', 'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z');
          svg.appendChild(path);
          button.appendChild(svg);
          const cell = document.createElement('td');
          cell.appendChild(button);
          row.appendChild(cell);
          tbody.appendChild(row);
        });
      }
      function sendDataToWorker(index, p1) {
        const data = { index: index, p1: p1 };
        worker.postMessage(data);
      }
      
      // Llama a la función sendDataToWorker cuando se hace clic en el botón
      const button = document.getElementById('btn0');
      button.addEventListener('click', () => {
        const index = 0;
        const p1 = { /* datos de p1 */ };
        sendDataToWorker(index, p1);
      });

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
    });
  },
  
};