let wsMyHeader={
    showHeader(p1){
        let plantilla = "";
        p1.forEach((val,id)=>{
            plantilla += `<section class="w-50 text-center pt-4 pb-5">
            <h1 class="text-white">${val.title}</h1>
            <h2 class="pt-4 pb-4 text-white">${val.monto}</h2>
            <h3 class="pt-4 pb-4 ingresos text-white sec1"  > INGRESOS <a> ${val.ingresos}</a></h3>
            <h3 class="pt-4 pb-4 egresos text-white sec2" > EGRESOS <a>  ${val.egresos}</a><a> %</a></h3>
        </section>`
        });
        return plantilla;
    },
    showForm(p2){
        let plantilla2="";
        p2.forEach((val,id)=>{
            plantilla2 += `<form>
            <section class="d-flex justify-content-center pb-4 pt-4">
              <select class="form-select mx-2 py-3" style="width: fit-content;">
                  <option selected>${val.title}</option>
                  <option value="1">${val.ingresos}</option>
                  <option value="2">${val.egresos}</option>
                </select>
              <input class="form-control form-control mx-2 py-3" style="width: 25%" type="text" placeholder="${val.descripcion}">
              <input class="form-control form-control mx-2 py-3" style="width: 7%" type="text" placeholder="${val.valor}">
              <input type="submit" value="Guardar">
          </section>
          </form>`
        });
        return plantilla2;
    },
    
    
}
self.addEventListener("message",(e)=>{
    postMessage(wsMyHeader[`${e.data.module}`](e.data.data));
})