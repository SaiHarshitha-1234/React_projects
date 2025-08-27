<?php
require 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

$group_id = $_GET['group_id'];

try {
    $stmt = $pdo->prepare("SELECT e.id, e.description, e.amount, e.created_at, u.username 
                           FROM expenses e 
                           JOIN users u ON e.user_id = u.id 
                           WHERE e.group_id = ? 
                           ORDER BY e.created_at DESC");
    $stmt->execute([$group_id]);

    $expenses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($expenses);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
