import Option from 'types/option';

export const getCurrentMonth = (monthOptions: Option[]) => {
  const currentMonth = new Date().getMonth(); // 0 = Enero
  return monthOptions[currentMonth].value;
};

export const getDaysInMonth = (month: string, year: number): number => {
  return new Date(year, parseInt(month), 0).getDate();
};

export const getMonthDateRange = (month: string, year: number) => {
  const daysInMonth = getDaysInMonth(month, year);
  const formattedStartDate = `${year}-${month}-01`;
  const formattedEndDate = `${year}-${month}-${String(daysInMonth).padStart(2, '0')}`;
  return { formattedStartDate, formattedEndDate };
};
