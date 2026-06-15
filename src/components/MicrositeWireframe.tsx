/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRESEEDED_MESSAGES } from '../data';
import { Message } from '../types';
import { db } from '../firebase';
import { 
  doc, 
  setDoc
} from 'firebase/firestore';
import { 
  Heart, 
  Send, 
  CheckCircle, 
  Gift, 
  Book, 
  Phone, 
  Copy, 
  Check, 
  Instagram, 
  ArrowRight,
  Sparkles,
  RefreshCw,
  Mail,
  User,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

interface MicrositeWireframeProps {
  onActiveSectionChange?: (sectionId: string) => void;
  scrollTriggerId?: string | null;
  onScrollHandled?: () => void;
}

export const MicrositeWireframe: React.FC<MicrositeWireframeProps> = ({
  onActiveSectionChange,
  scrollTriggerId = null,
  onScrollHandled,
}) => {
  // --- STATE ---
  const [scrollY, setScrollY] = useState(0);
  const [archiveMessages, setArchiveMessages] = useState<Message[]>([]);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(3);

  const [currentSubmissionId, setCurrentSubmissionId] = useState<string | null>(null);
  
  // Section 2 state (Tulis pesan - limit 280)
  const [sec2Pesan, setSec2Pesan] = useState('Aku mau Ayah Paruh Waktu');
  const [sec2Error, setSec2Error] = useState('');
  const [sec2Submitted, setSec2Submitted] = useState(false);
  const [sec2Submitting, setSec2Submitting] = useState(false);
  const [sec2Step, setSec2Step] = useState<1 | 2>(1);

  // Fields for sender profile
  const [sec3Nama, setSec3Nama] = useState('');
  const [sec3Email, setSec3Email] = useState('');
  const [sec3Instagram, setSec3Instagram] = useState('');
  const [sec3TikTok, setSec3TikTok] = useState('');

  // Section 4 state (Masukkan No. HP)
  const [sec4Phone, setSec4Phone] = useState('');
  const [sec4Error, setSec4Error] = useState('');
  const [sec4Submitted, setSec4Submitted] = useState(false);
  const [sec4Submitting, setSec4Submitting] = useState(false);

  // Section 5 Voucher Modal status
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [activePart, setActivePart] = useState<1 | 2 | 3>(1);

  // Scroll listener for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // References to sections for manual scrolling
  const sectionRefs = {
    'sec-1': useRef<HTMLDivElement>(null),
    'sec-2': useRef<HTMLDivElement>(null),
    'sec-book-info': useRef<HTMLDivElement>(null),
  };

  // Persists local storage states
  useEffect(() => {
    const savedPesan = localStorage.getItem('ay_sec2_pesan');
    if (savedPesan) {
      setSec2Pesan(savedPesan);
    }
    const savedSubId = localStorage.getItem('ay_submission_id');
    if (savedSubId) {
      setCurrentSubmissionId(savedSubId);
    }
    const savedSec3 = localStorage.getItem('ay_sec3_data');
    if (savedSec3) {
      try {
        const parsed = JSON.parse(savedSec3);
        setSec3Nama(parsed.nama || '');
        setSec3Email(parsed.email || '');
        setSec3Instagram(parsed.instagram || '');
        setSec3TikTok(parsed.tiktok || '');
      } catch (e) {}
    }
    localStorage.removeItem('ay_sec4_phone');

    // Load custom community messages archive
    const savedArchive = localStorage.getItem('ay_archive_messages');
    if (savedArchive) {
      try {
        setArchiveMessages(JSON.parse(savedArchive));
      } catch (e) {
        setArchiveMessages(PRESEEDED_MESSAGES);
      }
    } else {
      setArchiveMessages(PRESEEDED_MESSAGES);
    }

    // Load likedMap
    const savedLikes = localStorage.getItem('ay_liked_messages');
    if (savedLikes) {
      try {
        setLikedMap(JSON.parse(savedLikes));
      } catch (e) {}
    }

  }, []);

  const saveArchive = (messagesList: Message[]) => {
    setArchiveMessages(messagesList);
    localStorage.setItem('ay_archive_messages', JSON.stringify(messagesList));
  };

  const handleLikeMessage = (msgId: string) => {
    const isAlreadyLiked = likedMap[msgId];
    const newLikedMap = { ...likedMap, [msgId]: !isAlreadyLiked };
    setLikedMap(newLikedMap);
    localStorage.setItem('ay_liked_messages', JSON.stringify(newLikedMap));

    const updated = archiveMessages.map(msg => {
      if (msg.id === msgId) {
        return {
          ...msg,
          likes: isAlreadyLiked ? msg.likes - 1 : msg.likes + 1
        };
      }
      return msg;
    });
    saveArchive(updated);
  };

  // --- HANDLERS ---
  const handleSec2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSec2Error('');

    if (!sec3Nama.trim()) {
      setSec2Error('Nama lengkap wajib diisi.');
      return;
    }
    if (!sec3Email.trim()) {
      setSec2Error('Alamat email wajib diisi.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(sec3Email)) {
      setSec2Error('Format email Anda tampak tidak sah.');
      return;
    }

    setSec2Submitting(true);
    setTimeout(async () => {
      localStorage.setItem('ay_sec2_pesan', 'Aku mau Ayah Paruh Waktu');
      
      const finalNama = sec3Nama.trim() || 'Anonymous';

      const data = {
        nama: finalNama,
        email: sec3Email.trim(),
        instagram: sec3Instagram,
        tiktok: sec3TikTok
      };
      localStorage.setItem('ay_sec3_data', JSON.stringify(data));
      
      const newMsg: Message = {
        id: `user-msg-${Date.now()}`,
        name: finalNama,
        whatsapp: sec4Phone.trim() ? `${sec4Phone.trim().slice(0, 4)}****${sec4Phone.trim().slice(-4)}` : '0812****5678',
        pesan: 'Aku mau Ayah Paruh Waktu',
        timestamp: 'Baru saja',
        likes: 0
      };

      const updatedList = [newMsg, ...archiveMessages];
      saveArchive(updatedList);

      // Save to Firestore securely in background!
      const subId = `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const docData = {
        nama: finalNama,
        email: sec3Email.trim(),
        instagram: sec3Instagram.trim(),
        tiktok: sec3TikTok.trim(),
        pesan: 'Aku mau Ayah Paruh Waktu',
        noTelfon: "", // will be updated in Section 4
        timestamp: Date.now()
      };
      try {
        await setDoc(doc(db, 'submissions', subId), docData);
        setCurrentSubmissionId(subId);
        localStorage.setItem('ay_submission_id', subId);
      } catch (err) {
        console.error("Error saving submission context to Firestore:", err);
      }

      setSec2Submitted(true);
      setSec2Submitting(false);
      try {
        window.open('https://wa.me/62882006146395?text=Aku%20mau%20Ayah%20Paruh%20Waktu', '_blank');
      } catch (e) {
        console.error("Popup blocked:", e);
      }
      // Auto scroll to Section Book Info snappier and faster
      setTimeout(() => {
        scrollToSection('sec-book-info');
      }, 150);
    }, 400);
  };

  const handleSec4Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSec4Error('');

    const trimmedPhone = sec4Phone.trim().replace(/\D/g, '');
    if (!trimmedPhone) {
      setSec4Error('Masukkan nomor telepon/HP aktif Anda.');
      return;
    }
    if (trimmedPhone.length < 9 || trimmedPhone.length > 15) {
      setSec4Error('Masukkan format nomor HP yang valid (9 s.d. 15 digit angka).');
      return;
    }

    setSec4Submitting(true);
    setTimeout(async () => {
      localStorage.setItem('ay_sec4_phone', sec4Phone);

      // Update phone/whatsapp mask in archive if user message exists
      const masked = `${trimmedPhone.slice(0, 4)}****${trimmedPhone.slice(-4)}`;
      const updated = archiveMessages.map(msg => {
        if (msg.id.startsWith('user-msg-')) {
          return { ...msg, whatsapp: masked };
        }
        return msg;
      });
      saveArchive(updated);

      // Link/Update phone number in Firestore securely!
      const savedSubId = currentSubmissionId || localStorage.getItem('ay_submission_id');
      if (savedSubId) {
        try {
          await setDoc(doc(db, 'submissions', savedSubId), {
            noTelfon: trimmedPhone
          }, { merge: true });
        } catch (err) {
          console.error("Error updating phone in Firestore:", err);
        }
      } else {
        const finalNama = sec3Nama.trim() || 'Anonymous';
        const docData = {
          nama: finalNama,
          email: sec3Email.trim(),
          instagram: sec3Instagram.trim(),
          tiktok: sec3TikTok.trim(),
          pesan: sec2Pesan.trim() || "(Belum mengisi pesan)",
          noTelfon: trimmedPhone,
          timestamp: Date.now()
        };
        const subId = `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        try {
          await setDoc(doc(db, 'submissions', subId), docData);
          setCurrentSubmissionId(subId);
          localStorage.setItem('ay_submission_id', subId);
        } catch (err) {
          console.error("Error saving submission with phone context to Firestore:", err);
        }
      }

      setSec4Submitted(true);
      setSec4Submitting(false);
      // Auto scroll to book info section
      setTimeout(() => {
        scrollToSection('sec-book-info');
      }, 800);
    }, 1000);
  };

  const copyVoucherCode = () => {
    navigator.clipboard.writeText('UANGJAJANAYAH20');
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  // Scroll Helper to elements
  const scrollToSection = (id: 'sec-1' | 'sec-2' | 'sec-book-info') => {
    const element = sectionRefs[id].current;
    if (element) {
      // First immediate scroll
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Secondary fallback scrolls to account for layout updates, image loads, and state-induced height changes
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 400);

      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 800);
    }
  };

  // --- SCROLL WATCHER ---
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-sec-id');
          if (id) {
            onActiveSectionChange?.(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle external scroll trigger safely
  useEffect(() => {
    if (scrollTriggerId) {
      const ref = sectionRefs[scrollTriggerId as keyof typeof sectionRefs];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      onScrollHandled?.();
    }
  }, [scrollTriggerId]);

  // Dynamic parallax calculations for Section 1
  const heroOpacity = Math.max(0, 1 - scrollY / 650);
  const heroScale = Math.max(0.92, 1 - (scrollY / 1200) * 0.08);
  const heroTranslateY = scrollY * 0.35; 

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-start select-text selection:bg-neutral-900 selection:text-white md:py-6 antialiased overflow-x-hidden">
      
      {/* Standalone Mobile Container */}
      <div className="w-full max-w-md bg-transparent md:rounded-lg border-x border-neutral-900 shadow-2xl overflow-x-hidden min-h-screen relative flex flex-col">
        
        {/* --- SECTION 1 - HERO BANNER --- */}
        <section
          ref={sectionRefs['sec-1']}
          data-sec-id="sec-1"
          className="text-neutral-950 px-6 pt-5 pb-20 flex flex-col justify-between border-b border-neutral-200 sticky top-0 h-[100vh] z-0 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://res.cloudinary.com/dkhf63xbe/image/upload/v1781407559/APW_bg_xs3miv.png')"
          }}
          id="sec-1"
        >
          <div 
            className="flex flex-col justify-between h-full w-full relative"
            style={{
              opacity: heroOpacity,
              transform: `scale(${heroScale}) translateY(${heroTranslateY}px)`,
              transformOrigin: 'center bottom'
            }}
          >
            {/* Top-right Social Links */}
            <div className="absolute top-0 right-0 flex items-center gap-1.5 z-20">
              <a 
                href="https://www.instagram.com/ayahparuhwaktu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 text-white hover:text-neutral-300 transition-colors pointer-events-auto"
                aria-label="Instagram"
                id="hero-instagram-link"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@ayahparuhwaktu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-1.5 text-white hover:text-neutral-300 transition-colors pointer-events-auto"
                aria-label="TikTok"
                id="hero-tiktok-link"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                </svg>
              </a>
            </div>

            <div className="text-center pt-4">
              <div className="flex justify-center">
                <img 
                  src="https://res.cloudinary.com/dkhf63xbe/image/upload/v1778047461/apw-horizontal_draa4d.svg" 
                  alt="Ayah Paruh Waktu" 
                  className="h-16 w-auto object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="my-auto flex flex-col items-center justify-center">
              <p className="font-heading text-[27px] leading-[31.5px] tracking-wide text-neutral-200 font-medium text-center mb-5">
                Separuh Waktu. Sepenuh Hati.
              </p>
              <img
                src="https://res.cloudinary.com/dkhf63xbe/image/upload/v1778053561/apwbook_chr7lq.png"
                alt="Buku Ayah"
                className="max-h-[42vh] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                referrerPolicy="no-referrer"
              />
              <p className="font-body text-[18px] text-white italic text-center mt-5 pb-0 mb-0 px-4 leading-normal w-full">
                Tentang ayah yang hadir — meski tidak selalu utuh.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex flex-col gap-3.5">
                <button
                  onClick={() => window.open('https://wa.me/62882006146395?text=Aku%20mau%20Ayah%20Paruh%20Waktu', '_blank')}
                  className="w-full border border-white bg-white text-black font-sans font-bold tracking-wider py-4 text-[15px] leading-[10.5px] transition duration-150 hover:bg-neutral-100 active:scale-[0.98] cursor-pointer text-center block rounded-xs"
                >
                  Beli Sekarang
                </button>
                <button
                  onClick={() => scrollToSection('sec-book-info')}
                  className="w-full text-white font-sans font-medium tracking-widest py-2 text-[11px] hover:underline transition duration-150 active:scale-[0.98] cursor-pointer text-center block"
                >
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION BOOK INFO (WHITE) --- */}
        <section
          ref={sectionRefs['sec-book-info']}
          id="sec-book-info"
          data-sec-id="sec-book-info"
          className="bg-white text-neutral-950 px-6 pt-12 pb-8 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dkhf63xbe/image/upload/v1781516911/papertexture_ylataw.png')"
          }}
        >
          <div className="space-y-6 text-left">
            <h2 className="font-body text-[22px] leading-[32px] text-neutral-950 font-normal italic pr-2 px-2 text-center">
              <span className="font-bold">Ayah Paruh Waktu</span> adalah buku tentang sosok ayah yang tidak selalu pandai bicara, tetapi sering kali menyimpan begitu banyak cinta dalam diam.
            </h2>

            <div className="flex justify-center my-4">
              <img
                src="https://res.cloudinary.com/dkhf63xbe/image/upload/v1781097468/Cover-Ayah-Paruh-Waktu_c4osnj.png"
                alt="Cover Buku Ayah Paruh Waktu"
                className="max-h-[40vh] w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] rounded-sm"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 pt-2">
              <a
                href="https://wa.me/62882006146395?text=Aku%20mau%20Ayah%20Paruh%20Waktu"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-sampel-buku"
                className="w-full border border-[#2f3a8a] bg-[#2f3a8a] text-white font-sans font-bold tracking-wider py-4 text-xs transition duration-150 cursor-pointer flex items-center justify-center gap-2 rounded-xs hover:bg-[#212963] hover:border-[#212963] active:scale-[0.98]"
              >
                <span className="text-[15px] leading-[10px]">Dapatkan diskon tambahan</span>
              </a>

              {/* 1px horizontal line as wide as the button */}
              <div className="border-t border-neutral-200 w-full my-4" />

              {/* Three redesigned rectangular marketplace buttons, stacked vertically */}
              <div className="space-y-3">
                <a
                  href="https://shopee.co.id/product/777920279/51212083878/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-shopee-m"
                  className="w-full border border-neutral-200 hover:border-[#2f3a8a] hover:bg-neutral-50 transition duration-150 cursor-pointer flex items-center h-12 rounded-sm active:scale-[0.99] overflow-hidden group"
                >
                  <div className="w-14 h-full flex items-center justify-center shrink-0">
                    <img
                      src="https://bentangpustaka.com/wp-content/uploads/2022/12/shoppe-bentang-180x180.png"
                      alt="Shopee"
                      className="h-6 w-auto object-contain transition duration-150 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-px h-6 bg-neutral-200" />
                  <div className="flex-1 text-center pr-14 font-sans font-semibold text-[15px] text-neutral-800 tracking-wider">
                    Shopee
                  </div>
                </a>

                <a
                  href="https://www.tokopedia.com/bentangpustakaofficial/buku-ayah-paruh-waktu-kurniawan-gunadi-bentang-pustaka-1736047117312951353"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-tokopedia-m"
                  className="w-full border border-neutral-200 hover:border-[#2f3a8a] hover:bg-neutral-50 transition duration-150 cursor-pointer flex items-center h-12 rounded-sm active:scale-[0.99] overflow-hidden group"
                >
                  <div className="w-14 h-full flex items-center justify-center shrink-0">
                    <img
                      src="https://bentangpustaka.com/wp-content/uploads/2022/12/Daco_4508236-2-180x180.png"
                      alt="Tokopedia"
                      className="h-6 w-auto object-contain transition duration-150 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-px h-6 bg-neutral-200" />
                  <div className="flex-1 text-center pr-14 font-sans font-semibold text-[15px] text-neutral-800 tracking-wider">
                    Tokopedia
                  </div>
                </a>

                <a
                  href="https://shop-id.tokopedia.com/view/product/1736047117312951353?encode_params=MIIBTAQM5vXOfNis5th8fp9tBIIBKGO2yXUHw5MSIebeHHkvmRava_xMpj27HMBGSrrQ76W7KGuPOWTV7TF4ft34h7248o_dY35kuwww177UeMJnsF7MU4ldLd22h0893i9d9oelDPXN8ctYDzy0y5YRDccJ3OESSq2nMr_2sUPOm3yMDUAgJOAON9WJmRH_xCqkTmZ7fOXR_p_rex5O8cKiuFUcPWu-D4XkNDilzVYHhXI62oS2ukn3MrnTylfSdjV4PHAAyaNrKXReM5v4Dk4LEvZoDnVFdy7hsOOskdRjGGR4x8PaweO-ZvVOnHUbLk973BukeheM_DouAraqy2Csaf0O8wnne8cKRtm8plXRIqg6XzY0LB-_X_SJPvU5dj31sWRFeIwvQebMjyo8ld5qu9RjiGwmUPA7GJG7BBB52FFkjXSQ6JjRoL6LnC50&region=ID&locale=id-ID&source=seller_center&hide_tips=&no-cache=1&e=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="btn-tiktok-m"
                  className="w-full border border-neutral-200 hover:border-[#2f3a8a] hover:bg-neutral-50 transition duration-150 cursor-pointer flex items-center h-12 rounded-sm active:scale-[0.99] overflow-hidden group"
                >
                  <div className="w-14 h-full flex items-center justify-center shrink-0">
                    <img
                      src="https://bentangpustaka.com/wp-content/uploads/2026/04/1714299307tiktok-shop-icon-png-883x1030.png"
                      alt="TikTok"
                      className="h-6 w-auto object-contain transition duration-150 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-px h-6 bg-neutral-200" />
                  <div className="flex-1 text-center pr-14 font-sans font-semibold text-[15px] text-neutral-800 tracking-wider">
                    TikTok
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- PARALLAX DIVIDER SECTION (BALANCED HEIGHT, FIXED BACKGROUND) --- */}
        <div 
          className="w-full h-[50vh] relative z-0 pointer-events-none bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dkhf63xbe/image/upload/v1781437845/BGPARALAX_xf9oz2.png')"
          }}
        />

        {/* --- SECTION 2 (BLUE AS FOOTER) --- */}
        <section
          ref={sectionRefs['sec-2']}
          data-sec-id="sec-2"
          className="text-white px-6 py-20 relative z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] border-b border-black min-h-[50vh] flex flex-col justify-center items-center bg-cover bg-center"
          style={{
            backgroundColor: "#2f3a8a",
            backgroundImage: "url('https://res.cloudinary.com/dkhf63xbe/image/upload/v1781407559/bgbiru_zz67oz.png')"
          }}
          id="sec-2"
        >
          <div className="max-w-xl w-full text-center space-y-8 flex flex-col items-center">
            <div className="space-y-3.5 text-left w-full">
              <h2 className="font-heading text-[39px] leading-tight text-white font-medium tracking-wide animate-fadeIn text-left">
                Jangan sampai ketinggalan cerita berikutnya.
              </h2>
              <p className="font-heading text-[18px] text-white/90 leading-relaxed font-light italic animate-fadeIn text-left">
                Ikuti Ayah Paruh Waktu di Instagram dan TikTok.
              </p>
            </div>

            {/* Pill-styled social buttons aligned to full width of the web content */}
            <div className="flex flex-col gap-3.5 w-full mt-2 animate-fadeIn">
              <a
                href="https://www.instagram.com/ayahparuhwaktu"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-btn-instagram"
                className="inline-flex items-center justify-center gap-2.5 w-full py-4 border-2 border-white bg-transparent text-white font-sans font-bold text-[15px] tracking-widest rounded-full hover:bg-white hover:text-[#2f3a8a] transition duration-150 cursor-pointer active:scale-[0.98] select-none"
              >
                <Instagram className="w-5 h-5 flex-shrink-0" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.tiktok.com/@ayahparuhwaktu"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-btn-tiktok"
                className="inline-flex items-center justify-center gap-2.5 w-full py-4 border-2 border-white bg-transparent text-white font-sans font-bold text-[15px] tracking-widest rounded-full hover:bg-white hover:text-[#2f3a8a] transition duration-150 cursor-pointer active:scale-[0.98] select-none"
              >
                <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                </svg>
                <span>TikTok</span>
              </a>
            </div>

            {/* Copyright Label */}
            <div className="pt-2 text-white/50 text-[13px] tracking-widest font-sans uppercase animate-fadeIn mt-4 select-none">
              Ayah Paruh Waktu 2026
            </div>
          </div>
        </section>

      </div>

      {/* --- RECONCILED DIALOUGE / MODAL POP OVER FOR THE DISKONYA --- */}
      <AnimatePresence>
        {showVoucherModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 select-text">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white text-neutral-950 w-full max-w-xs md:max-w-sm rounded-lg overflow-hidden border border-neutral-200 shadow-2xl relative"
            >
              
              {/* Nostalgic vintage receipt line */}
              <div className="bg-neutral-950 text-white px-4 py-3 flex justify-between items-center text-[10px] font-heading tracking-wider">
                <span>Resi Kasih Sayang</span>
                <span>No. 1994-P/A</span>
              </div>

              <div className="p-6 space-y-6 text-center">
                <Gift className="w-10 h-10 text-neutral-900 mx-auto stroke-1 animate-bounce" />
                
                <div className="space-y-2">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-neutral-900">Kupon Diskon Spesial</h3>
                  <p className="font-body text-xs text-neutral-500 leading-relaxed px-2">
                    Gunakan voucher rahasia ini untuk pemesanan Novel "Ayah Paruh Waktu" dan nikmati kenangan yang tersesat di lembaran bukunya.
                  </p>
                </div>

                {/* Ticket Body mock */}
                <div className="border border-dashed border-neutral-300 p-4 bg-neutral-50 rounded-md relative overflow-hidden">
                  
                  {/* Left & Right ticket punch holes */}
                  <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-white border border-neutral-200"></div>
                  <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white border border-neutral-200"></div>

                  <div className="text-[10px] font-heading text-neutral-500 tracking-wider">Potongan Belanja</div>
                  <div className="font-heading font-bold text-3xl text-neutral-900 mt-1">Diskon 20%</div>
                  <div className="font-body text-[10px] text-neutral-400 mt-1 italic">+ Bonus Bookmark Kulit Eksklusif</div>

                  <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-neutral-700 bg-neutral-200/60 px-3 py-1 rounded-sm tracking-wider">
                      UANGJAJANAYAH20
                    </span>

                    <button
                      onClick={copyVoucherCode}
                      className="px-2.5 py-1.5 bg-neutral-900 text-white hover:bg-neutral-800 transition rounded-xs flex items-center gap-1 text-[9px] font-heading tracking-wider"
                    >
                      {copiedVoucher ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      window.open('https://wa.me/62882006146395?text=Aku%20mau%20Ayah%20Paruh%20Waktu', '_blank');
                    }}
                    className="w-full bg-neutral-950 text-white font-heading text-[10px] tracking-wider font-bold py-3 hover:bg-neutral-800 transition flex items-center justify-center gap-1.5"
                  >
                    <span>Pesan via WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                  
                  <button
                    onClick={() => setShowVoucherModal(false)}
                    className="text-[10px] text-neutral-400 font-heading tracking-wider hover:text-neutral-950 transition block mx-auto py-1"
                  >
                    Tutup Lembaran
                  </button>
                </div>
              </div>

              {/* Stub Footer */}
              <div className="px-4 py-2 border-t border-neutral-100 text-center text-[8px] font-mono text-neutral-400 tracking-wider bg-neutral-50/50">
                Novel "Ayah Paruh Waktu" • Penerbit Bentang Pustaka
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
