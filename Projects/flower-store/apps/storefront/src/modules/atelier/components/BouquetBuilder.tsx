"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Check, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { AtelierImage } from "./AtelierImage";
import { GiftOptions } from "./GiftOptions";
import { DeliverySelector } from "./DeliverySelector";
import { useAtelier } from "../context/AtelierContext";
import { formatPrice } from "@lib/util/format-price";
import { addCustomBouquetToCart } from "@lib/data/cart";
import {
  StemOption,
  FloralAddOn,
  FloralCustomMetadata,
  AtelierCurrencyCode,
  DeliveryWindow,
} from "../types";

const BOUQUET_SIZES = [
  { id: "size-petite", title: "Petite", stems: 18, description: "Intimate and delicate arrangement" },
  { id: "size-signature", title: "Signature", stems: 32, description: "Our iconic luxury atelier volume", recommended: true },
  { id: "size-grand", title: "Grand Luxe", stems: 48, description: "Monumental, opulent statement" },
  { id: "size-sovereign", title: "Sovereign", stems: 70, description: "Supreme abundance for grand salons" },
];

const WRAPS = [
  { id: "Signature Botanical Kraft", title: "Botanical Kraft & Raffia" },
  { id: "French Belgian Linen", title: "Pressed French Belgian Linen" },
  { id: "Raw Sage Silk Ribbon", title: "Hand-Dyed Sage Silk Ribbon" },
  { id: "Atelier Presentation Box", title: "Embossed Atelier Presentation Box" },
] as const;

function stemAllocations(
  selected: string[],
  total: number
): { handle: string; count: number }[] {
  if (!selected.length) return [];
  const base = Math.floor(total / selected.length);
  const remainder = total - base * selected.length;
  return selected.map((handle, i) => ({
    handle,
    count: base + (i < remainder ? 1 : 0),
  }));
}

