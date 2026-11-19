import React, { useState } from 'react';
import { ChatMessage, UserProfile, CommodityId } from '../types';
import { CommodityBundle } from '../data/commoditiesData';
import { Send, Bot } from 'lucide-react';

interface LiveChatHelpdeskProps {
  commodity: CommodityBundle;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
}

const COMMODITY_QUICK_QUESTIONS: Record<CommodityId, string[]> = {
  semangka: [
    "Bagaimana cara membedakan bunga jantan dan betina semangka?",
    "Berapa dosis pupuk susulan NPK 16-16-16 untuk kocor 20 HST?",
    "Berapa nilai Brix standar agar semangka manis saat dipanen?",
    "Bagaimana mengatasi kutu kebul dengan konsep PHT di lahan?"
  ],
  cabai: [
    "Mengapa tunas air di bawah cabang Y cabai wajib dirempel?",
    "Bagaimana cara mencegah penyakit antraknosa (patek) pada buah cabai?",
    "Bagaimana mengendalikan thrips penyebab daun keriting cabai?",
    "Apa tanda buah cabai merah siap panen pertama (75-85 HST)?"
  ],
  tomat: [
    "Bagaimana mencegah ujung buah tomat membusuk hitam (BER)?",
    "Bagaimana teknik pewiwilan tunas ketiak daun pada tomat?",
    "Bagaimana pencegahan busuk daun Phytophthora saat musim hujan?",
    "Kapan waktu panen tomat yang tepat untuk pengiriman jarak jauh?"
  ],
  timun: [
    "Mengapa tunas dan bunga mentimun pada ruas 1-4 bawah dibuang?",
    "Mengapa buah mentimun bisa terasa pahit atau berbentuk bengkok?",
    "Bagaimana mengendalikan embun bulu (downy mildew) dan oteng-oteng?",
    "Kapan umur panen optimal mentimun agar renyah dan tidak berbiji keras?"
  ],
  melon: [
    "Di ruas cabang ke berapa buah melon sebaiknya dipelihara & digantung?",
    "Kapan waktu topping pucuk tanaman melon dan pengurangan air menjelang panen?",
    "Bagaimana mengendalikan embun tepung (powdery mildew) pada daun melon?",
    "Berapa nilai Brix standar dan ciri net buah melon siap panen?"
  ]
};

