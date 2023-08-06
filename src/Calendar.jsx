import { useState } from 'react';
import './Calendar.css'

function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  let date = new Date();
  let day = date.getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getDaysInMonth = (yearSelect, monthSelect) => {
    return new Date(yearSelect, monthSelect + 1, 0).getDate();
  }

  const daysInMonth = getDaysInMonth(year, month)
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const calendarDays = [...Array(firstDayOfWeek).fill(null), ...daysArray];

  const weeksInMonth = [];
  const totalWeeks = Math.ceil(calendarDays.length / 7);

  for (let week = 0; week < totalWeeks; week++) {
    const weekStart = week * 7;
    const weekEnd = weekStart + 7;
    const weekDays = calendarDays.slice(weekStart, weekEnd);
    weeksInMonth.push(weekDays);
  }
  return (
    <>
      <h1>Calendar</h1>
      <div>
        <h2>{year} {monthNames[month]}</h2>
        <button onClick={() => {
          (month == 0) ? setMonth(11) : setMonth(month - 1);
          (month == 0) ? setYear(year - 1) : year;
        }}><span>Left</span></button>
        <button onClick={() => {
          (month == 11) ? setMonth(0) : setMonth(month + 1);
          (month == 11) ? setYear(year + 1) : year;
        }}><span>Right</span></button>
      </div>

      <table>
        <thead>
          <tr>
            <th className='weekName'>Sunday</th>
            <th className='weekName'>Monday</th>
            <th className='weekName'>Tuesday</th>
            <th className='weekName'>Wednesday</th>
            <th className='weekName'>Thursday</th>
            <th className='weekName'>Friday</th>
            <th className='weekName'>Saturday</th>
          </tr>
        </thead>
        {weeksInMonth.map((week, weekIndex) => (
          <tbody key={weekIndex}>
            <tr>

              {week.map((day, dayIndex) => (
                <td key={dayIndex} className="calendar-day">
                  <div className={`
                    day
                    ${(new Date(year, month, day).toLocaleDateString() == new Date().toLocaleDateString()
                    ? 'currentlyDay'
                    : '')}`}>
                    {day}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}

export default Calendar
