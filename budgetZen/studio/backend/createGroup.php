<?php
session_start();
header("Content-Type: application/json");
include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$group_name = $data['group_name'];
$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("INSERT INTO groups (group_name, created_by) VALUES (?, ?)");
$stmt->bind_param("si", $group_name, $user_id);
if ($stmt->execute()) {
    $group_id = $stmt->insert_id;
    $conn->query("INSERT INTO group_members (group_id, user_id) VALUES ($group_id, $user_id)");
    echo json_encode(["status"=>"success","message"=>"Group created","group_id"=>$group_id]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to create group"]);
}
?>
