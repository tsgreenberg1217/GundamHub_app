import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { Status } from '../types/chat';
import type { StatusValue } from '../types/chat';

interface AiMuroBotProps {
  status: StatusValue;
  size?: number;
}

export function AiMuroBot({ status, size = 50 }: AiMuroBotProps) {
  const animationRef = useRef<LottieView>(null);
  const isActive = status === Status.Loading || status === Status.Streaming;

  useEffect(() => {
    if (isActive) {
      animationRef.current?.play();
    }
  }, [isActive]);

  return (
    <LottieView
      ref={animationRef}
      source={require('../../lottie/aimuro_chat_front.lottie')}
      style={{ width: size, height: size }}
      loop={isActive}
      autoPlay={false}
    />
  );
}
