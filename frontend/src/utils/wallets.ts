
import { ethers } from "ethers";

export async function detectInjectedWallets(): Promise<
  { name: string; provider: any }[]
> {
  const wallets: { name: string; provider: any }[] = [];
  if (typeof window === "undefined") return wallets;

  const anyWindow: any = window;
  if (anyWindow.ethereum) {
    // MetaMask বা অন্য Injected
    wallets.push({ name: "Injected", provider: anyWindow.ethereum });
    // Some wallets inject with isMetaMask/isCoinbaseWallet etc.
    if (anyWindow.ethereum.isMetaMask) wallets.push({ name: "MetaMask", provider: anyWindow.ethereum });
    if (anyWindow.ethereum.isCoinbaseWallet) wallets.push({ name: "Coinbase Wallet", provider: anyWindow.ethereum });
    if (anyWindow.ethereum.isFrame) wallets.push({ name: "Frame", provider: anyWindow.ethereum });
  }

  // WalletConnect provider can be added via modal; for now we only detect injected ones
  return wallets;
}

export async function connectToProvider(provider: any): Promise<ethers.BrowserProvider> {
  const browserProvider = new ethers.BrowserProvider(provider);
  await provider.request?.({ method: "eth_requestAccounts" });
  return browserProvider;
}
