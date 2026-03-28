
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

function nextPohelaBoishakh() {
  const now = dayjs();
  // সাধারণভাবে পহেলা বৈশাখ প্রতি বছর 14 এপ্রিল (বা লিপইয়ার কারণে ভিন্ন হতে পারে)
  let year = now.year();
  const candidate = dayjs(`${year}-04-14T00:00:00`);
  if (candidate.isBefore(now)) year += 1;
  return dayjs(`${year}-04-14T00:00:00`);
}

export default function Countdown() {
  const [diff, setDiff] = useState<number>(0);
  useEffect(() => {
    const target = nextPohelaBoishakh();
    function update() {
      const ms = target.valueOf() - Date.now();
      setDiff(ms);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (diff <= 0) return <div className="p-4 bg-white/70 rounded-md">শুভ নববর্ষ! পহেলা বৈশাখ আনন্দে ভরুক।</div>;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="p-4 bg-white/70 rounded-md text-center">
      <h3 className="text-lg font-bold mb-2">আগামী পহেলা বৈশাখ</h3>
      <div className="text-2xl font-mono">
        {days} দিন : {hours} ঘঃ : {minutes} মি : {seconds} সে
      </div>
    </div>
  );
}
