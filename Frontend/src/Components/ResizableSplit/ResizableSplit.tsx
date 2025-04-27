"use client";
import { useRef, useState, ReactNode, useEffect } from "react";

interface ResizableSplitProps {
  left: ReactNode;
  right: ReactNode;
  leftMinWidth?: string;
  rightMinWidth?: string;
  initialWidth?: string;
  direction?: "horizontal" | "vertical";
  snapPoints?: number[];
  storageKey?: string; // key for localStorage
}

export default function ResizableSplit({
  left,
  right,
  leftMinWidth = "100px",
  rightMinWidth = "100px",
  initialWidth = "50%",
  direction = "horizontal",
  snapPoints = [],
  storageKey,
}: ResizableSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dividerPosition, setDividerPosition] = useState<number>(50);

  const isHorizontal = direction === "horizontal";

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerSize = isHorizontal ? rect.width : rect.height;

    let savedPosition: number | null = null;
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) savedPosition = parseFloat(saved);
    }

    if (savedPosition !== null) {
      setDividerPosition(savedPosition);
    } else {
      const initial = getPixels(initialWidth, containerSize);
      setDividerPosition((initial / containerSize) * 100);
    }
  }, [initialWidth, direction, storageKey]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, dividerPosition.toString());
    }
  }, [dividerPosition, storageKey]);

  function getPixels(value: string, containerSize: number): number {
    if (value.endsWith("px")) {
      return parseFloat(value);
    } else if (value.endsWith("%")) {
      return (parseFloat(value) / 100) * containerSize;
    } else if (value.endsWith("rem")) {
      const remSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      return parseFloat(value) * remSize;
    } else {
      return parseFloat(value); // fallback
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerSize = isHorizontal ? rect.width : rect.height;
    const pointerPos = isHorizontal
      ? e.clientX - rect.left
      : e.clientY - rect.top;

    const leftMin = getPixels(leftMinWidth, containerSize);
    const rightMin = getPixels(rightMinWidth, containerSize);

    const newLeftSize = pointerPos;
    const newRightSize = containerSize - newLeftSize;

    if (newLeftSize < leftMin || newRightSize < rightMin) {
      return;
    }

    let newDivider = (newLeftSize / containerSize) * 100;

    // Snap points
    if (snapPoints.length > 0) {
      for (const snap of snapPoints) {
        if (Math.abs(newDivider - snap) < 3) {
          newDivider = snap;
          break;
        }
      }
    }

    setDividerPosition(newDivider);
  }

  function handleMouseUp() {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }

  function handleMouseDown() {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleDoubleClick() {
    setDividerPosition(50); // reset to 50%
    if (storageKey) {
      localStorage.setItem(storageKey, "50");
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex ${
        isHorizontal ? "flex-row" : "flex-col"
      } w-full h-screen overflow-hidden bg-base-200`}
    >
      <div
        className="bg-base-100 p-4"
        style={{
          width: isHorizontal ? `${dividerPosition}%` : "100%",
          height: isHorizontal ? "100%" : `${dividerPosition}%`,
          minWidth: isHorizontal ? leftMinWidth : undefined,
          minHeight: !isHorizontal ? leftMinWidth : undefined,
        }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        className={`${
          isHorizontal ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize"
        } bg-base-300 hover:bg-primary transition-all`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      />

      <div
        className="bg-base-100 p-4"
        style={{
          width: isHorizontal ? `${100 - dividerPosition}%` : "100%",
          height: isHorizontal ? "100%" : `${100 - dividerPosition}%`,
          minWidth: isHorizontal ? rightMinWidth : undefined,
          minHeight: !isHorizontal ? rightMinWidth : undefined,
        }}
      >
        {right}
      </div>
    </div>
  );
}
