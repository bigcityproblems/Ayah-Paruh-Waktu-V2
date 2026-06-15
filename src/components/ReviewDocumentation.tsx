/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SECTION_RATIONALES, CONVERSION_ANALYSIS_MARKDOWN, UX_RECOMMENDATIONS_MARKDOWN } from '../data';
import { SectionRationale } from '../types';
import { BookOpen, FileText, Layout, Lightbulb, Compass } from 'lucide-react';

interface ReviewDocumentationProps {
  activeSectionId: string;
  onSectionClick: (sectionId: string) => void;
}

export const ReviewDocumentation: React.FC<ReviewDocumentationProps> = ({
  activeSectionId,
  onSectionClick,
}) => {
  const [activeTab, setActiveTab] = React.useState<'structure' | 'analysis' | 'recommendations'>('structure');

  return (
    <div className="flex flex-col h-full bg-neutral-50 text-neutral-900 border-l border-neutral-200 overflow-hidden font-body text-base">
      {/* Title Header */}
      <div className="p-6 border-b border-neutral-200 bg-white">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="w-5 h-5 text-neutral-800" />
          <span className="font-heading tracking-widest text-xs uppercase text-neutral-500 font-bold">Campaign Blueprint</span>
        </div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-neutral-950">
          Ayah Paruh Waktu
        </h1>
        <p className="text-sm text-neutral-600 mt-1 italic">
          Wireframe Framework & Interactive UX Guidelines
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex bg-neutral-100 p-1 gap-1 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('structure')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-heading font-medium tracking-wide uppercase transition-all duration-200 rounded ${
            activeTab === 'structure'
              ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/50'
              : 'text-neutral-500 hover:text-neutral-950'
          }`}
        >
          <Layout className="w-3.5 h-3.5" />
          Structure
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-heading font-medium tracking-wide uppercase transition-all duration-200 rounded ${
            activeTab === 'analysis'
              ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/50'
              : 'text-neutral-500 hover:text-neutral-950'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Conversion
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-heading font-medium tracking-wide uppercase transition-all duration-200 rounded ${
            activeTab === 'recommendations'
              ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/50'
              : 'text-neutral-500 hover:text-neutral-950'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          UX Guide
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {activeTab === 'structure' && (
          <div className="space-y-6">
            <div className="bg-neutral-100 p-4 rounded-xs border border-neutral-200 mb-2">
              <h3 className="font-heading text-sm uppercase tracking-wider font-bold mb-1">
                About the Pacing Strategy
              </h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                This microsite leverages alternating **WHITE** and **BLACK** sections to create visual breathing rooms and emotional steps. Use the interactive scroll on the mobile mockup to see guidelines update, or click a card below to focus that section in the mockup.
              </p>
            </div>

            <div className="space-y-4">
              {SECTION_RATIONALES.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    onClick={() => onSectionClick(sec.id)}
                    className={`p-4 rounded-xs border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-white border-neutral-900 shadow-md ring-1 ring-neutral-900'
                        : 'bg-white border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-heading font-bold text-xs tracking-wider text-neutral-500">
                        {sec.id.toUpperCase().replace('-', ' ')}
                      </span>
                      <span
                        className={`text-[10px] font-heading font-bold px-1.5 py-0.5 tracking-wider uppercase border rounded-xs ${
                          sec.bg === 'WHITE'
                            ? 'bg-white text-neutral-900 border-neutral-300'
                            : 'bg-neutral-900 text-white border-black'
                        }`}
                      >
                        {sec.bg}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-neutral-950 mb-2">
                      {sec.title}
                    </h4>

                    <div className="space-y-2.5 text-xs text-neutral-700 leading-relaxed border-t border-neutral-100 pt-2">
                      <div>
                        <strong className="text-neutral-900 font-heading tracking-wider uppercase text-[10px] block">
                          Key Objective:
                        </strong>
                        {sec.objective}
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-heading tracking-wider uppercase text-[10px] block">
                          Pacing & Psychology:
                        </strong>
                        {sec.pacing}
                      </div>
                      <div>
                        <strong className="text-neutral-900 font-heading tracking-wider uppercase text-[10px] block">
                          Conversion Tactic:
                        </strong>
                        {sec.conversion}
                      </div>
                      <div className="bg-neutral-50 p-2 border-l-2 border-neutral-500 italic mt-1">
                        <strong className="text-neutral-900 font-heading tracking-wider uppercase text-[10px] block not-italic">
                          💡 UX Design Spec:
                        </strong>
                        {sec.uxRecommendation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="prose prose-neutral max-w-none text-neutral-800 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-neutral-800" />
              <h2 className="font-heading text-xl font-bold text-neutral-950 tracking-tight my-0">
                Conversion Funnel Analysis
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-neutral-700">
              Traditional conversion frameworks treat buying as a purely rational calculation of value vs. cost. However, in physical book publishing—especially surrounding high-intensity emotional topics like dysfunctional, distant, or deceased fathers—**buying is a release valve for emotional containment**.
            </p>

            <div className="border border-neutral-200 p-4 bg-white rounded-xs space-y-3">
              <h4 className="font-heading font-bold text-sm tracking-wide uppercase text-neutral-900 border-b border-neutral-100 pb-1 m-0">
                The Progressive Investment Mechanism:
              </h4>
              <ol className="list-decimal list-inside text-xs text-neutral-700 space-y-2 m-0 p-0 leading-relaxed">
                <li>
                  <strong className="text-neutral-950">Emotional Hook (Hero - Sect 01)</strong>: Avoids all sales cataloging. Matches the reader's deep internal silence.
                </li>
                <li>
                  <strong className="text-neutral-950">Intellectual Framing (Context - Sect 02)</strong>: Explains that their distant bond is a common generational design pattern, normalizing the reader's regret or longing.
                </li>
                <li>
                  <strong className="text-neutral-950">Peer Catharsis (Voices - Sect 03)</strong>: Allows the reader of anonymous posts to think, <em>"They said exactly what I felt, but of which I was ashamed to speak."</em>
                </li>
                <li>
                  <strong className="text-neutral-950">The Confessional (Writing - Sect 04)</strong>: The reader vents. Writing down their message to their father creates a profound act of closure. By hitting 'Kirim Pesan', they cross the bridge from passive reader to active co-author.
                </li>
                <li>
                  <strong className="text-neutral-950">Reciprocal Reward (Offer/Book - Sect 06-09)</strong>: To thank them for their bravery, they are handed discount codes and exclusive merchandise. This makes purchasing the actual book feel like a deserved celebration of their courage rather than an organic transaction.
                </li>
              </ol>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-neutral-700">
              <h3 className="font-heading text-lg font-bold text-neutral-950 tracking-tight mb-2">
                1. Micro-Funnel Metrics to Track
              </h3>
              <p>
                To validate the wireframe structure in digital campaigns, we must setup and gauge these distinct interactions:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs">
                <li>
                  <strong className="text-neutral-900">Scroll Velocity Marker (dwell time)</strong>: Focus heavily on section 2. Readers must take at least 15 seconds to parse the core narrative, signaling deep absorption.
                </li>
                <li>
                  <strong className="text-neutral-900">Form Conversion Index (Sect 04)</strong>: The click-through rate of submitting a message. A target rate is <b>4.5% - 6.5%</b>.
                </li>
                <li>
                  <strong className="text-neutral-900">Reward Coupon Redemptions (Sect 06)</strong>: Tracks how effectively the validation gift drives the transition from physical emotional release to commercial interest.
                </li>
                <li>
                  <strong className="text-neutral-900">Outbound Link Clicks (Sect 07 & 09)</strong>: Click-through to distribution lines (Shopee, Tokopedia, Gramedia, or directly to checkout forms). Benchmark for high-trust editorial pages is <b>8.0% - 10.5%</b>.
                </li>
              </ul>

              <h3 className="font-heading text-lg font-bold text-neutral-950 tracking-tight mt-6 mb-2">
                2. UX-Centric Safe Room Architecture
              </h3>
              <p>
                A user will only write private messages to a father if they feel safe. Standard marketing hacks are toxic here:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs">
                <li>
                  <strong className="text-neutral-900">No Countdown Timers</strong>: Scarcity counters breed commercial anxiety, breaking emotional transparency.
                </li>
                <li>
                  <strong className="text-neutral-900">Optional Identity</strong>: Allowing completely anonymous submissions preserves security.
                </li>
                <li>
                  <strong className="text-neutral-900">No Spam Assurances</strong>: WhatsApp validation markers must explicitly display micro-copy like <em>"We will never publish your number or email. This is strictly to deliver your reward and assure single-message integrity."</em>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="prose prose-neutral max-w-none text-neutral-800 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-neutral-800" />
              <h2 className="font-heading text-xl font-bold text-neutral-950 tracking-tight my-0">
                UX & Typography System
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-neutral-700">
              The visual character of a book campaign microsite determines its perceived literary authority. By utilizing a rigid **monochrome wireframe system** styled with strict font weights, we can achieve an elite, high-end editorial feel resembling contemporary cultural reviews or physical publications.
            </p>

            <div className="border-l-4 border-neutral-900 p-4 bg-neutral-100 space-y-4">
              <h3 className="font-heading font-bold text-sm tracking-wide uppercase text-neutral-950 m-0">
                The Typography Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-heading font-medium text-xs text-neutral-500 uppercase m-0">
                    Display & Headings:
                  </h4>
                  <div className="font-heading text-lg font-bold text-neutral-950 mt-1">
                    Playfair Display
                  </div>
                  <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                    A classic, elegant display serif with rich high-contrast strokes. It feels deeply literary, dramatic, and refined. Use for titles, pull-quotes, and high-impact emotional statements.
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-medium text-xs text-neutral-500 uppercase m-0">
                    Reading Prose & Body:
                  </h4>
                  <div className="font-body text-lg italic text-neutral-950 mt-1">
                    Newsreader
                  </div>
                  <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                    A gorgeous serif designed specifically for high-comfort digital editorial reading. Delicate, classic, with gorgeous italicized curves. Great for storytelling prose.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-heading text-lg font-bold text-neutral-950 tracking-tight mt-6 mb-2">
              Deep UX Directives for Development
            </h3>
            <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
              <div className="bg-white border border-neutral-200 p-3 rounded-xs">
                <strong className="text-neutral-950 block mb-1 font-heading uppercase tracking-wide text-[10px]">
                  1. The "Invisible Layout" principle
                </strong>
                The outer canvas of the site is completely secondary. Margin guides, wireframe grid columns, and hairline container dividers take the place of colorful illustrations. Every border must be exactly <code className="bg-neutral-100 px-1 py-0.2 rounded text-[10px]">1px</code> stout, colored in deep soot black (<code className="bg-neutral-100 px-1 py-0.2 rounded text-[10px]">border-neutral-900</code>) or neutral greys.
              </div>
              <div className="bg-white border border-neutral-200 p-3 rounded-xs">
                <strong className="text-neutral-950 block mb-1 font-heading uppercase tracking-wide text-[10px]">
                  2. Micro-Interactions as Comfort Anchors
                </strong>
                Avoid abrupt pops. When the user interacts with the message form, provide smooth focus transitions. When cards are liked, trigger a clean monochrome transition (increment numbers silently with absolute dignity).
              </div>
              <div className="bg-white border border-neutral-200 p-3 rounded-xs">
                <strong className="text-neutral-950 block mb-1 font-heading uppercase tracking-wide text-[10px]">
                  3. Long-Form story pacing
                </strong>
                On mobile viewports, the padding-top and padding-bottom of each section must exceed <code className="bg-neutral-100 px-1 py-0.2 rounded text-[10px]">py-16</code> (ideally <code className="bg-neutral-100 px-1 py-0.2 rounded text-[10px]">py-24 sm:py-32</code>). This creates luxurious vertical spacing that matches the margin standards of elite printed paperback books, urging the reader's breath to settle.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
