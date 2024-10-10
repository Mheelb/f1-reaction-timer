# f1-reaction-timer

## Description
`f1-reaction-timer` est une application qui permet de mesurer et de suivre les temps de réaction des utilisateurs. Elle offre des fonctionnalités pour soumettre des temps de réaction, récupérer les meilleurs temps, et un système d'authentification.

## Fonctionnalités
- Soumettre un temps de réaction
- Récupérer les meilleurs temps de réaction
- Récupérer les temps de réaction d'un utilisateur spécifique
- Authentification des utilisateurs

## Prérequis
- Docker
- Docker Compose

## Installation
1. Clonez le dépôt :
    ```bash
    git clone https://github.com/Mheelb/f1-reaction-timer.git
    git checkout monolith
    cd f1-reaction-timer
    ```

2. Configurez les variables d'environnement :
    Copiez les fichiers d'exemple et modifiez-les selon vos besoins :
    ```bash
    cp .env.sample .env
    cp .env.test.local.sample .env.test.local
    ```
    ```env
    # .env
    PORT=3001
    MONGODB_URI=mongodb://mongo:27017/f1-reaction-timer
    JWT_SECRET=your_jwt_secret

    # .env.test.local
    TEST_USER_EMAIL=test@example.com
    TEST_USER_PASSWORD=testPassword
    TEST_USER_ROLE=false
    TEST_USER_ID=user_id
    ```

## Utilisation avec Docker
1. Construisez et démarrez les conteneurs Docker :
    ```bash
    docker-compose up --build
    ```

2. Accédez à l'application via `http://localhost:3001`.

## Documentation de l'API
La documentation de l'API est disponible à l'adresse suivante : `http://localhost:3001/api-docs`

## Tests
Pour exécuter les tests, utilisez la commande suivante :
```bash
docker-compose exec app-backend /bin/sh
npm test