<?php
require 'db.php';
require 'fpdf/fpdf.php';

$group_id = $_GET['group_id'];

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',16);
$pdf->Cell(190,10,"Group Expenses Report",0,1,'C');
$pdf->Ln(10);

$pdf->SetFont('Arial','B',12);
$pdf->Cell(20,10,"ID",1);
$pdf->Cell(70,10,"Description",1);
$pdf->Cell(30,10,"Amount",1);
$pdf->Cell(40,10,"User",1);
$pdf->Cell(30,10,"Date",1);
$pdf->Ln();

$stmt = $pdo->prepare("SELECT e.id, e.description, e.amount, u.username, e.created_at 
                       FROM expenses e 
                       JOIN users u ON e.user_id = u.id 
                       WHERE e.group_id = ?");
$stmt->execute([$group_id]);

$pdf->SetFont('Arial','',12);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $pdf->Cell(20,10,$row['id'],1);
    $pdf->Cell(70,10,$row['description'],1);
    $pdf->Cell(30,10,$row['amount'],1);
    $pdf->Cell(40,10,$row['username'],1);
    $pdf->Cell(30,10,$row['created_at'],1);
    $pdf->Ln();
}

$pdf->Output();
?>
