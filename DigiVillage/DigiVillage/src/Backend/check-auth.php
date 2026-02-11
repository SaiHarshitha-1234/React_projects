<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'db-connect.php';
session_start();
header('Content-Type: application/json');

$response = [
    'success' => false,
    'message' => 'Not authenticated',
    'user' => null
];

if (isset($_SESSION['user_id'])) {
    $response = [
        'success' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'] ?? 'User'
        ]
    ];
}

echo json_encode($response);


?>