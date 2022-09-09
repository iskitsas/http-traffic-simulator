**Run with npm**

1. Clone repo
2. change directory to server-app
3. Install required npm modules `npm i` or `npm install` or `yarn install`
4. In root create `.env` , copy paste the content of `.env.npm` into `.env`
5. Generate a **private key** (From any website or use any algorith )
6. Replace `YOUR_PRIVATE_KEY_HERE` with the generated **Private key** in `.env`
7. To run in development environment - `npm run dev`
8. To run in production - `npm start`

**Run with docker**

1. Run command `sudo docker-compose -f docker-compose.dev.yml up` for development
1. Run command `sudo docker-compose -f docker-compose.prod.yml up` for production
