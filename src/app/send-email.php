<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://dealcheckers.de');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, responseType');
// Preflight-Anfragen behandeln
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents('php://input'), true);
$to = 'office@dealcheckers.de';
$subject = 'Neue Kontaktanfrage';
$message = "Vorname: {$data['name']}\n";
$message .= "Nachname: {$data['lastName']}\n";
$message .= "Telefon: {$data['phoneNumber']}\n";
$message .= "Verbrauchsart: {$data['power']}\n";
$message .= "E-Mail: {$data['email']}\n";
$message .= "Verbrauch: {$data['consume']}\n";
$message .= "Bemerkung: {$data['feedback']}\n";
$headers = "From: {$data['email']}\r\n";
$headers .= "Reply-To: {$data['email']}\r\n";
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'E-Mail erfolgreich versendet']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'E-Mail konnte nicht gesendet werden']);
}
?>