
"use client";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";

export function useNotifications() {
  const [items, setItems] = useState<any[]>([]);
  const lastIdRef = useRef(0);

  useEffect(() => {
    let timer: any;
    let cancelled = false;

    async function tick() {
      if (document.hidden) {               
        timer = setTimeout(tick, 15000);
        return;
      }
      try {
        const data = await api(`http://localhost/backend/pollNotifications.php?sinceId=${lastIdRef.current}`);
        if (!cancelled && data.items?.length) {
          setItems(prev => [...prev, ...data.items]);
          lastIdRef.current = data.lastId || lastIdRef.current;
          // toaster component
        }
      } catch { /* ignoring transient errors */ }
      timer = setTimeout(tick, 10000);      // 10s interval
    }

    tick();
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return items;
}
