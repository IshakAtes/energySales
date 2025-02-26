<?php
header('Content-Type: application/json');

$allowed_origins = ["https://dealcheckers.de", "https://www.dealcheckers.de"];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, responseType");
}

// Preflight-Anfragen behandeln
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// JSON-Daten einlesen
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Ungültige Eingabedaten']);
    exit();
}

// Daten validieren und absichern
$name = htmlspecialchars($data['name'] ?? '');
$lastName = htmlspecialchars($data['lastName'] ?? '');
$phoneNumber = htmlspecialchars($data['phoneNumber'] ?? '');
$power = htmlspecialchars($data['power'] ?? '');
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$consume = htmlspecialchars($data['consume'] ?? '');
$feedback = htmlspecialchars($data['feedback'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Ungültige E-Mail-Adresse']);
    exit();
}

// E-Mail-Versand
$to = 'office@dealcheckers.de';
$subject = 'Neue Kontaktanfrage';
$message = "Vorname: $name\n";
$message .= "Nachname: $lastName\n";
$message .= "Telefon: $phoneNumber\n";
$message .= "Verbrauchsart: $power\n";
$message .= "E-Mail: $email\n";
$message .= "Verbrauch: $consume\n";
$message .= "Bemerkung: $feedback\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['status' => 'success', 'message' => 'E-Mail erfolgreich versendet']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'E-Mail konnte nicht gesendet werden']);
}
?>
