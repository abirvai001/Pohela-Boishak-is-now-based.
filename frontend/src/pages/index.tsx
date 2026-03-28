
import React, { useState } from "react";
import WalletConnector from "../components/WalletConnector";
import MessageForm from "../components/MessageForm";
import Countdown from "../components/Countdown";
import PohelaAbi from "../../abi/PohelaBoishak.json"; // আপনি ABI এখানে রাখবেন

export default function Home() {
  const [signer, setSigner] = useState<any>(null);
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

  return (
    <div className="min-h-screen bg-[url('/textures/bg-pattern.png')] bg-cover" style={{ backgroundBlendMode: "multiply" }}>
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">পহেলা বৈশাখ on Base</h1>
            <p className="text-sm">নেটওয়ার্কে বানান, পাঠান ও সংরক্ষণ করুন সুন্দর বাংলা শুভেচ্ছা</p>
          </div>
          <WalletConnector onConnect={(s) => setSigner(s)} />
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <MessageForm signer={signer} contractAddress={CONTRACT_ADDRESS} abi={PohelaAbi} />
          </div>
          <div className="space-y-4">
            <Countdown />
            <div className="p-4 bg-white/70 rounded-md">
              <h3 className="font-bold mb-2">পহেলা বৈশাখের ঐতিহ্য</h3>
              <p>রঙ, কদম ফুল, পান্তাভাত ও পোশাক — আপনি চাইলে ব্যাকগ্রাউন্ডে ঐতিহ্যিক আইটেমের ছবি যোগ করা আছে।</p>
            </div>
          </div>
        </main>

        <footer className="mt-8 text-center text-sm text-gray-700">
          © পহেলা বৈশাখ on Base — সকল ট্রানজেকশন Base নেটওয়ার্কে রেকর্ড হবে।
        </footer>
      </div>
    </div>
  );
}
