import { useState, type CSSProperties, type ReactNode } from "react";
import type { Dayjs } from "dayjs";
import cs from "classnames";
import Header from "./Header";
import MonthCalendar from "./MonthCalendar";
import LocaleContext from "./LocaleContext";
import "./index.scss";
import dayjs from "dayjs";
import { useControllableValue } from "ahooks";

export interface CalendarProps {
  value: Dayjs;
  style?: CSSProperties;
  className?: string | string[];
  // 定制日期显示，会完全覆盖日期单元格
  dateRender?: (currentDate: Dayjs) => ReactNode;
  // 定制日期单元格内容，会在日期显示上追加
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  // 国际化，默认中文
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

function Calendar(props: CalendarProps) {
  const { style, className, value, onChange } = props;
  const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
    defaultValue: value,
  });
  const [curMonth, setCurMonth] = useState<Dayjs>(curValue);
  const classNames = cs("calendar", className);
  function changeDate(date: Dayjs) {
    setCurMonth(date);
    setCurValue(date);
    onChange?.(date);
  }
  function selectHandler(date: Dayjs) {
    changeDate(date);
  }
  function prevMonthHandler() {
    setCurMonth(curMonth.subtract(1, "month"));
  }
  function nextMonthHandler() {
    setCurMonth(curMonth.add(1, "month"));
  }
  function todayHandler() {
    changeDate(dayjs());
  }
  return (
    <LocaleContext.Provider value={{ locale: props.locale || "zh-CN" }}>
      <div className={classNames} style={style}>
        <Header
          curMonth={curMonth}
          prevMonthHandler={prevMonthHandler}
          nextMonthHandler={nextMonthHandler}
          todayHandler={todayHandler}
        ></Header>
        <MonthCalendar
          {...props}
          value={curValue}
          curMonth={curMonth}
          selectHandler={selectHandler}
        ></MonthCalendar>
      </div>
    </LocaleContext.Provider>
  );
}

export default Calendar;
