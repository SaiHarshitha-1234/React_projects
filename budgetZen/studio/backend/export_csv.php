<?php
require 'db.php';

$group_id = $_GET['group_id'];

header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename="expenses.csv"');

$output = fopen("php://output", "w");
fputcsv($output, ["ID", "Description", "Amount", "User", "Date"]);

$stmt = $pdo->prepare("SELECT e.id, e.description, e.amount, u.username, e.created_at 
                       FROM expenses e 
                       JOIN users u ON e.user_id = u.id 
                       WHERE e.group_id = ?");
$stmt->execute([$group_id]);

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    fputcsv($output, $row);
}

fclose($output);
exit;
?>
