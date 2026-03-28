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
      // পাঠানোর ট্রানজেকশন
      const tx = await contract.sendGreeting(to, messageToSend);
      setTxHash(tx.hash);

      // এখানে আমরা স্থানীয় ইভেন্ট ডিসপ্যাচ করছি যাতে UI-র সাম্প্রতিক লিস্ট আপডেট হয়
      const payload = { hash: tx.hash, to, message: messageToSend };
      try {
        window.dispatchEvent(new CustomEvent("pohela:newTx", { detail: payload }));
      } catch (e) {
        // কোনো ব্রাউজারে CustomEvent restriction থাকলে fallback
        // @ts-ignore
        if (typeof window !== "undefined" && (window as any).dispatchEvent) {
          // ignore
        }
      }

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
    <div>
      <label className="block mb-2">
        প্রাপক ঠিকানা:
        <input
          className="input mt-1"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="0x..."
        />
      </label>

      <div className="flex gap-2 mb-3">
        <button onClick={pickRandom} className="btn btn-saffron">
          র‍্যান্ডম শুভেচ্ছা নিন
        </button>
        <div className="text-sm text-gray-600 flex items-center">বা ম্যানুয়ালি লিখুন</div>
      </div>

      <label className="block mb-2">
        র‍্যান্ডম বার্তা (পছন্দ হলে ম্যানুয়াল ওভাররাইড করবে):
        <textarea className="input mt-1" value={selectedMsg} readOnly rows={2} />
      </label>

      <label className="block mb-3">
        ম্যানুয়াল বার্তা:
        <textarea
          className="input mt-1"
          value={manualMsg}
          onChange={(e) => setManualMsg(e.target.value)}
          rows={3}
        />
      </label>

      <div className="flex gap-2 items-center">
        <button onClick={sendGreeting} disabled={sending} className="btn btn-primary">
          {sending ? "পাঠানো হচ্ছে..." : "পাঠান"}
        </button>

        {txHash && (
          <a
            className="btn btn-ghost"
            href={`https://base.blockscout.com/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            ট্রানজেকশন দেখুন
          </a>
        )}
      </div>
    </div>
  );
}
