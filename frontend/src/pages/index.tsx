import React, { useState, useEffect } from "react";
import WalletConnector from "../components/WalletConnector";
import MessageForm from "../components/MessageForm";
import Countdown from "../components/Countdown";
import PohelaAbi from "../../abi/PohelaBoishak.json";
import { ethers } from "ethers";

/**
 * Main page - বাংলা UI, মিনিমাল ডিজাইন, টেক্সচার/ইমেজ বাদ
 * আশা: Tailwind ও globals.css আগেই প্রয়োগ আছে।
 */

export default function Home() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [recentTxs, setRecentTxs] = useState<{ hash: string; to: string; message: string }[]>([]);
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

  // Callback passed to WalletConnector
  function handleConnected(s: ethers.Signer) {
    setSigner(s);
    s.getAddress().then((addr) => setAccount(addr)).catch(() => setAccount(null));
  }

  // Add a tx to recent list (used by MessageForm via window event)
  useEffect(() => {
    function onNewTx(e: any) {
      const { hash, to, message } = e.detail || {};
      if (!hash) return;
      setRecentTxs((p) => [{ hash, to, message }, ...p].slice(0, 6));
    }
    window.addEventListener("pohela:newTx", onNewTx);
    return () => window.removeEventListener("pohela:newTx", onNewTx);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-light)] font-sans">
      <div className="container py-8">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="logo-badge">
              PB
            </div>
            <div>
              <h1 className="h1">পহেলা বৈশাখ on Base</h1>
              <small className="text-sm text-gray-600">বাংলা নববর্ষের শুভেচ্ছা পাঠাতে ব্লকচেইন ব্যবহার করুন</small>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <WalletConnector onConnect={handleConnected} />
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">শুভেচ্ছা পাঠান</h2>
                <div className="text-sm text-gray-600">{account ? `সংযুক্ত: ${account}` : "ওয়ালেট সংযুক্ত নয়"}</div>
              </div>

              <MessageForm signer={signer} contractAddress={CONTRACT_ADDRESS} abi={PohelaAbi} />
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">সাম্প্রতিক ট্রানজেকশন (সেশন)</h3>
              {recentTxs.length === 0 ? (
                <div className="text-gray-600">কোনো ট্রানজেকশন এখানে দেখা যাচ্ছে না — প্রথমবার প্রেরণ করে দেখুন।</div>
              ) : (
                <ul className="space-y-3">
                  {recentTxs.map((t) => (
                    <li key={t.hash} className="greeting-card">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm text-gray-500">প্রাপক: {t.to}</div>
                          <div className="msg mt-1">{t.message}</div>
                        </div>
                        <div className="text-right">
                          <a
                            href={`https://base.blockscout.com/tx/${t.hash}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-baseBlue-600 hover:underline"
                          >
                            টেক্সান দেখতে
                          </a>
                          <div className="text-xs text-gray-400 mt-1">{t.hash.slice(0, 10)}...</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="card">
              <Countdown />
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2">কি করে কাজ করে</h3>
              <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                <li>ওয়ালেট কানেক্ট করুন (MetaMask/Injected)</li>
                <li>প্রাপক ঠিকানা দিন এবং র‍্যান্ডম বা ম্যানুয়াল মেসেজ নির্বাচন করুন</li>
                <li>পাঠালে ট্রানজেকশন ব্লকে ইভেন্ট হিসেবে রেকর্ড হবে — Explorer-এ দেখা যাবে</li>
              </ol>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-2">সহায়িকা</h3>
              <p className="text-sm text-gray-700">যদি কোনো সমস্যা হয়, কনসোল লগ দেখুন অথবা আমাকে তাতে মেসেজ করুন — আমি সাহায্য করব।</p>
            </div>
          </aside>
        </main>

        <footer className="footer mt-10">
          © {new Date().getFullYear()} পহেলা বৈশাখ on Base — সকল ট্রানজেকশন ব্লকে রেকর্ড হবে।
        </footer>
      </div>
    </div>
  );
}
