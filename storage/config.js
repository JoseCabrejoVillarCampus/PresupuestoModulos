export default{
    dataMyHeader(){
        localStorage.setItem("myHeader", JSON.stringify({
            presupuesto:[
                {
                    title:"Presupuesto Disponible",
                    monto:"$",
                    ingresos:"",
                    egresos:""
                }
            ],
            formulario:[
                {
                    title:"Ingresos o Egresos",
                    ingresos:[{
                        descripcion:"Agregar Descripción",
                        valor:"valor",
                    }],
                    egresos:[{
                        descripcion:"Agregar Descripción",
                        valor:"valor",
                    }],
                }
            ],
            table:[
                {
                  camp:[{
                    titulo1:[
                        {name:"INGRESOS"},
                    ],
                    primer:[
                        {name:""},
                        {name:""},
                        {name:""},
                    ],
                    titulo2:[
                        {name:"EGRESOS"},
                    ],
                    segundo:[
                        {name:""},
                        {name:""},
                        {name:""},
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