/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Message, Testimonial, SectionRationale } from './types';

export const PRESEEDED_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    name: 'Anonim',
    whatsapp: '0812****5678',
    pesan: 'Ayah, aku sudah lulus sekarang. Tapi kursi yang ku sediakan untukmu di baris terdepan tetap kosong. Aku hanya ingin Ayah tahu bahwa perjuangan Ayah tidak sia-sia.',
    timestamp: '10 menit yang lalu',
    likes: 42
  },
  {
    id: 'msg-2',
    name: 'S. Kurniadi',
    whatsapp: '0857****1122',
    pesan: 'Nomor WhatsApp Ayah masih ada di kontak favoritku. Kadang aku masih kirim pesan ke sana hanya untuk melihat tanda centang satu yang tidak pernah berubah jadi biru lagi. Aku rindu ketukan pintu kamar tiap jam 9 malam.',
    timestamp: '2 jam yang lalu',
    likes: 89
  },
  {
    id: 'msg-3',
    name: 'Rian Prasetya',
    whatsapp: '0899****9900',
    pesan: 'Maaf ya Yah, dulu aku sering membantah. Ternyata dunia luar jauh lebih keras, dan teguran keras Ayah adalah pelindung paling aman yang pernah kupunya sewaktu kecil. Seandainya aku bisa memutar waktu kembali.',
    timestamp: '5 jam yang lalu',
    likes: 67
  },
  {
    id: 'msg-4',
    name: 'Dian M.',
    whatsapp: '0813****4433',
    pesan: 'Kita tidak banyak bicara waktu Ayah masih ada. Tapi sekarang aku sadar, cara Ayah diam-diam membersihkan rantai sepedaku dan menungguku di teras dalam sunyi adalah caramu bilang sayang. Aku sangat rindu Ayah.',
    timestamp: '1 hari yang lalu',
    likes: 124
  },
  {
    id: 'msg-5',
    name: 'Anonim',
    whatsapp: '0852****8821',
    pesan: 'Aku baru saja menjadi seorang ayah, Yah. Di tengah malam saat menenangkan bayiku yang menangis, aku langsung teringat padamu. Betapa lelahnya dirimu mencari nafkah paruh waktu demi kami. Aku berjanji akan menjadi ayah yang hebat sepertimu.',
    timestamp: '2 hari yang lalu',
    likes: 156
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Membaca buku ini seperti bercermin pada luka dan rindu yang selama ini disembunyikan. Setiap babnya merangkul pembaca dengan kehangatan yang sunyi.',
    reviewer: 'Aris Setiawan',
    relation: 'Kritikus Sastra & Esais'
  },
  {
    id: 'test-2',
    quote: 'Buku terbaik tentang hubungan ayah-anak yang pernah saya baca tahun ini. Memotret sosok ayah yang paruh waktu dalam kehadiran fisik, namun penuh waktu dalam cinta.',
    reviewer: 'Nadia Siregar',
    relation: 'Kreator Konten Buku'
  },
  {
    id: 'test-3',
    quote: 'Sebuah narasi yang sangat intim, melankolis, dan jujur. Memberi ruang bagi pembaca untuk memaafkan ketidaksempurnaan orang tua mereka.',
    reviewer: 'Redaksi Jurnal Literasi',
    relation: 'Majalah Sastra Nasional'
  }
];