interface BouquetBuilderProps {
  stems: StemOption[];
  addOns: FloralAddOn[];
  currencyCode: AtelierCurrencyCode;
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({
  stems,
  addOns,
  currencyCode,
}) => {
  const router = useRouter();
  const { countryCode } = useParams() as { countryCode: string };
  const { showToast } = useAtelier();

  const [step, setStep] = useState(1);
  const [selectedStems, setSelectedStems] = useState<string[]>(
    stems.slice(0, 3).map((s) => s.handle)
  );
  const [selectedSizeId, setSelectedSizeId] = useState("size-signature");
  const [selectedWrap, setSelectedWrap] = useState<string>("French Belgian Linen");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [note, setNote] = useState("");
  const [selectedAddOns, setSelectedAddOns] = useState<FloralAddOn[]>([]);
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  });
  const [deliveryWindow, setDeliveryWindow] = useState<DeliveryWindow>(
    "Morning (9:00 - 13:00)"
  );
  const [isCommissioning, setIsCommissioning] = useState(false);

  const stemMap = new Map(stems.map((s) => [s.handle, s]));
  const sizeObj = BOUQUET_SIZES.find((s) => s.id === selectedSizeId)!;
  const wrapObj = WRAPS.find((w) => w.id === selectedWrap);

  const allocations =
    selectedStems.length > 0 ? stemAllocations(selectedStems, sizeObj.stems) : [];

  const stemTotal = allocations.reduce((sum, a) => {
    const stem = stemMap.get(a.handle);
    return sum + (stem ? stem.pricePerStem * a.count : 0);
  }, 0);

  const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const calculatedTotal = stemTotal + addOnTotal;

  const toggleStem = (handle: string) => {
    if (selectedStems.includes(handle)) {
      if (selectedStems.length > 1) {
        setSelectedStems(selectedStems.filter((h) => h !== handle));
      }
    } else if (selectedStems.length < 4) {
      setSelectedStems([...selectedStems, handle]);
    }
  };

  const toggleAddOn = (addon: FloralAddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const previewImage =
    stems.find((s) => s.handle === selectedStems[0])?.image ||
    stems[0]?.image ||
    "";

  const handleFinish = async () => {
    const items = [
      ...allocations.map((a) => {
        const stem = stemMap.get(a.handle);
        return { variantId: stem?.variantId ?? "", quantity: a.count };
      }),
      ...selectedAddOns.map((a) => ({ variantId: a.variantId, quantity: 1 })),
    ].filter((i) => i.variantId);

    if (!items.length) {
      showToast("Nothing Selected", "Please select at least one stem variety.");
      return;
    }

    const metadata: FloralCustomMetadata = {
      is_custom_bouquet: true,
      wrap_option: selectedWrap,
      delivery_date: deliveryDate,
      delivery_window: deliveryWindow,
      ...(recipient ? { gift_recipient: recipient } : {}),
      ...(sender ? { gift_sender: sender } : {}),
      ...(note ? { gift_message: note } : {}),
      stems_breakdown: allocations.map((a) => ({
        name: stemMap.get(a.handle)?.name ?? a.handle,
        count: a.count,
      })),
      add_on_items: selectedAddOns.map((a) => ({ title: a.title, price: a.price })),
    };

    setIsCommissioning(true);
    try {
      await addCustomBouquetToCart({
        countryCode,
        items,
        metadata: metadata as Record<string, unknown>,
      });
      showToast(
        "Custom Commission Assembled",
        `Your ${sizeObj.title} bespoke bouquet has been added to your floral bag.`
      );
      router.push(`/${countryCode}/cart`);
    } catch {
      showToast(
        "Could Not Commission",
        "There was a problem preparing your bouquet. Please try again."
      );
    } finally {
      setIsCommissioning(false);
    }
  };

  return (
    <div className="bg-cream py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-blush/30 px-3 py-1 rounded-full text-deep-sage text-[11px] uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-sage" />
            <span>Interactive Atelier Studio</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Bespoke Bouquet Builder
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted font-sans">
            Collaborate directly with our studio. Select your floral palette,
            scale, tactile wrap, and personal handwritten letter.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-sage/20 -z-0" />
            {[
              { num: 1, label: "Flowers" },
              { num: 2, label: "Size" },
              { num: 3, label: "Wrap" },
              { num: 4, label: "Note" },
              { num: 5, label: "Delivery" },
            ].map((s) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <button
                  key={s.num}
                  onClick={() => setStep(s.num)}
                  className="flex flex-col items-center gap-1.5 bg-cream px-2 z-10 focus:outline-none"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-deep-sage text-cream ring-4 ring-sage/20"
                        : isPast
                        ? "bg-sage text-cream"
                        : "bg-cream-dark text-charcoal-muted border border-sage/30"
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : `0${s.num}`}
                  </div>
                  <span
                    className={`text-[11px] uppercase tracking-wider font-semibold ${
                      isActive ? "text-deep-sage" : "text-charcoal-muted"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 bg-cream-light p-6 sm:p-8 rounded-xs border border-sage/20 space-y-8 shadow-sm">
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl text-deep-sage font-medium">
                    01. Select Your Floral Palette
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Select up to 4 stem varieties. Our master florists will
                    balance textures and cascading volume.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stems.map((stem) => {
                    const isSelected = selectedStems.includes(stem.handle);
                    return (
                      <div
                        key={stem.handle}
                        onClick={() => toggleStem(stem.handle)}
                        className={`p-3 rounded-xs border cursor-pointer flex items-center gap-3 transition-all ${
                          isSelected
                            ? "border-deep-sage bg-deep-sage/5 shadow-xs"
                            : "border-sage/20 bg-cream hover:border-sage"
                        }`}
                      >
                        <div className="relative w-14 h-14 rounded-xs overflow-hidden flex-shrink-0 bg-cream-dark">
                          <AtelierImage
                            src={stem.image}
                            alt={stem.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-charcoal truncate">
                            {stem.name}
                          </p>
                          <p className="text-[11px] text-charcoal-muted line-clamp-1">
                            {stem.description}
                          </p>
                          <span className="text-[11px] font-semibold text-deep-sage">
                            {formatPrice(stem.pricePerStem, currencyCode)} / stem
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isSelected ? "bg-deep-sage text-cream" : "border border-sage/40"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl text-deep-sage font-medium">
                    02. Select Arrangement Scale
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Choose stem count and visual presence for the bouquet.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BOUQUET_SIZES.map((size) => {
                    const isSelected = selectedSizeId === size.id;
                    return (
                      <div
                        key={size.id}
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`p-5 rounded-xs border cursor-pointer transition-all ${
                          isSelected
                            ? "border-deep-sage bg-deep-sage/5 ring-1 ring-deep-sage shadow-xs"
                            : "border-sage/20 bg-cream hover:border-sage"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-editorial text-xl font-medium text-charcoal">
                            {size.title}
                          </h4>
                          {size.recommended && (
                            <span className="text-[9px] uppercase tracking-widest font-semibold bg-blush px-2 py-0.5 rounded-full text-charcoal">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-deep-sage">
                          {size.stems} Hand-Cut Stems
                        </p>
                        <p className="text-xs text-charcoal-muted mt-1">
                          {size.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl text-deep-sage font-medium">
                    03. Finishing &amp; Wrap
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Select tactile exterior presentation for recipient unboxing.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {WRAPS.map((wrap) => {
                    const isSelected = selectedWrap === wrap.id;
                    return (
                      <div
                        key={wrap.id}
                        onClick={() => setSelectedWrap(wrap.id)}
                        className={`p-4 rounded-xs border cursor-pointer flex items-center justify-between transition-all ${
                          isSelected
                            ? "border-deep-sage bg-deep-sage/5 font-medium"
                            : "border-sage/20 bg-cream hover:border-sage"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? "border-deep-sage bg-deep-sage text-cream"
                                : "border-sage/40"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </div>
                          <span className="text-xs text-charcoal font-semibold">
                            {wrap.title}
                          </span>
                        </div>
                        <span className="text-xs text-deep-sage font-semibold">
                          Included
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl text-deep-sage font-medium">
                    04. Gifting &amp; Handwritten Card
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Each card is individually penned on 350gsm deckled cotton
                    paper.
                  </p>
                </div>

                <GiftOptions
                  addOns={addOns}
                  currencyCode={currencyCode}
                  giftMessage={note}
                  recipientName={recipient}
                  senderName={sender}
                  selectedAddOns={selectedAddOns}
                  onMessageChange={setNote}
                  onRecipientChange={setRecipient}
                  onSenderChange={setSender}
                  onToggleAddOn={toggleAddOn}
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h3 className="font-editorial text-2xl text-deep-sage font-medium">
                    05. Delivery Scheduling
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    Direct temperature-regulated hand-delivery to home or office.
                  </p>
                </div>

                <DeliverySelector
                  selectedDate={deliveryDate}
                  selectedWindow={deliveryWindow}
                  onDateChange={setDeliveryDate}
                  onWindowChange={setDeliveryWindow}
                />
              </div>
            )}

            <div className="pt-6 border-t border-sage/15 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-deep-sage transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <span />
              )}

              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="bg-deep-sage hover:bg-deep-sage-dark text-cream text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  disabled={isCommissioning && calculatedTotal === 0}
                  className="bg-deep-sage hover:bg-deep-sage-dark text-cream text-xs uppercase tracking-widest font-semibold px-8 py-3.5 rounded-xs transition-colors flex items-center gap-2 shadow-md disabled:opacity-60"
                >
                  <Sparkles className="w-4 h-4 text-blush" />
                  <span>
                    {isCommissioning
                      ? "Assembling..."
                      : `Commission Bouquet (${formatPrice(calculatedTotal, currencyCode)})`}
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-cream-light p-6 sm:p-8 rounded-xs border border-sage/20 space-y-6 sticky top-24">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-sage font-semibold block">
                Live Studio Preview
              </span>
              <h3 className="font-editorial text-2xl text-charcoal font-medium">
                Your Atelier Arrangement
              </h3>
            </div>

            <div className="relative aspect-[4/5] rounded-xs overflow-hidden bg-cream-dark border border-sage/15 shadow-md">
              <AtelierImage
                src={previewImage}
                alt="Custom bouquet composition"
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-cream/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-deep-sage">
                {sizeObj.title} · {sizeObj.stems} Stems
              </div>
              <div className="absolute bottom-3 inset-x-3 bg-cream/95 backdrop-blur-xs p-3 rounded-xs text-xs space-y-1">
                <p className="font-editorial text-sm font-semibold text-charcoal">
                  Selected Stems:
                </p>
                <div className="flex flex-wrap gap-1">
                  {allocations.map((a) => {
                    const stem = stemMap.get(a.handle);
                    return (
                      <span
                        key={a.handle}
                        className="text-[10px] bg-cream-dark px-2 py-0.5 rounded-full text-charcoal font-medium border border-sage/20"
                      >
                        {stem?.name.split(" ").slice(0, 2).join(" ")} × {a.count}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-sage/15 pt-4">
              <div className="flex justify-between text-charcoal-muted">
                <span>Scale Tier:</span>
                <span className="font-medium text-charcoal">
                  {sizeObj.title} ({sizeObj.stems} stems)
                </span>
              </div>
              <div className="flex justify-between text-charcoal-muted">
                <span>Finishing:</span>
                <span className="font-medium text-charcoal">
                  {wrapObj?.title ?? "Botanical Kraft & Raffia"}
                </span>
              </div>
              {selectedAddOns.length > 0 && (
                <div className="flex justify-between text-charcoal-muted">
                  <span>Pairings:</span>
                  <span className="font-medium text-charcoal">
                    +{formatPrice(addOnTotal, currencyCode)}
                  </span>
                </div>
              )}
              {step >= 4 && (
                <div className="flex justify-between text-charcoal-muted">
                  <span>Calligraphy Card:</span>
                  <span className="font-medium text-charcoal">
                    {recipient || "Invited"}
                  </span>
                </div>
              )}
              {step >= 5 && (
                <div className="flex justify-between text-charcoal-muted">
                  <span>Delivery Date:</span>
                  <span className="font-medium text-charcoal">{deliveryDate}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-editorial text-charcoal font-semibold pt-3 border-t border-sage/15">
                <span>Calculated Price:</span>
                <span className="text-deep-sage font-sans text-lg">
                  {formatPrice(calculatedTotal, currencyCode)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};