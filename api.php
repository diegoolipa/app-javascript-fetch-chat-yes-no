<?php
// Configuración de los encabezados
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Methods");

// Determina el método HTTP
$method = $_SERVER['REQUEST_METHOD'];
// var_dump($method);
// Respuestas simuladas
$response = [];

switch ($method) {
    case 'GET':
        $response = ['message' => 'GET request successful!', 'data' => $_GET];
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $response = ['message' => 'POST request successful!', 'data' => $data];
        break;
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $response = ['message' => 'PUT request successful!', 'data' => $data];
        break;
    case 'DELETE':
        $response = ['message' => 'DELETE request successful!',  'data' => $_GET];
        break;
    default:
        http_response_code(405); // Método no permitido
        $response = ['message' => 'Method not allowed'];
        break;
}

// Envía la respuesta en formato JSON
echo json_encode($response);
