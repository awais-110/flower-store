"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { X, Check, ShieldCheck } from "lucide-react";
import { AtelierImage } from "./AtelierImage";
import { useAtelier } from "../context/AtelierContext";
import { formatPrice } from "@lib/util/format-price";
import { addToCart } from "@lib/data/cart";

const WRAP_OPTIONS = [
  { id: "Signature Botanical Kraft", label: "Botanical Kraft & Raffia" },
  { id: "French Belgian Linen", label: "French Pressed Linen" },
  { id: "Raw Sage Silk Ribbon", label: "Hand-Dyed Sage Silk Ribbon" },
  { id: "Atelier Presentation Box", label: "Embossed Atelier Gift Box" },
] as const;

export const QuickAddDrawer: React.FC = () => {
  const {
    isQuickAddOpen,
    quickAddProduct,
    closeQuickAdd,
    showToast,
    currencyCode,
  } = useAtelier();
  const { countryCode } = useParams() as { countryCode: string };
  const [selectedWrap, setSelectedWrap] = useState<string>(
    "Signature Botanical Kraft"
  );
  const [isAdding, setIsAdding] = useState(false);

  if (!isQuickAddOpen || !quickAddProduct) return null;

  const handleAdd = async () => {
    if (!quickAddProduct.variantId) return;
    setIsAdding(true);

    try {
      await addToCart({
        variantId: quickAddProduct.variantId,
        quantity: 1,
        countryCode,
        metadata: {
          atelier_selection: true,
          wrap_option: selectedWrap,
        },
      });
      closeQuickAdd();
      showToast(
        "Arrangement Prepared",
        `${quickAddProduct.name} added to your floral bag.`
      );
    } catch {
      showToast(
        "Could Not Add",
        "There was a problem adding this arrangement. Please try again."
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeQuickAdd}
      />

      <div className="relative w-full max-w-md bg-cream text-charcoal h-full shadow-2xl flex flex-col z-10 animate-slideLeft border-l border-sage/15">
        <div className="flex items-center justify-between p-6 border-b border-sage/15">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-sage font-semibold">
              Atelier Quick Selection
            </span>
            <h3 className="font-editorial text-2xl text-deep-sage font-medium">
              {quickAddProduct.name}
            </h3>
          </div>
          <button
            onClick={closeQuickAdd}
            className="p-1.5 text-charcoal hover:text-sage transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center gap-4 p-3 bg-cream-light rounded-xs border border-sage/15">
            <div className="relative w-20 h-24 rounded-xs overflow-hidden flex-shrink-0 bg-cream-dark">
              <AtelierImage
                src={quickAddProduct.image}
                alt={quickAddProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-editorial text-lg text-charcoal truncate">
                {quickAddProduct.name}
              </p>
              <p className="text-xs text-charcoal-muted line-clamp-2 mt-0.5">
                {quickAddProduct.description ||
                  "Couture seasonal arrangement by master florists"}
              </p>
              <p className="text-sm font-semibold text-deep-sage mt-2">
                {formatPrice(quickAddProduct.price, currencyCode)}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider text-charcoal font-semibold">
                Arrangement Scale
              </label>
              <span className="text-xs text-sage font-medium">Standard</span>
            </div>
            <button
              className="flex items-center justify-between p-3 rounded-xs border border-deep-sage bg-deep-sage/5 text-deep-sage text-left transition-all w-full"
            >
              <div>
                <p className="text-xs font-semibold">Standard Edition</p>
                <p className="text-[11px] text-charcoal-muted">
                  Hand-tied by senior floral artisans
                </p>
              </div>
              <span className="text-xs font-semibold">
                {formatPrice(quickAddProduct.price, currencyCode)}
              </span>
            </button>
          </div>

          <div className="space-y-2.5">
            <label className="text-xs uppercase tracking-wider text-charcoal font-semibold">
              Atelier Finishing &amp; Wrap
            </label>
            <div className="grid grid-cols-1 gap-2">
              {WRAP_OPTIONS.map((wrap) => {
                const isSelected = selectedWrap === wrap.id;
                return (
                  <button
                    key={wrap.id}
                    onClick={() => setSelectedWrap(wrap.id)}
                    className={`flex items-center justify-between p-3 rounded-xs border text-left transition-all ${
                      isSelected
                        ? "border-deep-sage bg-deep-sage/5 text-deep-sage font-medium"
                        : "border-sage/20 bg-cream/50 hover:border-sage text-charcoal"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-deep-sage bg-deep-sage text-white"
                            : "border-sage/40"
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <span className="text-xs">{wrap.label}</span>
                    </div>
                    <span className="text-xs text-charcoal-muted">Included</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-sage/10 rounded-xs flex items-center gap-2.5 text-xs text-deep-sage">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-sage" />
            <span>
              Includes 7-day bloom freshness guarantee and floral nutrition
              sachet.
            </span>
          </div>
        </div>

        <div className="p-6 border-t border-sage/15 bg-cream space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal-muted">Total Investment:</span>
            <span className="font-editorial text-2xl text-deep-sage font-semibold">
              {formatPrice(quickAddProduct.price, currencyCode)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdding}
            className="w-full bg-deep-sage hover:bg-deep-sage-dark text-cream py-3.5 px-6 text-xs uppercase tracking-widest font-semibold rounded-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>{isAdding ? "Securing Stems..." : "Add to Shopping Bag"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};