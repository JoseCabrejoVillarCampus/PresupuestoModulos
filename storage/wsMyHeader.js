let wsMyHeader={
    showHeader(p1){
        let plantilla = "";
        p1.forEach((val,id)=>{
            plantilla += `<section class="text-center pt-4 pb-5">
            <h1 class="text-white">${val.title}</h1>
            <h2 class="pt-4 pb-4 text-white">${val.monto}</h2>
            <h3 class="pt-4 pb-4 ingresos text-white sec1"  > INGRESOS <a> ${val.ingresos}</a></h3>
            <h3 class="pt-4 pb-4 egresos text-white sec2" > EGRESOS <a>  ${val.egresos}</a><a> %</a></h3>
        </section>`
        });
        return plantilla;
    }
    
}
self.addEventListener("message",(e)=>{
    postMessage(wsMyHeader[`${e.data.module}`](e.data.data));
})