export const LiveChatHelpdesk: React.FC<LiveChatHelpdeskProps> = ({
  commodity,
  isOpen,
  onClose,
  currentUser,
  messages,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickQuestions = COMMODITY_QUICK_QUESTIONS[commodity.id] || COMMODITY_QUICK_QUESTIONS.semangka;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      senderName: `${currentUser.name} (${currentUser.role})`,
      role: currentUser.role,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    onSendMessage(userMsg);
    if (!textToSend) setInputText("");

    // Simulate smart agronomist response after short delay
    setIsTyping(true);
    setTimeout(() => {
      let reply = `Pertanyaan Anda terkait komoditas ${commodity.name} telah kami terima di sistem konsultasi lapangan SMK ATPH & PT East West Seed Indonesia.`;

      const lower = text.toLowerCase();
      if (lower.includes("cabang y") || lower.includes("tunas air")) {
        reply = "Tunas air di bawah cabang Y cabai menyerap nutrisi vegetatif dan membuat pangkal lembap. Rempel bersih tunas air sejak umur 14-21 HST agar cabang produktif Y tumbuh kokoh dan sirkulasi udara lancar.";
      } else if (lower.includes("antraknosa") || lower.includes("patek")) {
        reply = "Untuk menekan antraknosa (Colletotrichum) pada cabai: jaga jarak tanam tidak terlalu rapat, segera petik dan musnahkan buah terinfeksi di luar lahan, atur drainase bedengan, serta rotasi fungisida kontak/sistemik sesuai dosis K3.";
      } else if (lower.includes("thrips") || lower.includes("keriting")) {
        reply = "Thrips menyerang pucuk daun cabai sehingga menggulung ke atas. Gunakan mulsa PHP perak untuk memantulkan sinar UV, pasang yellow/blue sticky trap, dan pantau bagian bawah daun secara rutin.";
      } else if (lower.includes("ber") || lower.includes("ujung buah") || lower.includes("kalsium")) {
        reply = "Blossom End Rot (ujung buah tomat hitam) disebabkan defisiensi Kalsium (Ca) atau penyiraman yang tidak stabil. Jaga kelembapan tanah merata dan berikan pupuk kalsium nitrat atau dolomit sesuai SOP Job 5.";
      } else if (lower.includes("phytophthora") || lower.includes("busuk daun")) {
        reply = "Busuk daun Phytophthora berkembang cepat saat lembap tinggi. Lakukan pewiwilan daun tua dekat tanah, atur drainase parit agar tidak menggenang, dan hindari penyiraman dari atas tajuk pada sore hari.";
      } else if (lower.includes("ketiak") || lower.includes("pewiwilan")) {
        reply = "Pewiwilan tunas ketiak daun (sucker) pada tomat dilakukan pagi hari saat tunas panjangnya 3-5 cm menggunakan tangan bersih agar luka cepat kering dan energi fokus ke pembesaran buah tandan utama.";
      } else if (lower.includes("pahit") || lower.includes("bengkok")) {
        reply = "Mentimun pahit dan bengkok dipicu cekaman kekurangan air saat pembesaran buah atau pembuahan kurang sempurna. Pastikan penyiraman rutin pagi/sore dan buang tunas serta bunga ruas 1-4 bawah.";
      } else if (lower.includes("embun bulu") || lower.includes("oteng")) {
        reply = "Kumbang oteng-oteng dan embun bulu (Pseudoperonospora) dicegah dengan sanitasi gulma Cucurbitaceae, perangkap kuning, dan pangkas daun tua yang menguning bersudut agar tidak menulari sulur atas.";
      } else if (lower.includes("ruas 1-4") || lower.includes("renyah")) {
        reply = "Membuang bunga pada ruas 1-4 awal memberi waktu akar dan daun mentimun tumbuh kuat. Panen dimulai sekitar 32-38 HST pagi hari setiap 2 hari sekali sebelum biji mengeras agar buah renyah manis.";
      } else if (lower.includes("digantung") || lower.includes("ruas cabang")) {
        reply = "Pada budidaya melon sistem lanjaran vertikal, pelihara cabang lateral di ruas ke 9-12 untuk polinasi. Setelah seleksi 1 buah terbaik per tanaman (ukuran sebesar telur ayam), gantung tangkai buah dengan tali rafia ke palang ajir dan lakukan topping pucuk di daun ke 25-28.";
      } else if (lower.includes("topping") || lower.includes("pengurangan air")) {
        reply = "Topping pucuk melon dilakukan pada ruas daun ke 25-28 agar nutrisi terfokus ke pengisian buah dan pembentukan net. Sekitar 7-10 hari sebelum panen, kurangi penyiraman secara bertahap agar kadar gula (Brix) meningkat hingga 12-15% dan buah tidak pecah.";
      } else if (lower.includes("embun tepung") || lower.includes("powdery")) {
        reply = "Embun tepung (Podosphaera xanthii) berciri tepung putih di permukaan daun melon. Jaga sirkulasi udara dengan pemangkasan daun tua bawah, hindari kelembapan berlebih di sore hari, dan aplikasikan fungisida berbahan aktif sulfur/azoksistrobin secara bijak.";
      } else if (lower.includes("net") || lower.includes("melon")) {
        reply = "Melon net siap panen umur 65-75 HST ditandai jaring (netting) kulit yang tebal merata hingga ke pangkal tangkai, aroma harum khas melon, cincin pangkal tangkai mulai retak (half-slip), serta kadar gula minimal 11-13 Brix.";
      } else if (lower.includes("bunga") || lower.includes("jantan") || lower.includes("betina")) {
        reply = "Bunga betina memiliki bakal calon buah berbentuk bulat kecil berbulu di bawah pangkal mahkota, sedangkan bunga jantan hanya bertangkai ramping tanpa calon buah. Lakukan penyerbukan pukul 06.00-09.00 pagi!";
      } else if (lower.includes("dosis") || lower.includes("npk") || lower.includes("kocor")) {
        reply = "Untuk fase vegetatif (20 HST), gunakan pupuk NPK 16-16-16 dengan konsentrasi 3-5 gram per liter air. Kocor 200-250 ml per tanaman di sekitar pangkal batang tanpa mengenai daun.";
      } else if (lower.includes("brix") || lower.includes("manis") || lower.includes("panen")) {
        reply = `Pastikan panen ${commodity.name} dilakukan pada pagi hari sesuai standar kematangan komersial di Job 6 (untuk semangka minimal 10 Brix, cabai merah >85% merah merata, tomat matang warna sesuai pasar, dan mentimun renyah segar).`;
      } else if (lower.includes("kutu kebul") || lower.includes("pht") || lower.includes("hama")) {
        reply = "Untuk kutu kebul: utamakan pencegahan dengan sanitasi lahan, pasang perangkap kuning berperekat (yellow sticky trap) 4-6 unit per 100 m², dan cabut segera tanaman yang bergejala virus kuning agar tidak menulari tanaman lain.";
      }

      const botMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'instructor',
        senderName: 'Ahkam, S.Pd.Gr.,M.Pd. (Guru & Tim Pembimbing SMKNPP 5 Konawe)',
        role: 'Guru & Tim Pembimbing ATPH',
        text: reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        badge: 'SMKNPP 5 Konawe'
      };

      onSendMessage(botMsg);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[600px] overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">
                Konsultasi Lapangan · {commodity.name}
              </div>
              <div className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-300"></span>
                <span>Instruktur Agronomi & Guru ATPH Aktif</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            ✕
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 text-[11px] rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-emerald-500 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m) => {
            const isMe = m.sender === 'user';

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5 px-1">
                  <span>{m.senderName}</span>
                  <span>·</span>
                  <span>{m.timestamp}</span>
                </div>
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Instruktur sedang mengetik balasan teknis...</span>
            </div>
          )}
        </div>

        {/* Bottom Input */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Tanyakan masalah tanaman, hama, atau SOP budidaya..."
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
