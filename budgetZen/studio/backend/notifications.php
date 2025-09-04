<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php"; // your DB connection file

$action = $_GET['action'] ?? '';

switch ($action) {

    // 1️⃣ Add new notification
    case 'add':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['user_id']) || !isset($data['message'])) {
            echo json_encode(["status" => "error", "message" => "Invalid input"]);
            exit;
        }

        $user_id = $data['user_id'];
        $message = $data['message'];

        $stmt = $conn->prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)");
        $stmt->bind_param("is", $user_id, $message);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Notification added"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }

        break;

    // 2️⃣ Get all notifications for a user
    case 'get':
        if (!isset($_GET['user_id'])) {
            echo json_encode(["status" => "error", "message" => "User ID required"]);
            exit;
        }

        $user_id = intval($_GET['user_id']);
        $stmt = $conn->prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $notifications = [];
        while ($row = $result->fetch_assoc()) {
            $notifications[] = $row;
        }

        echo json_encode(["status" => "success", "notifications" => $notifications]);
        break;

    // 3️⃣ Mark a notification as read
    case 'mark':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!isset($data['id'])) {
            echo json_encode(["status" => "error", "message" => "Notification ID required"]);
            exit;
        }

        $id = intval($data['id']);
        $stmt = $conn->prepare("UPDATE notifications SET is_read = 1 WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Notification marked as read"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }

        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid action"]);
}


/*   polling notifications
<?php
require "db.php"; requireLogin();
$userId = $_SESSION['user_id'];
$sinceId = isset($_GET['sinceId']) ? (int)$_GET['sinceId'] : 0;

$stmt = $pdo->prepare("SELECT id, kind, message, ref_id, created_at
                       FROM notifications
                       WHERE user_id=? AND id > ?
                       ORDER BY id ASC LIMIT 50");
$stmt->execute([$userId, $sinceId]);
$rows = $stmt->fetchAll();

echo json_encode(["ok"=>true, "items"=>$rows, "lastId" => count($rows) ? end($rows)['id'] : $sinceId]);

*/


?>
