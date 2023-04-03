let wsMyHeader={
    showHeader(p1){
        return `<section class="w-50 text-center pt-4 pb-5">
            <h1 class="text-white fw-bold" id="tit">DINERO DISPONIBLE</h1>
            <h2 class="pt-4 pb-4 text-white ">$${p1.contador}</h2>
            <h3 class="pt-4 pb-4 mb-3 ingresos" id="tit1" > INGRESOS <a> $${p1.ingresos.contador}</a></h3>
            <h3 class="pt-4 pb-4 egresos" id="tit2" > EGRESOS  <a>  $${p1.egresos.contador}</a> <a> ${p1.egresos.porcentaje}%</a></h3>
        </section>`
        },
    
    showIngresos(p1) {
        const ingresosHTML = p1.ingresos.datos.map((val, id) => {
            return `<tr><td>${val.descripcion} </td> <td>${val.valor}</td></tr>`;
        }).join("");
        
        const egresosHTML = p1.egresos.datos.map((val, id) => {
            const porcentajesHTML = p1.egresos.info.map((infoVal) => {
            return `<td>${infoVal.porcentajes[id]}%</td>`;
            }).join("");
        
            return `<tr>
                    <td>${val.descripcion} </td> 
                    <td>${val.valor}</td>
                    ${porcentajesHTML}
                    <td><button id="btn${id}" class="btn" onclick="deleteData(${id}, ${JSON.stringify(p1)})"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" id="bi2" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button></td>
                    </tr>`;
        }).join("");
        
        return `<div class="ingresos col-12 col-md-6 w-25 p-2">
                    <h2 class="text-info">ENTRADAS</h2>
                    <div class="datoIngreso d-flex  justify-content-between">
                    <table class="table table-striped">
                        <tbody>
                        ${ingresosHTML}
                        </tbody>
                    </table>
                    </div>
                </div>
                <div class="egresos col-12 col-md-6 w-25 p-5+2">
                    <h2 class="text-danger">SALIDAS</h2>
                    <div class="datoIngreso d-flex justify-content-between">
                    <table class="table table-striped">
                    <tbody class="align-middle">
                    ${p1.egresos.datos.map((val, id)=> {return `<tr><td>${val.descripcion} </td> <td>${val.valor}</td>${p1.egresos.info.map((val,id2)=>{return `<td>${val.porcentajes[id]}%</td>`})}<td><button id="btn${id}" class="btn" onclick="deleteData(${id}, ${JSON.stringify(p1)}, this)"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash" id="bi2" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg> </button></td></tr>`}).join("")}
                    </tbody>
                    </table>
                    </div>
                </div>`
    },
    
}
self.addEventListener("message",(e)=>{
    postMessage(wsMyHeader[`${e.data.module}`](e.data.data));
})