/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  id: string;
  name: string;
  whatsapp: string;
  pesan: string;
  timestamp: string;
  likes: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  reviewer: string;
  relation: string;
}

export interface SectionRationale {
  id: string;
  title: string;
  bg: 'WHITE' | 'BLACK';
  objective: string;
  pacing: string;
  conversion: string;
  uxRecommendation: string;
}
