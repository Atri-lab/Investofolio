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

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const events = [
        { date: 2, event: 'Apple Q3 Start' },
        { date: 15, event: 'NVIDIA Investor Meeting' },
        { date: 20, event: 'Tesla Earnings Call' },
      ];

      const event = events.find((e) => e.date === date.getDate());
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
        onChange={() => {}}  // No-op to disable date selection
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
