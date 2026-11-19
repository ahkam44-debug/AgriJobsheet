import semangkaBedenganImg from '../assets/images/semangka_lahan_bedengan_1793495390018.jpg';
import semangkaPolinasiImg from '../assets/images/semangka_polinasi_bunga_1793495389070.jpg';
import semangkaPanenImg from '../assets/images/semangka_buah_panen_1793495390052.jpg';
import cabaiLahanImg from '../assets/images/komoditas_cabai_lahan_1794575927277.jpg';
import tomatLahanImg from '../assets/images/komoditas_tomat_lahan_1794575927164.jpg';
import timunLahanImg from '../assets/images/komoditas_timun_lahan_1794575928329.jpg';
import melonLahanImg from '../assets/images/komoditas_melon_lahan_1794577049542.jpg';
import heroSmkKonaweImg from '../assets/images/hero_smk_pertanian_konawe_1794577417432.jpg';
import { CommodityId } from '../types';

export const SCHOOL_LOGO_URL = '/assets/aistudio/Logo_SMKNPP_5_KONAWE_a18c0b46.png';

export const BUNDLED_IMAGES = {
  semangkaBedengan: semangkaBedenganImg,
  semangkaPolinasi: semangkaPolinasiImg,
  semangkaPanen: semangkaPanenImg,
  cabaiLahan: cabaiLahanImg,
  tomatLahan: tomatLahanImg,
  timunLahan: timunLahanImg,
  melonLahan: melonLahanImg,
  heroSmkKonawe: heroSmkKonaweImg
};

export const COMMODITY_DEFAULT_IMAGES: Record<CommodityId, string> = {
  semangka: semangkaBedenganImg,
  cabai: cabaiLahanImg,
  tomat: tomatLahanImg,
  timun: timunLahanImg,
  melon: melonLahanImg
};

export const FIELD_IMAGE_PRESETS: { id: string; label: string; commodityId: CommodityId; url: string }[] = [
  { id: 'preset-semangka-bedengan', label: 'Bedengan Mulsa Semangka', commodityId: 'semangka', url: semangkaBedenganImg },
  { id: 'preset-semangka-polinasi', label: 'Polinasi Bunga Semangka', commodityId: 'semangka', url: semangkaPolinasiImg },
  { id: 'preset-semangka-panen', label: 'Panen Buah Semangka', commodityId: 'semangka', url: semangkaPanenImg },
  { id: 'preset-cabai-lahan', label: 'Lahan Budidaya Cabai Merah', commodityId: 'cabai', url: cabaiLahanImg },
  { id: 'preset-tomat-lahan', label: 'Lahan Budidaya Tomat Hibrida', commodityId: 'tomat', url: tomatLahanImg },
  { id: 'preset-timun-lahan', label: 'Rambatan Jaring Mentimun', commodityId: 'timun', url: timunLahanImg },
  { id: 'preset-melon-lahan', label: 'Lanjaran & Gantung Buah Melon', commodityId: 'melon', url: melonLahanImg }
];

const LEGACY_PATH_MAP: Record<string, string> = {
  '/src/assets/images/semangka_lahan_bedengan_1793495390018.jpg': semangkaBedenganImg,
  '/src/assets/images/semangka_polinasi_bunga_1793495389070.jpg': semangkaPolinasiImg,
  '/src/assets/images/semangka_buah_panen_1793495390052.jpg': semangkaPanenImg,
  '/src/assets/images/komoditas_cabai_lahan_1794575927277.jpg': cabaiLahanImg,
  '/src/assets/images/komoditas_tomat_lahan_1794575927164.jpg': tomatLahanImg,
  '/src/assets/images/komoditas_timun_lahan_1794575928329.jpg': timunLahanImg,
  '/src/assets/images/komoditas_melon_lahan_1794577049542.jpg': melonLahanImg,
  '/src/assets/images/hero_smk_pertanian_konawe_1794577417432.jpg': heroSmkKonaweImg
};

/**
 * Resolves stored or legacy raw `/src/assets/images/...` paths into Vite-bundled URLs
 * so images load reliably in both dev server and production builds.
 */
export function resolveImageUrl(url?: string, fallbackCommodityId: CommodityId = 'semangka'): string {
  if (!url || !url.trim()) {
    return COMMODITY_DEFAULT_IMAGES[fallbackCommodityId];
  }
  if (LEGACY_PATH_MAP[url]) {
    return LEGACY_PATH_MAP[url];
  }
  for (const [legacyPath, bundledUrl] of Object.entries(LEGACY_PATH_MAP)) {
    const filename = legacyPath.split('/').pop();
    if (filename && url.includes(filename)) {
      return bundledUrl;
    }
  }
  return url;
}

/**
 * Compresses an uploaded image file on an offscreen canvas (max 1280px, JPEG 0.82)
 * so high-res smartphone photos upload smoothly and persist cleanly in localStorage.
 */
export function compressImageFile(file: File, maxDimension = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.onload = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl !== 'string') {
        reject(new Error('Format file gambar tidak valid.'));
        return;
      }

      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width >= height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        try {
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        } catch {
          resolve(dataUrl);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
