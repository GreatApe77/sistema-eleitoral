import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, network } from "hardhat";

describe("AssinaturaDigital", () => {
  async function deployFixture() {
    const signers = await ethers.getSigners();
    const network = await ethers.provider.getNetwork();
    const AssinaturaDigitalMock = await ethers.getContractFactory(
      "AssinaturaDigitalChildMock"
    );
    const assinaturaDigital = await AssinaturaDigitalMock.deploy(
      "Assinatura Digital"
    );

    return { assinaturaDigital, signers, network };
  }

  it("Deve assinar uma mensagem", async () => {
    //bytes32 private constant VOTACAO_TYPEHASH = keccak256("Votacao(address assinante,uint16 numeroDoCandidato,bool votoComputado,uint256 nonce,uint256 prazo)");

    const { assinaturaDigital, signers, network } = await loadFixture(
      deployFixture
    );
    const assinante = signers[1];
    const domain = {
      name: "Assinatura Digital",
      version: "1",
      chainId: network.chainId,
      verifyingContract: await assinaturaDigital.getAddress(),
    };
    const VotacaoType = {
      Votacao: [
        { name: "assinante", type: "address" },
        { name: "numeroDoCandidato", type: "uint16" },
        { name: "votoComputado", type: "bool" },
        { name: "nonce", type: "uint256" },
        { name: "prazo", type: "uint256" },
      ],
    };
    const cincoMinutosNoFuturo = Math.floor(Date.now() / 1000 + 300);
    const values = {
      assinante: signers[0].address,
      numeroDoCandidato: 30,
      votoComputado: true,
      nonce: await assinaturaDigital.nonces(assinante.address),
      prazo: cincoMinutosNoFuturo,
    };
    const assinatura = await assinante.signTypedData(
      domain,
      VotacaoType,
      values
    );
    const assinaturaComponentizada = ethers.Signature.from(assinatura);
    const { v, r, s } = assinaturaComponentizada;
    const chavePublica = ethers.verifyTypedData(
      domain,
      VotacaoType,
      values,
      assinatura
    );
    //console.log({chavePublica,assinante:await assinante.getAddress()})
    expect(chavePublica).to.equal(await assinante.getAddress());
    const nonceAnterior = await assinaturaDigital.nonces(assinante.address);
    const resultado = await assinaturaDigital.assinar(
      assinante.address,
      values.numeroDoCandidato,
      values.votoComputado,
      cincoMinutosNoFuturo,
      v,
      r,
      s
    );
    const nonceAtual = await assinaturaDigital.nonces(assinante.address);
    expect(nonceAtual).to.equal(nonceAnterior + 1n);
  });
});
