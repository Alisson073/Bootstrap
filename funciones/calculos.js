function calcularBtn(){
    //obtener el valor del input
    const input=document.getElementById("arrayInput").value;
    //convertir el string a un array de numeros
    //-split(",") separa por comas el string
    //-trim.- elimina los espacion
    //parse convertir a numero
    const numero = input.split(",").map(num => parseFloat(num.trim()));

    //para presentar el resultado
    const resultado = document.getElementById("resultado");

    //logica
    //verificar si son exactamente 10 numeros
    //verificar si algun elemento no es un numero
    if(numero.length !== 10 || numero.some(isNaN)){
        //cambiar el div -alerta
        resultado.className = "alert alert-danger";
        //mensaje de error
        resultado.textContent = "Por favor, ingrese exactamente 10 números separados por comas.";
    }
        // Verificar si está vacío
    if (input === "") {
        resultado.textContent = "El campo no puede estar vacío.";
        return;
    }

    // Validar que todos sean números válidos (sin letras ni caracteres extraños)
    const numeros = [];

    for (let i = 0; i < valores.length; i++) {
        const valor = valores[i];
    }        

//calcular
//const suma=numero.reduce((a,b) => a + b, 0);
//calculo manual usando for
 let suma = 0;
for(let i = 0; i < numero.length; i++){
    suma += numero[i];
 }


//mostrar el resultado
resultado.textContent = `La suma de los números es: ${suma}`;
}

//####################EJERCICIO1######################################################
function sumarVectores() {
  const vectorAInput = document.getElementById("vectorA").value.trim();
  const vectorBInput = document.getElementById("vectorB").value.trim();
  const resultado = document.getElementById("resultado");

  // Validar que solo contenga números y comas, sin puntos ni letras
  const formatoValido = /^(\d+(,\d+)*)?$/;

  if (!formatoValido.test(vectorAInput) || !formatoValido.test(vectorBInput)) {
    mostrarError("Solo se permiten números enteros separados por comas. No se permiten puntos, letras ni símbolos.");
    return;
  }

  const A = vectorAInput.split(",").map(x => parseInt(x.trim()));
  const B = vectorBInput.split(",").map(x => parseInt(x.trim()));

  if (A.length !== B.length) {
    mostrarError("Ambos vectores deben tener la misma cantidad de elementos.");
    return;
  }

  if (A.some(isNaN) || B.some(isNaN)) {
    mostrarError("Todos los elementos deben ser números enteros válidos.");
    return;
  }

  const C = A.map((valor, index) => valor + B[index]);

  resultado.className = "alert alert-success";
  resultado.textContent = `Vector resultante C: [ ${C.join(", ")} ]`;
  resultado.classList.remove("d-none");
}

function mostrarError(mensaje) {
  const resultado = document.getElementById("resultado");
  resultado.className = "alert alert-danger";
  resultado.textContent = mensaje;
  resultado.classList.remove("d-none");
}
//####################EJERCICIO2######################################################
function generarCampos() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const formulario = document.getElementById("formularioAlumnos");
  const botonProcesar = document.getElementById("btnProcesar");
  const resultado = document.getElementById("resultado");

  formulario.innerHTML = "";
  resultado.classList.add("d-none");

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingrese una cantidad válida de alumnos.");
    return;
  }

  // Generar campos de nombre y promedio
  for (let i = 0; i < cantidad; i++) {
    formulario.innerHTML += `
      <div class="mb-3">
        <label class="form-label">Alumno ${i + 1}</label>
        <input type="text" class="form-control mb-2" id="nombre${i}" placeholder="Nombre del alumno ${i + 1}" required>
        <input type="text" class="form-control" id="promedio${i}" placeholder="Promedio del alumno ${i + 1}" required>
      </div>
    `;
  }

  botonProcesar.classList.remove("d-none");
}

