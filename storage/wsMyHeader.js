
let wsMyHeader={
    showHeader(p1){
        return `<section class="w-50 text-center pt-4 pb-5">
            <h1 class="text-white fw-bold" id="tit">DINERO DISPONIBLE</h1>
            <h2 class="pt-4 pb-4 text-white ">$${p1.contador}</h2>
            <h3 class="pt-4 pb-4 mb-3 ingresos" id="tit1" > INGRESOS <p> $${p1.ingresos.contador}</p></h3>
            <h3 class="pt-4 pb-4 egresos" id="tit2" > EGRESOS <p>  $${p1.egresos.contador}</p><p> ${p1.egresos.porcentaje}%</p></h3>
        </section>`
        },
    
    showIngresos(p1){
        return `<div class="ingresos col-12 col-md-6 w-25 p-2">
        <h2 class="text-info">ENTRADAS</h2>
        <div class="datoIngreso d-flex  justify-content-between">
        <table class="table table-striped">
        <tbody>
          ${p1.ingresos.datos.map((val, id)=> {return `<tr><td>${val.descripcion} </td> <td>${val.valor}</td></tr>`}).join("")}
        </tbody>
        </table>
        </div>
        </div>
        <div class="egresos col-12 col-md-6 w-25 p-5+2">
            <h2 class="text-danger">SALIDAS</h2>
            <div class="datoIngreso d-flex justify-content-between">
            <table class="table table-striped">
            <tbody>
            ${p1.egresos.datos.map((val, id)=> {return `<tr><td>${val.descripcion} </td> <td>${val.valor}</td>${p1.egresos.info.map((val,id2)=>{return `<td>${val.porcentajes[id]}%</td>`})}<td><button id="btn${id}" class="btn"> x </button></td></tr>`}).join("")}
            </tbody>
            </table>
            </div>
        </div>`
    }
    
}
self.addEventListener("message",(e)=>{
    postMessage(wsMyHeader[`${e.data.module}`](e.data.data));
})