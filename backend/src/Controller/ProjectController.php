<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class ProjectController extends AbstractController
{
    #[Route('/health', name: 'api_health', methods: ['GET'])]
    public function health(): JsonResponse
    {
        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/projects', name: 'api_projects', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $file = $this->getParameter('kernel.project_dir').'/data/projects.json';
        $projects = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);

        return new JsonResponse($projects);
    }
}
