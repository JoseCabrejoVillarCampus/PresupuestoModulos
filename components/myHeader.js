import config from "../storage/config.js";
export default{
    show(){

        config.dataMyHeader();
        Object.assign(this, JSON.parse(localStorage.getItem("myHeader")));

        const ws = new Worker("storage/wsMyHeader.js",{type:"module"});

        //enviamos un mensaje el worker
        ws.postMessage({module: "showHeader", data : this.presupuesto});
        let id = ["#head1"];
        let count = 0;
        //esto es lo que llega del worker
        ws.addEventListener("message",(e)=>{

            //estamos parseando lo que trae el evento (mensaje)
            let doc = new DOMParser().parseFromString(e.data, "text/html");
            console.log(doc.body.children);
            
            //insertamos en nuestro index, en el selector #pingPongItems
            document.querySelector(id[count]).append(...doc.body.children);

            //finalizamos el worker
            (id.length-1==count) ? ws.terminate():count++;
        });
    }
}