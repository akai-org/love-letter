FROM node:21-alpine3.17

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY vite.config.ts .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY postcss.config.js .

CMD ["npm", "run", "dev"]
