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
                    ingresos:`+`,
                    egreso:`-`,
                    descripcion:"Agregar Descripción",
                    valor:"valor",
                }
            ]
        }))
    }
}