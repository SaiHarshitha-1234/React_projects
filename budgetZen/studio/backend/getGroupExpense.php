<?php
session_start();
header("Content-Type: application/json");
include 'config.php';

$group_id = $_GET['group_id'];
$query = "SELECT e.id, e.description, e.amount, e.created_at, u.username AS added_by
          FROM expenses e 
          JOIN users u ON e.added_by = u.id
          WHERE e.group_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $group_id);
$stmt->execute();
$result = $stmt->get_result();

$expenses = [];
while ($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}
echo json_encode($expenses);
?>
