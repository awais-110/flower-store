"use client";

import React from "react";
import { CheckCircle2, ShoppingBag, X } from "lucide-react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useAtelier } from "../context/AtelierContext";

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useAtelier();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-cream-light border border-sage/30 shadow-xl rounded-xs p-4 flex items-start gap-3 animate-slideUp text-charcoal"
        >
          <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h5 className="font-editorial text-base font-semibold text-deep-sage">
              {toast.title}
            </h5>
            <p className="text-xs text-charcoal-muted mt-0.5 font-sans">
              {toast.message}
            </p>
            <LocalizedClientLink
              href="/cart"
              onClick={() => dismissToast(toast.id)}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-deep-sage hover:text-sage transition-colors underline underline-offset-4"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>View Shopping Bag</span>
            </LocalizedClientLink>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-charcoal-light hover:text-charcoal p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
