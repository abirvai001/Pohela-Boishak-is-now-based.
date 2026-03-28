import React, { useState } from "react";
import { POHELA_MESSAGES } from "../utils/messages";
import { ethers } from "ethers";

type Props = {
  signer: ethers.Signer | null;
  contractAddress: string;
  abi: any;
};

export default function MessageForm({ signer, contractAddress, abi }: Props) {
  const [to, setTo] = useState("");
  const [manualMsg, setManualMsg] = useState("");
  const [selectedMsg, setSelectedMsg] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function pickRandom() {
    const rand = POHELA_MESSAGES[Math.floor(Math.random() * POHELA_MESSAGES.length)];
    setSelectedMsg(rand);
    setManualMsg("");
  }

  async function sendGreeting() {
    if (!signer) return alert("প্রথমে ওয়ালেট কানেক্ট করুন।");
    if (!ethers.isAddress(to)) return alert("সঠিক প্রাপক ঠিকানা দিন।");
    const messageToSend = manualMsg.trim() || selectedMsg;
    if (!messageToSend) return alert("বার্তা নির্বাচন বা লিখুন।");

    try {
      setSending(true);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const tx = await contract.sendGreeting(to, messageToSend);
      setTxHash(tx.hash);
      await tx.wait();
      alert("ট্রানজেকশন সফল: " + tx.hash);
    } catch (err: any) {
      console.error(err);
      alert("ট্রানজেকশন ব্যর্থ: " + (err?.message || err));
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="p-4 bg-white/70 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-2">পহেলা বৈশাখ শুভেচ্ছা পাঠান</h3>
      <label className="block mb-2">
        প্রাপক ঠিকানা:
        <input className="block w-full p-2 border rounded" value={to} onChange={(e) => setTo(e.target.value)} placeholder="0x..." />
      </label>

      <div className="mb-2">
        <button onClick={pickRandom} className="px-3 py-2 bg-green-600 text-white rounded">র‍্যান্ডম শুভেচ্ছা নিন</button>
      </div>

      <label className="block mb-2">
        র‍্যান্ডম বার্তা:
        <textarea className="block w-full p-2 border rounded" value={selectedMsg} readOnly rows={2} />
      </label>

      <label className="block mb-2">
        অথবা ম্যানুয়ালি লিখুন:
        <textarea className="block w-full p-2 border rounded" value={manualMsg} onChange={(e) => setManualMsg(e.target.value)} rows={3} />
      </label>

      <div className="flex gap-2">
        <button onClick={sendGreeting} disabled={sending} className="px-4 py-2 bg-blue-600 text-white rounded">
          {sending ? "পাঠানো হচ্ছে..." : "পাঠান"}
        </button>
        {txHash && (
          <a className="px-4 py-2 bg-gray-200 rounded" href={`https://base.blockscout.com/tx/${txHash}`} target="_blank" rel="noreferrer">
            ট্রানজেকশন দেখুন
          </a>
        )}
      </div>
    </div>
  );
}
