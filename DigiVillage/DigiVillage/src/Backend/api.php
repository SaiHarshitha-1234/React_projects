<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "digivillage";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// GET all updates
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT message FROM updates ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    $updates = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $updates[] = $row["message"];
        }
    }
    
    echo json_encode($updates);
}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  // Store the English message
  file_put_contents('updates.txt', $data['message']."\n", FILE_APPEND);
  echo json_encode(['success' => true]);
}

// POST a new update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $message = $data['message'];
    
    $stmt = $conn->prepare("INSERT INTO updates (message) VALUES (?)");
    $stmt->bind_param("s", $message);
    
    if ($stmt->execute()) {
        // Return all updates including the new one
        $sql = "SELECT message FROM updates ORDER BY created_at DESC";
        $result = $conn->query($sql);
        
        $updates = array();
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $updates[] = $row["message"];
            }
        }
        
        echo json_encode($updates);
    } else {
        echo json_encode(["error" => "Failed to add update"]);
    }
    
    $stmt->close();
}

$conn->close();
?>