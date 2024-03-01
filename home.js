import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"
const API_KEY = "API_KEY"
const MODEL_IA = "gemini-pro"

async function generarContenido(promptText) {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY)
        const model = genAI.getGenerativeModel({ model: MODEL_IA })
        const prompt = promptText
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = await response.text()
        console.log(text)
        document.getElementById("resultPrompt").textContent = text
    } catch (error) {
        console.error("Error al generar contenido:", error)
    }
}

function mostrarChecks(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtenemos el tema seleccionado
    let temaSeleccionado = document.querySelector('input[name="tema"]:checked');
    let tema = temaSeleccionado ? temaSeleccionado.labels[0].innerText : '';

    // Obtenemos los personajes seleccionados
    var listaPersonajes = Array.from(document.querySelectorAll('#personajes input[type="checkbox"]:checked'));

    // Obtenemos los textos de las etiquetas asociadas a los checkboxes marcados
    var personajesSeleccionados = listaPersonajes.map(function (checkbox) {
        return checkbox.labels[0].innerText;
    });
    let personajes = personajesSeleccionados.join(', ');

    // Obtenemos la duración seleccionada
    let duracionSeleccionada = document.querySelector('input[name="duracion"]:checked');
    let duracion = duracionSeleccionada ? duracionSeleccionada.value : '';

    // Obtenemos el texto del textarea
    let descripcion = document.getElementById('exampleFormControlTextarea1').value;

    // Mostramos los resultados
    let resultado = "Tema: " + tema + "\nPersonajes: " + personajes + "\nDuración: " + duracion + "\nDescripción: " + descripcion;

    document.getElementById('resultPrompt').innerText = resultado;
    console.log(resultado)

    return { "tema": tema, "personajes": personajes, "duracion": duracion, "descripcion": descripcion, }
}

function generarCuento(event) {
    const checks = mostrarChecks(event)
    console.log(checks)

    let promptText = `Quiero crees un cuento infantil con estos requisitos: | Tema: ${checks.tema}. Personajes: ${checks.personajes} |Se debe tratar de lo siguiente: ${checks.descripcion} | El contenido del cuento debe dividirse en ${checks.duracion} párrafos y cada párrafo debe tener de longitud una oración, así mismo cada párrafo será una escena diferente que compone el cuento. Además debe ser un cuento completo, es decir, debe contener Inicio, Desarrollo, Clímax y Desenlace. Solo entrégame párrafos separados sin subtítulos.`

    console.log(promptText)

    generarContenido(promptText)
}

const btnCrearCuento = document.querySelector("#btnCrearCuento")
btnCrearCuento.addEventListener("click", generarCuento)