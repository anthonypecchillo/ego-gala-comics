import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 10px 0;
  padding: 10px;
`;

const InnerContainer = styled.div`
  display: flex;
  max-width: 100%;
  flex-basis: 420px;
  flex-direction: column;
  flex-grow: 100;
  align-items: stretch;
  padding-top: 1em;
  margin: 0 auto;
`;

const StyledCalendar = styled(Calendar)`
  margin: 10px;
  margin: 0 auto;

  .react-calendar__tile {
    color: black;
  }

  .react-calendar__month-view__days__day--weekend {
    color: black;
  }

  .react-calendar__tile--disabled {
    background: none !important;

    > abbr {
      opacity: 1 !important;
      color: gray !important;
    }
  }
`;

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DiaryCalendar: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [datesToIds, setDatesToIds] = useState<{ [date: string]: string }>({});
  const router = useRouter();

  // TODO: Switch to async/await if possible - gave me some trouble
  useEffect(() => {
    axios.get('http://localhost:3001/api/comics/dates').then((response) => {
      setDatesToIds(response.data);
    });
  }, []);

  const onDateChange = (date: Value) => {
    setDate(date);
  };

  // FIXME: event type
  const onDayClick = (value: Value, event: any) => {
    const dateClicked =
      value instanceof Date ? value.toISOString().split('T')[0] : null;
    if (dateClicked && datesToIds[dateClicked]) {
      router.push(`/comic/${datesToIds[dateClicked]}`);
    } else {
      alert(`No Diary Comic was illustrated on ${dateClicked}.`);
    }
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    // Disable the date if it's not in the datesToIds map
    const dateString = date.toISOString().split('T')[0];
    return view === 'month' && !datesToIds[dateString];
  };

  return (
    <OuterContainer>
      <InnerContainer>
        <StyledCalendar
          // TODO: activeStartDate={new Date(2020, 0, 1)}
          // TODO: locale="en-US"
          // TODO: maxDate={new Date()}
          // TODO: minDate={new Date(2020, 0, 1)}
          // TODO: tileClassName={tileClassName}
          // TODO: tileContent={tileContent}
          calendarType="US"
          onChange={onDateChange}
          onClickDay={onDayClick}
          tileDisabled={tileDisabled}
          value={date}
          // showWeekNumbers
        />
      </InnerContainer>
    </OuterContainer>
  );
};

export default DiaryCalendar;
