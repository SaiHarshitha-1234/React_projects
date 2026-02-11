<?php
include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"));

$response = array();

if(isset($data->name) && isset($data->email) && isset($data->password)) {
    $name = $data->name;
    $email = $data->email;
    $password = password_hash($data->password, PASSWORD_BCRYPT);
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if($user) {
        $response['success'] = false;
        $response['message'] = 'Email already registered';
    } else {
        // Insert new user
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        if($stmt->execute([$name, $email, $password])) {
            $response['success'] = true;
            $response['message'] = 'Registration successful! Please login.';
        } else {
            $response['success'] = false;
            $response['message'] = 'Registration failed';
        }
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Please fill all required fields';
}

echo json_encode($response);
?>
