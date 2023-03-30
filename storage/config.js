export default{
    dataMyHeader(){
        localStorage.setItem("myHeader", JSON.stringify({
            presupuesto:[
                {
                    title:"Presupuesto Disponible",
                    monto:`$`,
                    ingresos:"100",
                    egresos:"100"
                }
            ],
            formulario:[
                {
                    title:"Ingresos o Egresos",
                    ingresos:`Entrada de Dinero`,
                    egresos:`Salida de Dinero`,
                    descripcion:"Agregar Descripción",
                    valor:"valor",
                }
            ],
            table:[
                {
                  camp:[{
                    titulo1:[
                        {name:"INGRESOS"},
                    ],
                    primer:[
                        {name:"servicios"},
                        {name:"total"},
                        {name:"%"},
                    ],
                    titulo2:[
                        {name:"EGRESOS"},
                    ],
                    segundo:[
                        {name:"internet"},
                        {name:"total"},
                        {name:"%"},
                    ],
                    },
                  ],
                //   camp2:[{
                    
                //     },
                //   ]
                }
              ],
        }))
    }
}