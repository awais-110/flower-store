"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Check, MapPin } from "lucide-react";
import { DeliveryWindow } from "../types";

interface DeliverySelectorProps {
  selectedDate: string;
  selectedWindow: DeliveryWindow;
  onDateChange: (date: string) => void;
  onWindowChange: (window: DeliveryWindow) => void;
}

export const DeliverySelector: React.FC<DeliverySelectorProps> = ({
  selectedDate,
  selectedWindow,
  onDateChange,
  onWindowChange,
}) => {
  const [postalCode, setPostalCode] = useState("10021");
  const [postalStatus, setPostalStatus] = useState<"valid" | "invalid" | null>("valid");

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  const formatDisplay = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const datePresets = [
    { label: "Today (Rush Courier)", date: formatDate(today), sub: "Order before 1pm" },
    { label: "Tomorrow", date: formatDate(tomorrow), sub: "Guaranteed Morning" },
    { label: formatDisplay(dayAfterTomorrow), date: formatDate(dayAfterTomorrow), sub: "Standard Dispatch" },
  ];

  const windows: DeliveryWindow[] = [
    "Morning (9:00 - 13:00)",
    "Afternoon (13:00 - 18:00)",
    "Evening (18:00 - 21:00)",
  ];

  const checkPostal = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.length >= 3) {
      setPostalStatus("valid");
    } else {
      setPostalStatus("invalid");
    }
  };

  return (
    <div className="bg-cream-light p-5 rounded-xs border border-sage/20 space-y-5">
      <div className="flex items-center justify-between border-b border-sage/15 pb-3">
        <div className="flex items-center gap-2 text-deep-sage">
          <CalendarIcon className="w-4 h-4 text-sage" />
          <h4 className="text-xs uppercase tracking-wider font-semibold">
            Delivery Schedule & Window
          </h4>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-sage font-medium bg-sage/10 px-2 py-0.5 rounded-full">
          Temperature Regulated
        </span>
      </div>

      {/* Postal Check */}
      <form onSubmit={checkPostal} className="flex items-center gap-2">
        <div className="relative flex-1">
          <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-sage" />
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter Delivery Zip / Postcode"
            className="w-full bg-cream border border-sage/25 rounded-xs pl-8 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-deep-sage"
          />
        </div>
        <button
          type="submit"
          className="bg-cream-dark hover:bg-sage hover:text-white text-charcoal text-[11px] font-semibold px-3 py-2 rounded-xs border border-sage/20 transition-colors"
        >
          Check
        </button>
      </form>

      {postalStatus === "valid" && (
        <p className="text-[11px] text-sage flex items-center gap-1.5 -mt-2">
          <Check className="w-3 h-3" />
          <span>Postal Zone Active: Direct courier hand-delivery available.</span>
        </p>
      )}

      {/* Date Options */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-charcoal-muted font-medium">
          Select Delivery Date
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {datePresets.map((preset) => {
            const isSelected = selectedDate === preset.date;
            return (
              <button
                type="button"
                key={preset.date}
                onClick={() => onDateChange(preset.date)}
                className={`p-2.5 rounded-xs border text-left transition-all ${
                  isSelected
                    ? "border-deep-sage bg-deep-sage text-cream shadow-xs"
                    : "border-sage/20 bg-cream hover:border-sage text-charcoal"
                }`}
              >
                <p className="text-xs font-semibold leading-tight">{preset.label}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    isSelected ? "text-cream/80" : "text-charcoal-muted"
                  }`}
                >
                  {preset.sub}
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom Date Input */}
        <div className="pt-1 flex items-center gap-2">
          <span className="text-[11px] text-charcoal-muted">Or pick future date:</span>
          <input
            type="date"
            value={selectedDate}
            min={formatDate(today)}
            onChange={(e) => onDateChange(e.target.value)}
            className="bg-cream border border-sage/25 text-xs text-charcoal rounded-xs px-2 py-1 focus:outline-none focus:border-deep-sage cursor-pointer"
          />
        </div>
      </div>

      {/* Time Window Slots */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs text-charcoal font-medium">
          <Clock className="w-3.5 h-3.5 text-sage" />
          <span>Delivery Time Slot</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {windows.map((win) => {
            const isSelected = selectedWindow === win;
            return (
              <button
                type="button"
                key={win}
                onClick={() => onWindowChange(win)}
                className={`p-2 rounded-xs border text-xs text-center transition-all ${
                  isSelected
                    ? "border-deep-sage bg-deep-sage text-cream font-semibold"
                    : "border-sage/20 bg-cream hover:border-sage text-charcoal"
                }`}
              >
                {win}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
