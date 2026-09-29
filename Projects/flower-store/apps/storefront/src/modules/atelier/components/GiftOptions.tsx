"use client";

import React, { useState } from "react";
import { Gift, Plus, Check } from "lucide-react";
import { AtelierImage } from "./AtelierImage";
import { FloralAddOn, AtelierCurrencyCode } from "../types";
import { formatPrice } from "@lib/util/format-price";

interface GiftOptionsProps {
  addOns: FloralAddOn[];
  currencyCode: AtelierCurrencyCode;
  giftMessage: string;
  recipientName: string;
  senderName: string;
  selectedAddOns: FloralAddOn[];
  onMessageChange: (msg: string) => void;
  onRecipientChange: (name: string) => void;
  onSenderChange: (name: string) => void;
  onToggleAddOn: (addon: FloralAddOn) => void;
}

export const GiftOptions: React.FC<GiftOptionsProps> = ({
  addOns,
  currencyCode,
  giftMessage,
  recipientName,
  senderName,
  selectedAddOns,
  onMessageChange,
  onRecipientChange,
  onSenderChange,
  onToggleAddOn,
}) => {
  const [includeGiftNote, setIncludeGiftNote] = useState(false);
  const [waxColor, setWaxColor] = useState<"sage" | "blush" | "charcoal">("sage");

  const waxStyles = {
    sage: "bg-sage text-cream",
    blush: "bg-blush text-charcoal",
    charcoal: "bg-charcoal text-cream",
  };

  return (
    <div className="bg-cream-light p-5 rounded-xs border border-sage/20 space-y-6">
      <div className="flex items-center justify-between border-b border-sage/15 pb-3">
        <div className="flex items-center gap-2 text-deep-sage">
          <Gift className="w-4 h-4 text-blush" />
          <h4 className="text-xs uppercase tracking-wider font-semibold">
            Bespoke Gifting & Additions
          </h4>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-charcoal-muted font-medium">
          Hand-Embossed Cards
        </span>
      </div>

      {/* Gift Card Toggle */}
      <div className="space-y-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeGiftNote}
            onChange={(e) => setIncludeGiftNote(e.target.checked)}
            className="w-4 h-4 rounded border-sage/30 text-deep-sage focus:ring-sage accent-deep-sage"
          />
          <span className="text-xs font-semibold text-charcoal">
            Include a Complimentary Handwritten Calligraphy Card
          </span>
        </label>

        {includeGiftNote && (
          <div className="space-y-4 pt-2 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium block mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => onRecipientChange(e.target.value)}
                  placeholder="e.g. Lady Vivienne"
                  className="w-full bg-cream border border-sage/25 rounded-xs px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-deep-sage"
                />
              </div>
              <div>
                <label className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium block mb-1">
                  Sender / Sign-off
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => onSenderChange(e.target.value)}
                  placeholder="e.g. With enduring affection, Julien"
                  className="w-full bg-cream border border-sage/25 rounded-xs px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-deep-sage"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">
                  Personal Message
                </label>
                <span className="text-[10px] text-charcoal-muted">
                  {giftMessage.length} / 250 characters
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={250}
                value={giftMessage}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder="Write your sentiments here. Our calligrapher inks each letter by hand on 350gsm cotton rag paper..."
                className="w-full bg-cream border border-sage/25 rounded-xs p-3 text-xs text-charcoal focus:outline-none focus:border-deep-sage font-serif resize-none"
              />
            </div>

            {/* Wax Seal Selector */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-wider text-charcoal-muted">
                Atelier Wax Seal:
              </span>
              <div className="flex items-center gap-2">
                {(["sage", "blush", "charcoal"] as const).map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setWaxColor(color)}
                    className={`w-5 h-5 rounded-full border transition-transform ${
                      waxColor === color ? "scale-125 ring-2 ring-deep-sage" : "opacity-70"
                    } ${color === "sage" ? "bg-sage" : color === "blush" ? "bg-blush" : "bg-charcoal"}`}
                    aria-label={`Select ${color} wax seal`}
                  />
                ))}
              </div>
            </div>

            {/* Live Calligraphy Card Preview */}
            <div className="bg-[#FAF6EE] p-5 rounded-xs border border-sage/30 shadow-xs relative overflow-hidden">
              <div className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[9px] uppercase tracking-widest font-serif font-bold shadow-xs ${waxStyles[waxColor]}`}>
                AF
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold">
                Live Inked Card Preview
              </p>
              <div className="mt-3 font-serif space-y-2">
                <p className="text-sm font-medium text-charcoal italic">
                  {recipientName ? `Dearest ${recipientName},` : "Dearest Recipient,"}
                </p>
                <p className="text-xs text-charcoal leading-relaxed whitespace-pre-wrap">
                  {giftMessage || "May these morning blooms bring peace, joy, and exquisite grace to your sanctuary."}
                </p>
                <p className="text-xs text-charcoal text-right pt-2 font-medium italic">
                  {senderName ? senderName : "— With love, Julien"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Curated Floral Add-Ons */}
      <div className="space-y-3 pt-2 border-t border-sage/15">
        <label className="text-[11px] uppercase tracking-wider text-charcoal font-semibold block">
          Curated Atelier Pairings
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {addOns.map((addon) => {
            const isSelected = selectedAddOns.some((a) => a.id === addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => onToggleAddOn(addon)}
                className={`p-2.5 rounded-xs border cursor-pointer flex items-center gap-3 transition-all ${
                  isSelected
                    ? "border-deep-sage bg-deep-sage/5"
                    : "border-sage/20 bg-cream hover:border-sage"
                }`}
              >
                <div className="relative w-12 h-12 rounded-xs overflow-hidden flex-shrink-0 bg-cream-dark">
                  <AtelierImage
                    src={addon.image}
                    alt={addon.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-charcoal truncate">{addon.title}</p>
                  <p className="text-[11px] font-semibold text-deep-sage mt-0.5">
                    +{formatPrice(addon.price, currencyCode)}
                  </p>
                </div>
                <button
                  type="button"
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isSelected ? "bg-deep-sage text-cream" : "border border-sage/40 text-charcoal hover:border-deep-sage"
                  }`}
                  aria-label={isSelected ? "Remove pairing" : "Add pairing"}
                >
                  {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
