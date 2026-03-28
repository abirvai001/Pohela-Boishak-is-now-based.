
import React, { useEffect, useState } from "react";
import { detectInjectedWallets, connectToProvider } from "../utils/wallets";
import { ethers } from "ethers";

type Props = {
  onConnect: (signer: ethers.Signer) => void;
};

export default function WalletConnector({ onConnect }: Props) {
  const [wallets, setWallets] = useState<{ name: string; provider: any }[]>([]);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const w = await detectInjectedWallets();
      setWallets(w);
    })();
  }, []);

  async function handleConnect(provider: any) {
    try {
      const browserProvider = await connectToProvider(provider);
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
      setConnectedAddress(address);
      onConnect(signer);
    } catch (err) {
      console.error(err);
      alert("ওয়ালেট সংযোগে সমস্যা হয়েছে। কনসোলে দেখুন।");
    }
  }

  return (
    <div className="p-4 bg-white/60 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">ওয়ালেট সংযোগ</h3>
      {connectedAddress ? (
        <div>সংযুক্ত ঠিকানা: {connectedAddress}</div>
      ) : (
        <>
          <div className="mb-2">আপনার ব্রাউজারে পাওয়া ওয়ালেটগুলি:</div>
          {wallets.length === 0 && <div>কোনো Injected ওয়ালেট পাওয়া যায়নি। আপনি MetaMask ইত্যাদি ইনস্টল করুন বা WalletConnect ব্যবহার করুন।</div>}
          <div className="flex gap-2 flex-wrap">
            {wallets.map((w, i) => (
              <button
                key={i}
                onClick={() => handleConnect(w.provider)}
                className="px-3 py-2 bg-base-600 hover:bg-base-700 text-white rounded"
              >
                {w.name} দিয়ে কানেক্ট
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
