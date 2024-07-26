import { useWeb3React } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";
import { getAddChainParameters } from "chains";


export function useSwitchChain() {
  const { connector } = useWeb3React();

  const switchChain = async (desiredChain: number) => {
    if (connector instanceof WalletConnect) {
      await connector.activate(desiredChain === -1 ? undefined : desiredChain);
    } else {
      await connector.activate(desiredChain === -1 ? undefined : getAddChainParameters(desiredChain));
    }
  };

  return switchChain;
}