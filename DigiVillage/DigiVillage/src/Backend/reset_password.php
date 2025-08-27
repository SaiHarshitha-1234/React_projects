<?php
header("Content-Type: application/json");
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$email       = $data["email"];
$newPassword = password_hash($data["newPassword"], PASSWORD_BCRYPT);

// Check if user exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Update password
    $update = $conn->prepare("UPDATE users SET password=? WHERE email=?");
    $update->bind_param("ss", $newPassword, $email);
    if ($update->execute()) {
        echo json_encode(["status" => "success", "message" => "Password reset successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Password reset failed"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}
?>
