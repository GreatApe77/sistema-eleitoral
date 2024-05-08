FROM node:18-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

ARG server_url=http://localhost:8080

ARG sistema_eleitoral_contract_address=0x8464135c8f25da09e49bc8782676a84730c318bc

ARG eth_node_url=http://localhost:8545

ENV VITE_SERVER_URL=${server_url}

ENV VITE_SISTEMA_ELEITORAL_CONTRACT_ADDRESS=${sistema_eleitoral_contract_address}

ENV VITE_ETH_NODE_URL=${eth_node_url}

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","preview"]
