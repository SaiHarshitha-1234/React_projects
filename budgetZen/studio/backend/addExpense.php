<?php
session_start();
header("Content-Type: application/json");
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$group_id = $data['group_id'];
$description = $data['description'];
$amount = $data['amount'];
$user_id = $_SESSION['user_id'];
$splits = $data['splits']; // array of {user_id, share}

$stmt = $conn->prepare("INSERT INTO expenses (group_id, added_by, description, amount) VALUES (?, ?, ?, ?)");
$stmt->bind_param("iisd", $group_id, $user_id, $description, $amount);

if ($stmt->execute()) {
    $expense_id = $stmt->insert_id;
    foreach ($splits as $split) {
        $splitStmt = $conn->prepare("INSERT INTO expense_splits (expense_id, user_id, share) VALUES (?, ?, ?)");
        $splitStmt->bind_param("iid", $expense_id, $split['user_id'], $split['share']);
        $splitStmt->execute();
    }
    echo json_encode(["status"=>"success","message"=>"Expense added"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to add expense"]);
}
?>
