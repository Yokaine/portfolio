<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ContactController extends AbstractController
{
    #[Route('/api/contact', name: 'api_contact', methods: ['POST'])]
    public function send(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!is_array($data)) {
            return new JsonResponse(['error' => 'Requête invalide.'], 400);
        }
        if (!empty($data['website'])) {
            return new JsonResponse(['ok' => true], 201);
        }

        $name = trim((string) ($data['name'] ?? ''));
        $email = trim((string) ($data['email'] ?? ''));
        $message = trim((string) ($data['message'] ?? ''));

        if ($name === '' || mb_strlen($name) > 100) {
            return new JsonResponse(['error' => 'Indique ton nom (100 caractères maximum).'], 422);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse(['error' => 'Cette adresse email n\'est pas valide.'], 422);
        }
        if (mb_strlen($message) < 10 || mb_strlen($message) > 2000) {
            return new JsonResponse(['error' => 'Le message doit contenir entre 10 et 2000 caractères.'], 422);
        }
        $line = json_encode([
            'date' => date('c'),
            'name' => $name,
            'email' => $email,
            'message' => $message,
        ], JSON_UNESCAPED_UNICODE);
        file_put_contents($this->getParameter('kernel.project_dir').'/var/contact.log', $line.PHP_EOL, FILE_APPEND | LOCK_EX);

        return new JsonResponse(['ok' => true], 201);
    }
}