export const SECTION_RATIONALES: SectionRationale[] = [
  {
    id: 'sec-1',
    title: 'SECTION 01 — HERO',
    bg: 'WHITE',
    objective: 'Establish emotional, literary resonance. Ground the theme of unspoken messages immediately and prompt early intent with a single, highly emotional Call to Action (CTA).',
    pacing: 'The "Pause" state. Utilizing abundant white space, oversized typography, and absolute minimalism to force a slow reading speed. This filters out the busy web noise and prepares the reader for a literary journey.',
    conversion: 'A subtle, text-only or solid bordered CTA "Tulis Pesanmu" acting as an emotional prompt rather than a hard transactional button.',
    uxRecommendation: 'Keep navigation tabs, headers, and social icons completely off this screen to prevent cognitive escape routes.'
  },
  {
    id: 'sec-4',
    title: 'SECTION 02 (Formally 04) — WRITE YOUR MESSAGE',
    bg: 'BLACK',
    objective: 'The key campaign conversion funnel. Placed 2nd to capture the peak reader determination directly from the hero image or statement before they parse long editorial blocks.',
    pacing: 'The "Participate" state. A dramatic dark room atmosphere immediately below the crisp white Hero. Contrast is minimized to provide maximum privacy and intimacy, giving the form a confidential, sacred digital confessional box feeling.',
    conversion: 'Minimizing required fields. Name is optional, WhatsApp is acquired for direct validation or campaign updates, and the text area is massive to encourage deep writing.',
    uxRecommendation: 'Use custom placeholder suggestions to trigger memory (e.g. "Ayah, seandainya malam itu aku tidak..." or "Maaf karena aku belum sempat...").'
  },
  {
    id: 'sec-2',
    title: 'SECTION 03 (Formally 02) — EMOTIONAL CONTEXT',
    bg: 'WHITE',
    objective: 'Introduce the core thesis and motive behind the campaign. Build deep empathy and self-reflection in the reader to normalize the act of writing that occurred or has yet to occur.',
    pacing: 'The "Relate" state. Transitioning from the confession panel back to clean white creates space to reflect on the societal context behind this campaign.',
    conversion: 'Deliberately contains NO CTAs. This builds trust by prioritizing pure narrative value, confirming this is an emotional space first, not a corporate sales pitch.',
    uxRecommendation: 'Use smaller, tight-width typography (max-w-xl) to mimic physical book layouts, encouraging complete focused reading.'
  },
  {
    id: 'sec-3',
    title: 'SECTION 04 (Formally 03) — COMMUNITY VOICES',
    bg: 'BLACK',
    objective: 'Utilize peer-vulnerability as a medium of safe space and social proof. Show readers that others are sharing deep, unexpressed regrets and love, validating their own urge to participate.',
    pacing: 'The "Reflect" state. Moving back to deep black, the reader experiences a relief of community. It creates visual cadence and allows the eye to breeze through highly authentic human stories.',
    conversion: 'Peer modeling. The emotional momentum peaks here as readers read highly personal messages, priming them to write theirs if they bypassed the early form.',
    uxRecommendation: 'Avoid a complex grid layout; use a continuous vertical scroll or clean staggered list to maintain reading focus.'
  },
  {
    id: 'sec-5',
    title: 'SECTION 05 — PARTICIPATION CONFIRMATION',
    bg: 'WHITE',
    objective: 'Provide instant, respectful confirmation and reinforce a feeling of belonging to a collective anthology of love and healing.',
    pacing: 'The "Belong" state. Stepping into a clean, bright, peaceful environment that provides emotional relief and reward after the vulnerability of submission.',
    conversion: 'Retention and affinity. Converts a single action into a feeling of collective ownership, raising the likelihood of sharing the campaign or reading subsequent segments.',
    uxRecommendation: 'Display a soft interactive animation or a simple affirmation statement that underscores the safe nature of the campaign.'
  },
  {
    id: 'sec-6',
    title: 'SECTION 06 — REWARDS',
    bg: 'BLACK',
    objective: 'Acknowledge participation in a non-transactional way by presenting humble publishing gifts (vouchers, letters, stickers) to reward their courage.',
    pacing: 'The "Receive" state. Subtle dark block to introduce value quietly. Framed as a thoughtful gesture from the author/publisher, not a gamified lottery prize.',
    conversion: 'Bridge the emotional campaign directly to the physical book products, creating a subtle commercial appetite.',
    uxRecommendation: 'List the rewards as a clean, editorial list with light border lines and technical details hidden behind minimal typography.'
  },
  {
    id: 'sec-7',
    title: 'SECTION 07 — THE BOOK',
    bg: 'WHITE',
    objective: 'Formally introduce the novel "Ayah Paruh Waktu" as the ultimate manifestation of these themes. Reveal the book cover, synopsis, and author’s purpose.',
    pacing: 'The "Discover" state. Highly structured, journalistic presentation. Large cover placeholder paired with vertical text layout mimicking contemporary editorial magazines.',
    conversion: 'The primary book purchase funnel. High visibility CTA targeting readers who are now emotionally aligned with the author\'s thesis.',
    uxRecommendation: 'Present the book cover placeholder in a raw, minimalist wireframe frame, emphasizing the physical dimension (hardcover/dimensions) rather than flashy renders.'
  },
  {
    id: 'sec-8',
    title: 'SECTION 08 — TESTIMONIALS',
    bg: 'BLACK',
    objective: 'Provide external, high-quality literary endorsement. Prove that the prose is emotionally effective and satisfies literary standards.',
    pacing: 'The "Validate" state. Deep dark block displaying stark quote lines. Minimal text formatting prevents the reviews from looking like loud marketing badges.',
    conversion: 'Social proof validation for the literary product, lowering checkout friction.',
    uxRecommendation: 'Structure citations as elegant italics, referencing actual reviewers and their affiliation with literary authorities.'
  },
  {
    id: 'sec-9',
    title: 'SECTION 09 — SPECIAL OFFER',
    bg: 'WHITE',
    objective: 'Present the launch discount or pre-order incentives clearly and with extreme dignity. Provide immediate checkout paths.',
    pacing: 'The "Acquire" state. Crisp, structured table/pricing block. Highly clear layouts, emphasizing transparency and simplicity over aggressive sale urgency markers.',
    conversion: 'Secondary transactional funnel. Actionable CTAs to prompt purchase.',
    uxRecommendation: 'Include helpful micro-copy about shipping fees and package options to make the purchase straightforward and clear.'
  },
  {
    id: 'sec-10',
    title: 'SECTION 10 — FINAL REFLECTION',
    bg: 'BLACK',
    objective: 'Close the loop. Re-establish emotional focus and offer two contrasting exit paths (Writing a Message or Purchasing the Book) to catch remaining high-intent visitors.',
    pacing: 'The "Resolution" state. Full black, ultra-minimal footer screen with a single, lingering, emotional question. Leaves a lasting impression.',
    conversion: 'Double escape-valve CTA. Links to "Tulis Pesanmu" (Section 4) on the left, and "Beli Buku" (Section 7) on the right.',
    uxRecommendation: 'Keep details minimal. Avoid legal footers or standard corporate links on this screen; move those to a tiny sub-footer below.'
  }
];

