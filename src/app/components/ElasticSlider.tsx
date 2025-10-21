"use client";

import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';

const MAX_OVERFLOW = 50;

interface ElasticSliderProps {
  defaultValue?: number;
  startingValue?: number;
  maxValue?: number;
  className?: string;
  isStepped?: boolean;
  stepSize?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: number) => void;
  compact?: boolean;
}

const ElasticSlider: React.FC<ElasticSliderProps> = ({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <>-</>,
  rightIcon = <>+</>,
  onChange,
  compact = false,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-4 w-48 ${className}`}>
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onChange={onChange}
        compact={compact}
      />
    </div>
  );
};

interface SliderProps {
  defaultValue: number;
  startingValue: number;
  maxValue: number;
  isStepped: boolean;
  stepSize: number;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  onChange?: (value: number) => void;
  compact?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  defaultValue,
  startingValue,
  maxValue,
  isStepped,
  stepSize,
  leftIcon,
  rightIcon,
  onChange,
  compact = false,
}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  // Removed hover/touch scaling for a steady appearance

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Do not call onChange on initial/default value to avoid controlled/uncontrolled loops.

  useMotionValueEvent(clientX, 'change', (latest: number) => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue: number;
      if (latest < left) {
        setRegion('left');
        newValue = left - latest;
      } else if (latest > right) {
        setRegion('right');
        newValue = latest - right;
      } else {
        setRegion('middle');
        newValue = 0;
      }
      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);
      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }
      if (!Number.isFinite(newValue)) newValue = startingValue;
      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      if (onChange) onChange(newValue);
      clientX.jump(e.clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });
  };

  const getRangePercentage = (): number => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;
    return ((value - startingValue) / totalRange) * 100;
  };

  return (
    <>
      <motion.div
        className="flex w-full touch-none select-none items-center justify-center gap-4"
      >
        <motion.div
          animate={{
            scale: region === 'left' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'left' ? -overflow.get() : 0))
          }}
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className={`relative flex w-full max-w-xs flex-grow cursor-grab touch-none select-none items-center ${compact ? 'py-2' : 'py-4'}`}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (sliderRef.current) {
                  const { width } = sliderRef.current.getBoundingClientRect();
                  return 1 + overflow.get() / width;
                }
                return 1;
              }),
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const { left, width } = sliderRef.current.getBoundingClientRect();
                  return clientX.get() < left + width / 2 ? 'right' : 'left';
                }
                return 'center';
              })
            }}
            className="flex flex-grow h-1.5"
          >
            <div className="relative h-full flex-grow overflow-hidden rounded-full bg-gray-400">
              <div className="absolute h-full bg-gray-500 rounded-full" style={{ width: `${getRangePercentage()}%` }} />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === 'right' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'right' ? overflow.get() : 0))
          }}
        >
          {rightIcon}
        </motion.div>
      </motion.div>
      {/* Value readout removed per design request */}
    </>
  );
};

function decay(value: number, max: number): number {
  if (max === 0) {
    return 0;
  }
  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
  return sigmoid * max;
}

export default ElasticSlider;


