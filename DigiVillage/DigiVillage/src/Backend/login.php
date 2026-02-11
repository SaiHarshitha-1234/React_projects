<?php

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

$response = array();

if(isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;
    
    // Find user by email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if($user && password_verify($password, $user['password'])) {
        // Generate a simple token (in production, use JWT or similar)
        $token = bin2hex(random_bytes(16));
        
        // Store token in database (optional)
        $stmt = $pdo->prepare("UPDATE users SET token = ? WHERE id = ?");
        $stmt->execute([$token, $user['id']]);
        
        $response['success'] = true;
        $response['message'] = 'Login successful';
        $response['token'] = $token;
        $response['user'] = [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ];
    } else {
        $response['success'] = false;
        $response['message'] = 'Invalid email or password';
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Please provide email and password';
}

echo json_encode($response);




/*
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include 'db_connect.php';

// Start session
session_start();

$data = json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;
    
    // Find user by email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if($user && password_verify($password, $user['password'])) {
        // Regenerate session ID for security
        session_regenerate_id(true);
        
        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name'] = $user['name'];
        
        // Generate a secure session token
        $sessionToken = bin2hex(random_bytes(32));
        $expiry = date('Y-m-d H:i:s', time() + 86400); // 1 day expiry
        
        // Store session in database (using separate sessions table)
        $stmt = $pdo->prepare("INSERT INTO sessions (user_id, session_token, session_expiry) VALUES (?, ?, ?)");
        $stmt->execute([$user['id'], $sessionToken, $expiry]);
        
        // Set secure HTTP-only cookie
        $sessionParams = session_get_cookie_params();
        setcookie(
            'PHPSESSID',
            session_id(),
            [
                'expires' => time() + 86400, // 1 day
                'path' => $sessionParams['path'],
                'domain' => $sessionParams['domain'],
                'secure' => true, // Only over HTTPS in production
                'httponly' => true,
                'samesite' => 'Strict'
            ]
        );
        
        $response['success'] = true;
        $response['message'] = 'Login successful';
        $response['user'] = [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ];
        
        // No longer sending token to client
        unset($response['token']);
    } else {
        $response['success'] = false;
        $response['message'] = 'Invalid email or password';
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Please provide email and password';
}

echo json_encode($response);
*/
?>
