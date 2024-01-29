# Solidity API

## Eleicao

Contrato para gerenciar uma eleição

### listaDeNumerosCadastrados

```solidity
uint16[] listaDeNumerosCadastrados
```

_Lista de números de votação cadastrados_

### admin

```solidity
address admin
```

Endereço do administrador do contrato

### dataLimiteParaVotar

```solidity
uint256 dataLimiteParaVotar
```

Data limite para votar

### TEMPO_DE_VOTACAO

```solidity
uint256 TEMPO_DE_VOTACAO
```

Tempo de duração da eleição

### somenteAdmnistrador

```solidity
modifier somenteAdmnistrador()
```

_Modificador que permite que apenas o administrador execute a função_

### somenteAntesDaEleicao

```solidity
modifier somenteAntesDaEleicao()
```

_Modificador que permite que a função seja executada apenas antes da eleição_

### somenteDuranteAEleicao

```solidity
modifier somenteDuranteAEleicao()
```

_Modificador que permite que a função seja executada apenas durante a eleição_

### somenteDentroDoPrazoParaVotacao

```solidity
modifier somenteDentroDoPrazoParaVotacao()
```

_Modificador que permite que a função seja executada apenas dentro do prazo para votação_

### constructor

```solidity
constructor(struct EleicaoLib.Candidato[] candidatosIniciais) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| candidatosIniciais | struct EleicaoLib.Candidato[] | Lista de candidatos iniciais a serem cadastrados |

### iniciarEleicao

```solidity
function iniciarEleicao() public
```

Inicia a eleição

### encerrarEleicao

```solidity
function encerrarEleicao() public virtual
```

Encerra a eleição

### cadastrarCandidato

```solidity
function cadastrarCandidato(struct EleicaoLib.Candidato candidato) public
```

_deve vir com certas informaçoes zeradas ex: quantidadeDeVotos_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| candidato | struct EleicaoLib.Candidato | Informações do candidato |

### deletarCandidato

```solidity
function deletarCandidato(uint16 numeroDoCandidato) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numeroDoCandidato | uint16 | Número de votação do candidato |

### votar

```solidity
function votar(uint16 numeroDoCandidato) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numeroDoCandidato | uint16 | Número de votação do candidato |

### getQuantidadeDeCandidatos

```solidity
function getQuantidadeDeCandidatos() public view returns (uint256)
```

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Quantidade de candidatos cadastrados |

### getCandidatos

```solidity
function getCandidatos(uint256 indiceDePartida, uint256 quantidade) public view returns (struct EleicaoLib.Candidato[])
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| indiceDePartida | uint256 | Índice de partida para a busca |
| quantidade | uint256 | Quantidade de candidatos a serem retornados |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct EleicaoLib.Candidato[] | Lista de candidatos |

### statusDaEleicao

```solidity
function statusDaEleicao() external view returns (enum EleicaoLib.StatusDaEleicao)
```

Retorna o status da eleição

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum EleicaoLib.StatusDaEleicao | Status da eleição (Não iniciada, Ativa, Encerrada) |

### resultado

```solidity
function resultado() external view returns (struct EleicaoLib.Votos)
```

Retorna o resultado da eleição

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct EleicaoLib.Votos | Resultado da eleição |

### candidatoPorNumero

```solidity
function candidatoPorNumero(uint16 numeroDeVotacao) external view returns (struct EleicaoLib.Candidato)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numeroDeVotacao | uint16 | Número de votação do candidato |

## IEleicao

### Eleicao__VotosNaoZerados

```solidity
error Eleicao__VotosNaoZerados()
```

_Erro que indica votos não zerados_

### Eleicao__CandidatoJaExiste

```solidity
error Eleicao__CandidatoJaExiste()
```

_Erro que indica que o candidato já existe_

### Eleicao__EleicaoNaoEstaAtiva

```solidity
error Eleicao__EleicaoNaoEstaAtiva()
```

_Erro que indica Eleição inativa_

### Eleicao__SomenteAntesDaEleicao

```solidity
error Eleicao__SomenteAntesDaEleicao()
```

_Erro disparado quando a eleição já foi iniciada_

### Eleicao__SomenteAdministrador

```solidity
error Eleicao__SomenteAdministrador()
```

_Erro disparado quando o caller não é o administrador_

### Eleicao__PrazoParaVotacaoEncerrado

```solidity
error Eleicao__PrazoParaVotacaoEncerrado()
```

_Erro disparado quando o prazo para votação já foi encerrado_

### Eleicao__CandidatoNaoExiste

```solidity
error Eleicao__CandidatoNaoExiste()
```

_Erro disparado quando o candidato não existe_

### statusDaEleicao

```solidity
function statusDaEleicao() external view returns (enum EleicaoLib.StatusDaEleicao)
```

Retorna o status da eleição

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | enum EleicaoLib.StatusDaEleicao | Status da eleição (Não iniciada, Ativa, Encerrada) |

### resultado

```solidity
function resultado() external view returns (struct EleicaoLib.Votos)
```

Retorna o resultado da eleição

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct EleicaoLib.Votos | Resultado da eleição |

### candidatoPorNumero

```solidity
function candidatoPorNumero(uint16 numeroDeVotacao) external view returns (struct EleicaoLib.Candidato)
```

Retorna as informações do candidato

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numeroDeVotacao | uint16 | Número de votação do candidato |

### getQuantidadeDeCandidatos

```solidity
function getQuantidadeDeCandidatos() external view returns (uint256)
```

Retorna a quantidade de candidatos cadastrados na eleição

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Quantidade de candidatos cadastrados |

### getCandidatos

```solidity
function getCandidatos(uint256 indiceDePartida, uint256 quantidade) external view returns (struct EleicaoLib.Candidato[])
```

Retorna os candidatos cadastrados na eleição

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| indiceDePartida | uint256 | Índice de partida para a busca |
| quantidade | uint256 | Quantidade de candidatos a serem retornados |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct EleicaoLib.Candidato[] | Lista de candidatos |

### iniciarEleicao

```solidity
function iniciarEleicao() external
```

Inicia a eleição

### encerrarEleicao

```solidity
function encerrarEleicao() external
```

Encerra a eleição

### cadastrarCandidato

```solidity
function cadastrarCandidato(struct EleicaoLib.Candidato candidato) external
```

Cadastra um candidato na eleição

_deve vir com certas informaçoes zeradas ex: quantidadeDeVotos_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| candidato | struct EleicaoLib.Candidato | Informações do candidato |

### deletarCandidato

```solidity
function deletarCandidato(uint16 numeroDoCandidato) external
```

Deleta um candidato da eleição

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numeroDoCandidato | uint16 | Número de votação do candidato |

### votar

```solidity
function votar(uint16 numeroDoCandidato) external
```

Vota em um candidato

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numeroDoCandidato | uint16 | Número de votação do candidato |

## EleicaoLib

### StatusDaEleicao

```solidity
enum StatusDaEleicao {
  NAO_INICIADA,
  ATIVA,
  ENCERRADA
}
```

### Votos

```solidity
struct Votos {
  uint256 quantidadeDeVotos;
  uint256 quantidadeDeVotosValidos;
  uint256 quantidadeDeVotosBrancos;
  uint256 quantidadeDeVotosNulos;
}
```

### Candidato

```solidity
struct Candidato {
  string nome;
  string partido;
  string fotoDoCandidatoUrl;
  uint16 numeroDeVotacao;
  uint256 quantidadeDeVotos;
  uint256 indice;
}
```

## SistemaEleitoral

