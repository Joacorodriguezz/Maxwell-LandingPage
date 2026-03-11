"use client";

import React from "react";
import { cn } from "@/lib/utils";

const MARQUEE_CSS = `
@keyframes marquee-left  { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
@keyframes marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
@keyframes marquee-up    { from { transform: translateY(0);    } to { transform: translateY(-50%); } }
@keyframes marquee-down  { from { transform: translateY(-50%); } to { transform: translateY(0);    } }
`;

const animationName: Record<string, string> = {
  left:  "marquee-left",
  right: "marquee-right",
  up:    "marquee-up",
  down:  "marquee-down",
};

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  fade?: boolean;
  fadeAmount?: number;
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const [isPaused, setIsPaused] = React.useState(false);

  const items = React.Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";

  const maskStyle = fade
    ? {
        maskImage: isVertical
          ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
          : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
        WebkitMaskImage: isVertical
          ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
          : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
      }
    : {};

  const scrollerStyle: React.CSSProperties = {
    display: "flex",
    flexShrink: 0,
    animationName: animationName[direction],
    animationDuration: `${duration}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: isPaused ? "paused" : "running",
    ...(isVertical && { flexDirection: "column" }),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <div
        className={cn("flex w-full overflow-hidden", isVertical && "flex-col", className)}
        style={maskStyle}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div style={scrollerStyle}>
          {items.map((item, index) => (
            <div key={`a-${index}`} className={cn("flex shrink-0", isVertical && "w-full")}>
              {item}
            </div>
          ))}
          {items.map((item, index) => (
            <div key={`b-${index}`} className={cn("flex shrink-0", isVertical && "w-full")}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
