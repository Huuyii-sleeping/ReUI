export interface CalendarType {
  formatYear: string;
  formatMonth: string;
  today: string;
  month: {
    January: string;
    February: string;
    March: string;
    April: string;
    May: string;
    June: string;
    July: string;
    August: string;
    September: string;
    October: string;
    November: string;
    December: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } & Record<string, any>;
  week: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } & Record<string, any>;
}
