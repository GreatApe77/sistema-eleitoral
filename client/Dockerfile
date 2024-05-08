FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

ARG server_url

ARG sistema_eleitoral_contract_address

ARG eth_node_url

ENV VITE_SERVER_URL=${server_url}

ENV VITE_SISTEMA_ELEITORAL_CONTRACT_ADDRESS=${sistema_eleitoral_contract_address}

ENV VITE_ETH_NODE_URL=${eth_node_url}

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","preview"]
