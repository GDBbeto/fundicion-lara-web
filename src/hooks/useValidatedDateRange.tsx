import { useState, useEffect, useRef } from 'react';
import { validationMessages } from 'commons/messages';

const useValidatedDateRange = ({
  initialStartDate,
  initialEndDate,
  onValidRangeChange,
}: {
  initialStartDate: Date;
  initialEndDate: Date;
  onValidRangeChange?: (start: Date, end: Date) => void;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);

  const hasInteracted = useRef(false);

  const lastValidRange = useRef<{ start: Date; end: Date } | null>(null);

  useEffect(() => {
    if (!hasInteracted.current) return;

    let isValid = true;

    if (startDate === null || startDate === undefined) {
      setStartDateError(validationMessages.required);
      isValid = false;
    } else if (isNaN(startDate.getTime())) {
      setStartDateError(validationMessages.invalidDate);
      isValid = false;
    } else {
      setStartDateError(null);
    }

    if (endDate === null || endDate === undefined) {
      setEndDateError(validationMessages.required);
      isValid = false;
    } else if (isNaN(endDate.getTime())) {
      setEndDateError(validationMessages.invalidDate);
      isValid = false;
    } else {
      setEndDateError(null);
    }

    if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
      setStartDateError(validationMessages.startDateAfterEndDate);
      setEndDateError(validationMessages.endDateBeforeStartDate);
      isValid = false;
    }

    if (isValid && startDate && endDate && onValidRangeChange) {
      const prev = lastValidRange.current;
      const isSameAsLast =
        prev &&
        prev.start.getTime() === startDate.getTime() &&
        prev.end.getTime() === endDate.getTime();

      if (!isSameAsLast) {
        lastValidRange.current = { start: startDate, end: endDate };
        onValidRangeChange(startDate, endDate);
      }
    }
  }, [startDate, endDate, onValidRangeChange]);

  const handleStartDateChange = (date: Date | null) => {
    hasInteracted.current = true;
    setStartDate(date);
    setEndDate(null);
  };

  const handleEndDateChange = (date: Date | null) => {
    hasInteracted.current = true;
    setEndDate(date);
  };

  return {
    startDate,
    endDate,
    setStartDate: handleStartDateChange,
    setEndDate: handleEndDateChange,
    startDateError,
    endDateError,
  };
};

export default useValidatedDateRange;
