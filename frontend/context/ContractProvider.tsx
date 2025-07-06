import { createContext, useContext } from "react";
// import { ethers } from "ethers";
// import EscrowBaseABI from "@/abis/EscrowBase.json";
// import TokenManagerABI from "@/abis/TokenManager.json";

// const ESCROW_ADDRESS = "0x311f80603A105FC88a122271F349BD768bF9DD46";
// const TOKEN_MANAGER_ADDRESS = "0x3994bf8Dd903097F81F4d666e8d8E744728586f0";
// const READ_ONLY_RPC = "https://rpc-amoy.polygon.technology";

type Contracts = {
  escrow: null;
  tokenManager: null;
};

const ContractContext = createContext<Contracts>({
  escrow: null,
  tokenManager: null,
});

export const ContractProvider = ({ children }: { children: React.ReactNode }) => {
  // const [contracts, setContracts] = useState<Contracts>({
  //   escrow: null,
  //   tokenManager: null,
  // });

  // useEffect(() => {
  //   (async () => {
  //     const provider = typeof window !== "undefined" && window.ethereum
  //       ? new ethers.BrowserProvider(window.ethereum)
  //       : new ethers.JsonRpcProvider(READ_ONLY_RPC);

  //     let signerOrProvider: ethers.Signer | ethers.Provider = provider;

  //     try {
  //       if (window.ethereum) {
  //         await window.ethereum.request({ method: "eth_requestAccounts" });
  //         signerOrProvider = await provider.getSigner();
  //       }
  //     } catch (err) {
  //       console.warn("👀 Running in read-only mode.");
  //     }

  //     const escrow = new ethers.Contract(ESCROW_ADDRESS, EscrowBaseABI, signerOrProvider);
  //     const tokenManager = new ethers.Contract(TOKEN_MANAGER_ADDRESS, TokenManagerABI, signerOrProvider);

  //     setContracts({ escrow, tokenManager });
  //   })();
  // }, []);

  return (
    <ContractContext.Provider value={{ escrow: null, tokenManager: null }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useEscrowContract = () => {
  const { escrow } = useContext(ContractContext);
  if (!escrow) throw new Error("Escrow contract not ready yet.");
  return escrow;
};

export const useTokenManagerContract = () => {
  const { tokenManager } = useContext(ContractContext);
  if (!tokenManager) throw new Error("TokenManager contract not ready yet.");
  return tokenManager;
};

