import type { Meta, StoryObj } from "@storybook/react";
import Calendar, { type CalendarProps } from "../components/Calendar/index";
import dayjs from "dayjs";
import type {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const meta = {
  title: "日历组件",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "date",
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const renderCalendar = (args: CalendarProps) => {
  if (typeof args.value === "number") {
    return <Calendar {...args} value={dayjs(new Date(args.value))} />;
  }

  return <Calendar {...args} />;
};

export const Value: Story = {
  args: {
    value: dayjs("2023-11-08"),
  },
  render: renderCalendar,
};

export const DateRender: Story = {
  args: {
    value: dayjs("2023-11-08"),
    dateRender(currentDate: {
      date: () =>
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
    }) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
};

export const DateInnerContent: Story = {
  args: {
    value: dayjs("2023-11-08"),
    dateInnerContent(currentDate: {
      date: () =>
        | string
        | number
        | bigint
        | boolean
        | ReactElement<unknown, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<
            | string
            | number
            | bigint
            | boolean
            | ReactPortal
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | null
            | undefined
          >
        | null
        | undefined;
    }) {
      return <div>日期{currentDate.date()}</div>;
    },
  },
};

export const Locale: Story = {
  args: {
    value: dayjs("2023-11-08"),
    locale: "en-US",
  },
};
