const apiUrl = "http://localhost/app-javascript-fetch/api.php"; // Cambia esto según tu ruta

// Función GET
async function getData() {
    try {
        const response = await fetch(`${apiUrl}?id=123`, {
            method: "GET",
        });
        const data = await response.json();
        console.log("GET Response:", data);
    } catch (error) {
        console.error("Error in GET:", error);
    }
}

// Función POST
async function postData() {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "John", age: 30 }),
        });
        const data = await response.json();
        console.log("POST Response:", data);
    } catch (error) {
        console.error("Error in POST:", error);
    }
}

// Función PUT
async function putData() {
    try {
        const response = await fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: 123, update: "new value" }),
        });
        const data = await response.json();
        console.log("PUT Response:", data);
    } catch (error) {
        console.error("Error in PUT:", error);
    }
}

// Función DELETE
async function deleteData() {
    try {
        const response = await fetch(`${apiUrl}?id=123`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log("DELETE Response:", data);
    } catch (error) {
        console.error("Error in DELETE:", error);
    }
}

// // Llama a las funciones
// getData();
// postData();
// putData();
// deleteData();

// Elementos del DOM
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');

// API URL
const API_URL = 'https://yesno.wtf/api';

// Función para agregar mensajes al chat
function addMessage(text, isUser = true, image = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'api-message');

    // Remover "Tú:" y "Bot:" del texto para un diseño más limpio
    const cleanText = text.replace(/^(Tú: |Bot: )/, '');
    messageDiv.textContent = cleanText;

    if (image) {
        const img = document.createElement('img');
        img.src = image;
        messageDiv.appendChild(img);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Manejar el envío del formulario
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) return;

    // Mostrar mensaje del usuario
    addMessage(message, true);
    messageInput.value = '';

    try {
        // Obtener respuesta de la API
        const response = await fetch(API_URL);
        const data = await response.json();

        // Mostrar respuesta
        addMessage(data.answer.toUpperCase(), false, data.image);

    } catch (error) {
        addMessage('Error: No se pudo obtener una respuesta', false);
        console.error('Error:', error);
    }
});

// Mensaje inicial
addMessage('¡Hola! Hazme una pregunta de sí o no', false);