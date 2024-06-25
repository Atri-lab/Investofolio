import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FaArrowLeft, FaArrowRight, FaDollarSign } from 'react-icons/fa';
import '../styles/IndustryCalendar.css';

const IndustryCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handlePrevMonth = () => {
    if (date) {
      const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      setDate(prevMonth);
    }
  };

  const handleNextMonth = () => {
    if (date) {
      const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      setDate(nextMonth);
    }
  };

  const tileContent = ({ date: tileDate, view }: { date: Date; view: string }) => {
    if (view === 'month' && date) {
      const events = [
        // June 2024
        { date: 2, month: 5, year: 2024, event: 'Apple Q3 Start' },
        { date: 15, month: 5, year: 2024, event: 'NVIDIA Investor Meeting' },
        { date: 20, month: 5, year: 2024, event: 'Tesla Earnings Call' },
        { date: 25, month: 5, year: 2024, event: 'Goldman Sachs Earnings Call' },

        // July 2024
        { date: 5, month: 6, year: 2024, event: 'Apple Q3 Mid' },
        { date: 10, month: 6, year: 2024, event: 'NVIDIA Q2 Start' },
        { date: 18, month: 6, year: 2024, event: 'Tesla Investor Meeting' },
        { date: 22, month: 6, year: 2024, event: 'Goldman Sachs Q3 Start' },

        // August 2024
        { date: 7, month: 7, year: 2024, event: 'Apple Q3 End' },
        { date: 12, month: 7, year: 2024, event: 'NVIDIA Earnings Call' },
        { date: 15, month: 7, year: 2024, event: 'Tesla Q3 Start' },
        { date: 25, month: 7, year: 2024, event: 'Goldman Sachs Investor Meeting' },

        // September 2024
        { date: 3, month: 8, year: 2024, event: 'Apple Q4 Start' },
        { date: 8, month: 8, year: 2024, event: 'NVIDIA Investor Meeting' },
        { date: 20, month: 8, year: 2024, event: 'Tesla Earnings Call' },
        { date: 28, month: 8, year: 2024, event: 'Goldman Sachs Earnings Call' },
      ];

      const currentMonth = date.getMonth();
      const currentYear = date.getFullYear();

      const event = events.find(
        (e) =>
          e.date === tileDate.getDate() &&
          e.month === currentMonth &&
          e.year === currentYear
      );
      if (event) {
        return (
          <div className="event-marker" title={event.event}>
            <FaDollarSign />
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="industry-calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePrevMonth}>
          <FaArrowLeft />
        </button>
        <span className="current-month">
          {date?.toLocaleString('default', { month: 'long' })} {date?.getFullYear()}
        </span>
        <button className="nav-button" onClick={handleNextMonth}>
          <FaArrowRight />
        </button>
      </div>
      <Calendar
        onChange={() => {}} // No-op to disable date selection
        value={date}
        tileContent={tileContent}
        nextLabel={null}
        prevLabel={null}
        next2Label={null}
        prev2Label={null}
        showNavigation={false} // Remove the default navigation
        tileDisabled={() => true} // Disable clicking on tiles
      />
    </div>
  );
};

export default IndustryCalendar;
