<?php
require 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

// Input: group_id, from_user, to_user, amount
$data = json_decode(file_get_contents("php://input"), true);

$group_id = $data['group_id'];
$from_user = $data['from_user'];
$to_user = $data['to_user'];
$amount = $data['amount'];

if (!$group_id || !$from_user || !$to_user || !$amount) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit;
}

try {
    // Insert a record into settlements
    $stmt = $pdo->prepare("INSERT INTO settlements (group_id, from_user, to_user, amount) 
                           VALUES (?, ?, ?, ?)");
    $stmt->execute([$group_id, $from_user, $to_user, $amount]);

    echo json_encode(["status" => "success", "message" => "Debt settled successfully"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
