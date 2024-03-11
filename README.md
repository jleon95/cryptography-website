# CryptographyWeb (Español)

Una web creada con el propósito de ilustrar conceptos en el campo de la criptografía de forma lúdica, y también de aprender un poco de desarrollo web. Actualmente cuenta con un minijuego de **cifrado monoalfabético**, y más minijuegos podrían venir *pronto*<sup>TM</sup>.

## Características
### Cifrado monoalfabético
- Sustitución de letras en el texto en tiempo real.
- Información acerca de las frecuencias de las letras tanto en el texto encriptado como en el idioma español.
- Opciones de dificultad del texto personalizables: puedes activar o desactivar los espacios y los signos de puntuación.
- Validación de sustitución de letras para guiarte a la hora de descifrar el texto.
- Pistas (un pequeño número, para no hacer el reto trivial) que te echan una mano extra desvelando letras; además, las letras más frecuentes en el texto tendrán más probabilidad de ser desveladas.
- Desactivación dinámica de botones y celdas de la tabla de sustituciones para mostrarte en todo momento de la sesión qué acciones tienes disponibles.
- Pantalla de ayuda de dos páginas que explica lo básico sobre el cifrado monoalfabético y sobre cómo funciona el minijuego.
- Recuerda el progreso de la sesión aunque cierres la pestaña o el navegador hasta que la sesión caduca.
- Pantalla de victoria con algunas estadísticas sobre la sesión.
>[!NOTE]
> No diseñado para móviles. Ver bajo tu propia responsabilidad.

## Capturas de pantalla
### Página principal

![cryptography-main](https://github.com/jleon95/cryptography-website/assets/10140054/1ada21ee-7220-4219-8dc9-a726e9764433)
### Cifrado monoalfabético
#### Pantalla principal del minijuego

![cryptography-monoalphabetic](https://github.com/jleon95/cryptography-website/assets/10140054/67e4206a-1473-49b9-8be1-4cedcd3518f6)
#### Primera página de la pantalla de ayuda

![cryptography-about-monoalphabetic](https://github.com/jleon95/cryptography-website/assets/10140054/a4d0d5b8-86cb-45f9-9d79-8d5acbeceb33)

## Cómo utilizar localmente
Ejecuta `docker compose up` en el directorio raíz; esto requiere tener `Docker` y su plugin `docker compose` instalados. Esto construirá y ejecutará los contenedores de *frontend* y *backend*, así como otro de [PostgreSQL](https://hub.docker.com/_/postgres) y otro más del *proxy* inverso [Traefik](https://hub.docker.com/_/traefik). La web estará disponible en tu máquina local en `http://frontend.docker.localhost`.

## Imágenes de Docker
Puedes encontrar las imágenes de [*frontend*](https://hub.docker.com/r/frivolousclinking/cryptography-web-front) y [*backend*](https://hub.docker.com/r/frivolousclinking/cryptography-web-back) en Docker Hub.

## Aviso
No soy el autor de los extractos de texto presentes en este repositorio y usados en los minijuegos. Los derechos pertenecen a los autores originales.

# CryptographyWeb (English)

A website created with the purpose of illustrating some concepts in the field of cryptography in a gamified setting, and is also a way for me to learn some web development. It currently has a **monoalphabetic cipher** minigame, and other minigames may come *soon*<sup>TM</sup>.

> [!NOTE]
> Uses the **Spanish** language.

## Features
### Monoalphabetic cipher
- Real-time letter substitution on player input.
- Info about the frequency of letters both in the encrypted text and in Spanish.
- Customizable text difficulty options: ability to toggle spaces and/or punctuation marks in the encrypted text.
- Validation of letter substitutions to help the player figure out the original text.
- A limited amount of hints to give the player a further helping hand; also, more frequently-appearing letters are more likely to be chosen for hints.
- Dynamic disabling of buttons and cells to let the player know what actions are possible at any given point in the session.
- Two-page help screen to explain the basics of monoalphabetic cipher and how the game works.
- Remembers session progress on tab and browser close until the session expires.
- Win screen with some stats about the session.
> [!NOTE]
> Not designed for mobile. View at your own risk.

## Screenshots
### Main page

![cryptography-main](https://github.com/jleon95/cryptography-website/assets/10140054/1ada21ee-7220-4219-8dc9-a726e9764433)
### Monoalphabetic cipher
#### Main game screen

![cryptography-monoalphabetic](https://github.com/jleon95/cryptography-website/assets/10140054/67e4206a-1473-49b9-8be1-4cedcd3518f6)
#### First page of the help screen

![cryptography-about-monoalphabetic](https://github.com/jleon95/cryptography-website/assets/10140054/a4d0d5b8-86cb-45f9-9d79-8d5acbeceb33)

## How to setup locally
Run `docker compose up` from the root directory; this requires a working installation of `Docker` with the `docker compose` plugin. This will spin up the frontend and backend containers, as well as a [PostgreSQL](https://hub.docker.com/_/postgres) container and a [Traefik](https://hub.docker.com/_/traefik) reverse proxy container. 
The website will be available locally at `http://frontend.docker.localhost`.

## Docker images
You can find the [frontend](https://hub.docker.com/r/frivolousclinking/cryptography-web-front) and [backend](https://hub.docker.com/r/frivolousclinking/cryptography-web-back) images on Docker Hub.

## Disclaimer
I am not the author of the excerpts present in this repository and used in the minigames. The rights belong to the original authors.
