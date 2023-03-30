export default{
    dataMyHeader(){
        localStorage.setItem("myHeader", JSON.stringify({
            presupuesto:[
                {
                    tilte:"Presupuesto Disponible",
                    monto:`$`,
                    ingresos:"100",
                    egresos:""
                }
            ]
        }))
    }
}