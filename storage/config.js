export default{
    dataMyHeader(){
        localStorage.setItem("myHeader", JSON.stringify({
            contenido:{     
                contador: "",

                ingresos: {                 
                    contador: 
                    "",
                    datos: [
        
                    ]
                    
                },
                egresos: {
                    contador: "",
                    porcentaje: "",
                    
                    info:[{
                        datos:[
                            
                        ],
                        porcentajes: [

                        ]
                    }   
                    ],
                    datos: [
                    ]
                }
            },
        }))
    }
}