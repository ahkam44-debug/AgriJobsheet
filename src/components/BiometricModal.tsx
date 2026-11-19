import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Fingerprint, CheckCircle2, ShieldCheck, Smartphone, Key } from 'lucide-react';

interface BiometricModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSuccess: () => void;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSuccess
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onSuccess();
        onClose();
      }, 900);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-5">
        
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Autentikasi Biometrik Android
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sentuh sensor sidik jari pada perangkat untuk memverifikasi identitas <strong>{currentUser.name}</strong>.
          </p>
        </div>

        {/* Biometric Sensor Pad */}
        <div className="py-4 flex flex-col items-center justify-center">
          <button
            type="button"
            onClick={handleSimulateScan}
            disabled={isScanning || isSuccess}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isSuccess
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-300'
                : isScanning
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 ring-4 ring-emerald-500 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-12 h-12" />
            ) : (
              <Fingerprint className={`w-12 h-12 ${isScanning ? 'animate-bounce' : ''}`} />
            )}
          </button>
          <span className="text-[11px] text-slate-400 mt-3 font-mono">
            {isSuccess ? 'Sidik Jari Cocok · Terautentikasi!' : isScanning ? 'Memindai sensor sidik jari...' : 'Ketuk ikon di atas untuk memindai'}
          </span>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Gunakan Kata Sandi Saja
          </button>
        </div>

      </div>
    </div>
  );
};
