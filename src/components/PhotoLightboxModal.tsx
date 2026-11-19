import React from 'react';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  subtitle?: string;
  caption?: string;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  subtitle,
  caption
}) => {
  const [zoomed, setZoomed] = React.useState(false);

  React.useEffect(() => {
    setZoomed(false);
  }, [imageUrl, isOpen]);

  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/95">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-emerald-400 truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              title={zoomed ? 'Perkecil tampilan' : 'Perbesar foto'}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            </button>
            <a
              href={imageUrl}
              download={`agrijobsheet-foto-${Date.now()}.jpg`}
              title="Unduh Foto"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              title="Tutup Pratinjau"
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-600/80 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Full-resolution image viewport */}
        <div className="flex-1 bg-black flex items-center justify-center overflow-auto p-2 sm:p-4 min-h-[300px]">
          <img
            src={imageUrl}
            alt={title}
            referrerPolicy="no-referrer"
            onClick={() => setZoomed((z) => !z)}
            className={`rounded-xl transition-transform duration-300 cursor-zoom-in ${
              zoomed
                ? 'max-w-none w-[140%] sm:w-[125%] h-auto cursor-zoom-out'
                : 'max-h-[70vh] w-auto max-w-full object-contain'
            }`}
          />
        </div>

        {/* Caption footer */}
        {caption && (
          <div className="px-4 sm:px-6 py-3 border-t border-slate-800 bg-slate-900/95 text-xs text-slate-300 leading-relaxed">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
};
