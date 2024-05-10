# Sistema Eleitoral

Projeto de sistema eleitoral feito com o intuito de utilizar diversas tecnologias e integrá-las em um único projeto.

<h3>Tecnologias utilizadas</h3>

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [React](https://pt-br.reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Solidity](https://docs.soliditylang.org/en/v0.8.20/)
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/v6/)
- [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)

<h3>Prerequisitos</h3>

Para rodar o projeto é necessário ter instalado as seguintes ferramentas:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

<h3>Variáveis de Ambiente</h2>

Dentro do diretório `server` crie um arquivo chamado `.env` e adicione as seguintes variáveis de ambiente:

```yaml
# Variaveis de ambiente padrao para desenvolvimento, altere conforme necessario
# Configurações do MongoDB
MONGO_URI=mongodb://mongodb:27017/sistema-eleitoral
# Senha do Administrador em Hash (keccak256('senha'))
ADMIN_SECRET_PASSWORD_HASH=0x16f5904ef4356faa537ed604df82cc166c745b6eb53cf294522189f657d09ca2
# Secret para gerar JWT
JWT_SECRET=YOUR_SECRET
# URL do nó Ethereum
ETH_NODE_URL=http://blockchain:8545
#Use esse endereço no seu .env para rodar localmente (docker) (endereco de contrato deterministico gerado pelo anvil)
SISTEMA_ELEITORAL_CONTRACT_ADDRESS=0x8464135c8f25da09e49bc8782676a84730c318bc
#Accounts[1] gerado pelo anvil (docker)
ADMIN_WALLET_PRIVATE_KEY=59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
#Permitir CORS
ALLOWED_CORS=*

```
## Como executar

Para executar o projeto, basta rodar o comando abaixo na raiz do projeto (depois de configurar as variáveis de ambiente):
    
```
    docker compose build

```

Em seguida, execute o comando abaixo para subir os containers:

```
    docker compose up
```

Para parar os containers, execute o comando abaixo:

```
    docker compose down
```

Para acessar o front localmente, basta acessar o endereço abaixo:

```
    http://localhost:3000
```



## License

MIT © Mateus Navarro