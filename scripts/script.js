

// 1- paso 
let formulario = document.querySelector('#formulario')
let citas = []

const btnLimpiar = document.querySelector('#btnLimpiar')

btnLimpiar.addEventListener('click', e => {
    formulario.reset()
})


//prevenir el formulario
formulario.addEventListener('submit', e => {
    e.preventDefault()
    capturaDatos()
})

//una funcion 
const capturaDatos = () => {

    let nombre = document.getElementById('nombre').value
    let fecha = document.getElementById('fecha').value
    let hora = document.getElementById('hora').value
    let sintomas = document.getElementById('sintomas').value

    if (nombre == "" || fecha == "" || hora == "" || sintomas == ""){
        swal({
            title: "Error!",
            text: "¡Debe llenar todos los campos!",
            icon: "error",
        });
    }
    else{
        let registrarCita = {
            id: Math.round(Math.random() * (100 - 1) + 1),
            nombre,
            fecha,
            hora,
            sintomas
    
        }
        console.log(registrarCita)
    }

   


    const key = JSON.parse(localStorage.getItem('Citas'))

    if (key !== null) {
        key.unshift(registrarCita)
        localStorage.setItem('Citas', JSON.stringify(key)) //valido info del localStorage
    }
    else {
        citas.unshift(registrarCita)
        localStorage.setItem('Citas', JSON.stringify(citas)) //envio para que lo guarde
    }
    getLocalStorage()
}


// 2 listar

let listarCitas = document.getElementById('listarCita')

const getLocalStorage = () => {
    listarCitas.innerHTML = ''
    let traerCitaLocalStorage = JSON.parse(localStorage.getItem('Citas')) 

    traerCitaLocalStorage.map(cita => {
        const { id, nombre, fecha, hora, sintomas } = cita

        listarCitas.innerHTML += `
          <td>${nombre}</td>
          <td>${fecha}</td>
          <td>${hora}</td>
          <td>${sintomas}</td>
          <td><button id=${id} class= "btn btn-danger">Delete</button></td>
        `
    })


}

//3 cargan el dom

document.addEventListener('DOMContentLoaded', getLocalStorage)

//4    al boton de borrar
listarCitas.addEventListener('click', e => {
    console.log(e)

    const btnDelete = e.target.classList.contains('btn-danger') //info del boton

    const id = e.target.id

    const local = JSON.parse(localStorage.getItem('Citas')) // otiene los item em local
    // Ana id 3 / yudith  20/ maria 5

    const buscar = local.find(data => data.id === Number(id)) //me trae el id y me regresa todo el objeto

    //eliminar posicion del arreglo ocn la posicion del arreglo //compara y suscribe la data

    if (btnDelete) {
        local.forEach((elemet, index) => {  //el elemneto y posicion del arreglo
            if (elemet.id === buscar.id) {
                local.splice(index, 1) //local me borre lo que esta en esa posicion
                // ana / maria
                localStorage.setItem('Citas', JSON.stringify(local)) //actualiza la lista y lo quito
                getLocalStorage()
            }
        })
    }


})

// 5- la busqueda por nombre

let btnBuscar = document.getElementById('btnBuscar')
let buscarNombre = document.getElementById('busqueda')

btnBuscar.addEventListener('click', e =>{
    e.preventDefault()

    let input = document.getElementById('inputBuscar').value
    let data = JSON.parse(localStorage.getItem('Citas'))

    let filtro = data.filter(datos=> datos.nombre.toLowerCase().includes(input.toLowerCase()))
    console.log(filtro)

    buscarNombre.innerHTML=''
    filtro.length ===0 ?
            buscarNombre.innerHTML+= `<div>El nombre ${input} No existe</div>`
     :
     filtro.map(cita =>{
         const {nombre, fecha, hora, sintomas} = cita

         buscarNombre.innerHTML+=`
         <div>
        <div> <h1>${nombre}</h1></div>
         <div>
         <h3>${fecha}</h3>
         <h3>${hora}</h3>
         </div>
         <h3>${sintomas}</h3>
         </div>
         `
     })     


})




