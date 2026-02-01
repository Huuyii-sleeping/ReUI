import * as React from "react";
import dayjs from "dayjs";

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const calcLeft = (target?: TDate) => {
  if (!target) {
    return 0;
  }

  const left = dayjs(target).valueOf() - Date.now();
  return left < 0 ? 0 : left;
};

const parseMs = (ms: number): FormattedRes => {
  return {
    days: Math.floor(ms / (1000 * 60 * 60 * 24)),
    hours: Math.floor(ms / (1000 * 60 * 60)) % 24,
    minutes: Math.floor(ms / (1000 * 60)) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    milliseconds: Math.floor(ms) % 1000,
  };
};

const useCountDown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options || {};
  const memoLeftTime = React.useMemo(() => {
    return leftTime && leftTime > 0 ? Date.now() + leftTime : 0;
  }, [leftTime]);

  const target = "leftTime" in options ? memoLeftTime : targetDate;
  const [timeLeft, setTimeLeft] = React.useState(() => calcLeft(target));
  const onEndRef = React.useRef(onEnd);
  onEndRef.current = onEnd;

  React.useEffect(() => {
    if (!target) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(calcLeft(target));

    const timer = setInterval(() => {
      const targetLeft = calcLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedRes = React.useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountDown;
