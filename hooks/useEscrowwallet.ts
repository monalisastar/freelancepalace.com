import { useEffect, useState } from "react";
// import { getWallets } from "@/lib/getWallets"; // ✅ commented out
// import { useProvider } from "wagmi";           // ✅ commented out

export function useEscrowWallets() {
  // const provider = useProvider(); // ✅ commented out

  const [wallets, setWallets] = useState({
    platformFee: "",
    treasury: "",
    rewardManager: "",
    tokenManager: "",
  });

  useEffect(() => {
    // if (!provider) return;
    // (async () => {
    //   const data = await getWallets(provider);
    //   setWallets(data);
    // })();
  }, []);

  return wallets;
}

