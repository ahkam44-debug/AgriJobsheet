import React, { useState } from 'react';
import { PYTHON_KIVY_CODE, BUILDOZER_SPEC } from '../utils/pythonCode';
import { Code, Copy, Check, Download, Terminal, Smartphone } from 'lucide-react';

export const PythonSourceModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kivy' | 'buildozer'>('kivy');
  const [copied, setCopied] = useState(false);

  const currentCode = activeTab === 'kivy' ? PYTHON_KIVY_CODE : BUILDOZER_SPEC;
  const fileName = activeTab === 'kivy' ? 'main.py' : 'buildozer.spec';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
            <span>Framework Python & KivyMD Android</span>
            <span>·</span>
            <span>Mobile APK Packaging</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Kode Sumber Python (Kivy & BeeWare)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Arsitektur kode Python lengkap untuk antarmuka responsif Android, kamera offline, sinkronisasi daemon, dan sistem kuis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Unduh {fileName}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('kivy')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'kivy'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>main.py (KivyMD Full Application)</span>
        </button>

        <button
          onClick={() => setActiveTab('buildozer')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'buildozer'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>buildozer.spec (Android Packaging Config)</span>
        </button>
      </div>

      {/* Code Viewer */}
      <div className="rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span className="ml-2 text-slate-300 font-semibold">{fileName}</span>
          </div>
          <span>Python 3.10+ · KivyMD 1.2.0</span>
        </div>

        <pre className="p-6 text-xs font-mono leading-relaxed overflow-x-auto max-h-[600px] text-emerald-300 selection:bg-emerald-900 selection:text-white">
          <code>{currentCode}</code>
        </pre>
      </div>

      {/* Instructions on how to run locally or build APK */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-600" />
          <span>Cara Menjalankan di Komputer / Membuat APK Android:</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-2">
            <strong className="text-slate-900 dark:text-white block">1. Menjalankan di Python Desktop / PC:</strong>
            <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px] bg-black/10 dark:bg-black/40 p-2 rounded-lg">
              pip install kivy kivymd pillow requests<br/>
              python main.py
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-2">
            <strong className="text-slate-900 dark:text-white block">2. Mengompilasi ke APK Android dengan Buildozer:</strong>
            <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px] bg-black/10 dark:bg-black/40 p-2 rounded-lg">
              pip install buildozer cython<br/>
              buildozer -v android debug
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