function procesarAlumnos() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const nombres = [];
  const promedios = [];
  const resultado = document.getElementById("resultado");

  // Validar expresión regular solo para números positivos (enteros o decimales)
  const regexPromedio = /^\d+(\.\d+)?$/;

  for (let i = 0; i < cantidad; i++) {
    const nombre = document.getElementById(`nombre${i}`).value.trim();
    const promedioInput = document.getElementById(`promedio${i}`).value.trim();

    if (!nombre || promedioInput === "") {
      alert(`Faltan datos válidos para el alumno ${i + 1}`);
      return;
    }

    // Validar que el promedio sea un número positivo válido
    if (!regexPromedio.test(promedioInput)) {
      alert(`El promedio ingresado para el alumno ${i + 1} no es válido. Solo se permiten números positivos (sin letras ni símbolos).`);
      return;
    }

    const promedio = parseFloat(promedioInput);

    // Asegurarse de que no sea negativo (por si acaso)
    if (promedio < 0) {
      alert(`El promedio del alumno ${i + 1} no puede ser negativo.`);
      return;
    }

    nombres.push(nombre);
    promedios.push(promedio);
  }

  // Combinar y ordenar
  const combinados = nombres.map((nombre, index) => ({
    nombre: nombre,
    promedio: promedios[index],
  }));

  combinados.sort((a, b) => b.promedio - a.promedio);

  // Mostrar resultado
  let salida = `<strong>Alumnos ordenados por promedio (mayor a menor):</strong><ul>`;
  combinados.forEach(alumno => {
    salida += `<li>${alumno.nombre}: ${alumno.promedio}</li>`;
  });
  salida += `</ul>`;

  resultado.className = "alert alert-info";
  resultado.innerHTML = salida;
  resultado.classList.remove("d-none");
}
//####################EJERCICIO3######################################################
// Lista de frutas
const frutas = [
  "Manzana", "Plátano", "Naranja", "Pera", "Sandía",
  "Mango", "Melón", "Uva", "Fresa", "Kiwi"
];

// Al cargar la página, generar los campos del formulario
window.onload = () => {
  const formulario = document.getElementById("formularioInventario");
  formulario.innerHTML = "";

  frutas.forEach((fruta, i) => {
    formulario.innerHTML += `
      <div class="mb-3">
        <strong>${fruta}</strong>
        <div class="row mt-2">
          <div class="col-md-6">
            <label for="existencia${i}" class="form-label">Existencia</label>
            <input type="number" class="form-control" id="existencia${i}" min="0" value="0">
          </div>
          <div class="col-md-6">
            <label for="pedido${i}" class="form-label">Pedido</label>
            <input type="number" class="form-control" id="pedido${i}" min="0" value="0">
          </div>
        </div>
      </div>
    `;
  });
};

function calcularCompras() {
  const resultado = document.getElementById("resultado");
  let salida = `<strong>Resultado del stock requerido:</strong><ul>`;

  for (let i = 0; i < frutas.length; i++) {
    const existencia = parseFloat(document.getElementById(`existencia${i}`).value);
    const pedido = parseFloat(document.getElementById(`pedido${i}`).value);

    if (isNaN(existencia) || isNaN(pedido) || existencia < 0 || pedido < 0) {
      resultado.className = "alert alert-danger";
      resultado.innerHTML = `Por favor, ingresa solo números válidos y positivos para <strong>${frutas[i]}</strong>.`;
      resultado.classList.remove("d-none");
      return;
    }

    let stock = 0;
    if (existencia === pedido) {
      stock = existencia;
    } else if (pedido > existencia) {
      stock = 2 * (pedido - existencia);
    } else {
      stock = pedido;
    }

    salida += `<li>${frutas[i]}: Se deben comprar <strong>${stock}</strong> unidades</li>`;
  }

  salida += `</ul>`;
  resultado.className = "alert alert-success";
  resultado.innerHTML = salida;
  resultado.classList.remove("d-none");
}
