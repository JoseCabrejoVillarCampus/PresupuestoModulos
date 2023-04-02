import config from "../storage/config.js";
let formulario = document.querySelector("#myForm");

let contIngresos = 0;
let contEgresos = 0; 
let disponible = 0;
let porcentajetotal = 0;
let cuenta = 0;


export default{
    
    show(){

        config.dataMyHeader();
        Object.assign(this, JSON.parse(localStorage.getItem("myHeader")));
        const ws = new Worker("storage/wsMyHeader.js",{type:"module"});
        let count = 0;
        ws.postMessage({module: "showHeader", data : this.contenido});
        ws.postMessage({module: "showIngresos", data : this.contenido});
        let id = ["#head1","#head3"];
        
        ws.addEventListener("message",(e)=>{
            
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            // console.log(doc.body.children);
            
            document.querySelector(id[count]).append(...doc.body.children);
            (id.length-1==count) ? ws.terminate():count++;
        });
        formulario.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));

            if(data.presupuesto == "Ingreso"){
                contIngresos = contIngresos + parseInt(data.valor);
                this.contenido.ingresos.datos.unshift(data);
                this.contenido.ingresos.contador = contIngresos;
                    
            }else{
                contEgresos = contEgresos - parseInt(data.valor);
                
                // console.log(this.contenido.egresos.info);
                
                let calculoPorcentajes = "";
                
                this.contenido.egresos.info.map((val,id)=>{
                    val.porcentajes = [];
                    val.datos.unshift(data.valor)
                    cuenta = 0;
                    val.datos.map((val2,id)=>{
                        calculoPorcentajes = parseInt(-(parseInt(val2)*100)/contEgresos);
                        val.porcentajes.push(calculoPorcentajes);
                        cuenta++
                    })
                })
                
                
                this.contenido.egresos.datos.unshift(data);
                this.contenido.egresos.contador = contEgresos;  
                
                
            };
        
        disponible = contIngresos - (-contEgresos);
        this.contenido.contador = disponible;
        porcentajetotal = -(100*contEgresos)/contIngresos;
        this.contenido.egresos.porcentaje = parseInt(porcentajetotal);
        formulario.reset();
        
        const ws = new Worker("storage/wsMyHeader.js", {type:"module"});
        let count = 0;
        ws.postMessage({module: "showHeader", data : this.contenido});
        ws.postMessage({module: "showIngresos", data : this.contenido});
        let id = ["#head1","#head3"];
        
        ws.addEventListener("message", (e)=>{
            
            document.querySelector(id[count]).innerHTML = e.data;
            (id.length-1==count) ? ws.terminate() : count++;
        })


        

        // for (let i = 0; i < cuenta; i++) {
        //     console.log("esta es mi cuenta",cuenta);
        //     console.log(i);
        //         console.log(`#btn${i}`);
        //         let botones = document.querySelector(`#btn${i}`);//estoy llamando del documento algo que no existe, ya que lo creo en el worker, debe haber alguna forma de enlazarlos, por eso es Null
        //         console.log(botones);
        //         botones.addEventListener("click", (e)=>{
        //             console.log(`hey, le di click al ${i} `);
        //             /* this.contenido.egresos.delete.datos[i]; */
        //             console.log(this.contenido.egresos.datos);
        //         })
        //     }
        
        })
        
    },
}
