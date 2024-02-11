

export function getEIP721Domain(name:string,chainId:number | bigint | string, contractAddress:string) {
  return {
    name: name,
    version: '1',
    chainId,
    verifyingContract: contractAddress
  };
}