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
