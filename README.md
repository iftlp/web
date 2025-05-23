## Conseils d'utilisation

Je vous recommande d'utiliser la version hébergée et publiée de l'application
web: [https://shizima.baptiiiste.com](https://shizima.baptiiiste.com) et de vous connecter avec le compte:
`shizima@test.com` et `shizima123`

## Pré-requis

- Node.js (version 22.14.0 ou supérieure): [https://nodejs.org/fr](https://nodejs.org/fr) ou utiliser nvm
- pnpm (version 10.6.3 ou supérieure): `npm i pnpm`

## Mettre à jour les variables d'environnements

Créer un fichier d'environement .env à la racine du projet contenant:

```dotenv
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=CLE_TRES_LONGUE_ET_COMPLEXE
API_URL=https://api.mondomaine.com

# Minio
MINIO_URL=minio.mondomaine.com
MINIO_ACCESS_KEY=CLE_ACCESS_GENEREE_DEPUIS_MINIO
MINIO_SECRET_KEY=CLE_ACCESS_GENEREE_DEPUIS_MINIO
```

## Lancer le projet

Installer les dépendances : `pnpm install`\
Lancer le serveur de développement : `pnpm dev`\
Accéder à l'application : [http://localhost:3000](http://localhost:3000)