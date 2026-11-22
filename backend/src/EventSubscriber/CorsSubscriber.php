<?php

namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class CorsSubscriber implements EventSubscriberInterface
{
    private array $origins;

    public function __construct(string $allowedOrigins)
    {
        $this->origins = array_values(array_filter(array_map('trim', explode(',', $allowedOrigins))));
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => ['onRequest', 250],
            KernelEvents::RESPONSE => ['onResponse', 0],
        ];
    }

    public function onRequest(RequestEvent $event): void
    {
        $request = $event->getRequest();
        if ($event->isMainRequest() && $request->isMethod('OPTIONS') && $request->headers->has('Origin')) {
            $event->setResponse(new Response('', 204));
        }
    }

    public function onResponse(ResponseEvent $event): void
    {
        $origin = $event->getRequest()->headers->get('Origin');
        if (!$origin || !in_array($origin, $this->origins, true)) {
            return;
        }

        $headers = $event->getResponse()->headers;
        $headers->set('Access-Control-Allow-Origin', $origin);
        $headers->set('Vary', 'Origin');
        $headers->set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        $headers->set('Access-Control-Allow-Headers', 'Content-Type');
        $headers->set('Access-Control-Max-Age', '3600');
    }
}
