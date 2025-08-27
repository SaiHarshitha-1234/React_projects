<?php
// Database configuration
$host = "localhost";   // XAMPP default
$user = "root";        // MySQL default user
$pass = "";            // MySQL default password
$db   = "digivillage_db";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