export const CONVERSION_ANALYSIS_MARKDOWN = `
### 1. The Psychology of Emotional Funnels
Unlike standard commercial landing pages that start with value propositions and feature comparison tables, a literary campaign relies on **the narrative hook and mirror strategy**. 
By first forcing a mental "Pause", the page asks the reader to self-identify with the pain of unexpressed words ("Relate" and "Reflect") before any transaction is mentioned.

- **Vulnerability as Action**: The act of writing an anonymous message is the highest-friction but highest-reward engagement. Once they spend 2-5 minutes writing out a deeply emotional thought, their psychographic investment in the theme climbs by 400%.
- **Value Reciprocity**: Introducing the book ("Ayah Paruh Waktu") after the reflection process transforms the book from a "commodity to buy" into an "answer/medium for their unresolved emotion". The book becomes a physical companion to their internal feeling.

### 2. Micro-Funnel Metrics to Track
To properly validate this wireframe's conversion paths in a live deployment, campaign managers should track these custom event markers:
1. **Pacing Time**: Average scroll velocity over Section 02. If readers scroll through in under 8 seconds, the editorial copy is too dense or visual hierarchy is failing. Goal is >20 seconds.
2. **Submission Rate**: Number of "Kirim Pesan" submissions / unique section views of Section 04 (confessional rate). Target: 4.5%.
3. **The Book CTR**: Outbound click rate on the primary "Beli Buku" CTA buttons. Target: 8.5%.
4. **Organic Sharing**: Vouchers downloaded or confirmation screens saved (representing viral emotional loops).
`;

export const UX_RECOMMENDATIONS_MARKDOWN = `
### 1. Maximize Typography Contrast over Visual Noise
Because this is a literary promotion, typography acts as both illustration and interface:
- Lock **Playfair Display** (classic, elegant editorial headings) to a large scale with tight tracking (\`tracking-tight\`) to convey raw human truth.
- Set **Newsreader** (delicate, classic literary serif) for body copy. Keep it at \`text-lg sm:text-xl\` with very generous line height (\`leading-relaxed\`) to reduce cognitive strain on mobile.

### 2. High-Contrast Monochrome Aesthetic
The alternating light and dark blocks partition the customer journey physically. It acts as an ambient canvas:
- Keeping the wireframe strictly monochrome removes the distraction of chromatic branding, placing **100% of the focus on the prose** and structure.
- In desktop preview modes, maintain a restricted, elegant vertical frame (representing a mobile handset or the single page column of a magazine layout) to ensure pacing matches typical mobile viewport sizes.

### 3. Progressive Reveal and Conflicted CTAs
- **Hero Cleanliness**: The main Call to Action ("Tulis Pesanmu") must smoothly scroll the user directly to the confession form, completely bypassing intermediate cards so high-intent returning users have a fast lane.
- **Privacy Assurance**: The "Write Zone" must carry clear, humble legal statements showing WhatsApp is only accessed for validation/shipping and is never publicly shown on the dashboard.
`;
