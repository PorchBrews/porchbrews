"use client";
import { useEffect, useState } from 'react';
export function usePlusFlag() {
  const [isPlus, setIsPlus] = useState(false);
  useEffect(() => { try { setIsPlus(localStorage.getItem('pb_plus')==='1'); } catch {} }, []);
  const activate   = () => { try { localStorage.setItem('pb_plus','1'); setIsPlus(true); } catch {} };
  const deactivate = () => { try { localStorage.removeItem('pb_plus'); setIsPlus(false); } catch {} };
  return { isPlus, activate, deactivate };
}
