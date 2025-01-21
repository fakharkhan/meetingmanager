export function convertTimeToTimeZone(
  time: string,
  fromTimeZone: string,
  toTimeZone: string
): string {
  try {
    // Convert time to 24-hour format for parsing
    const time24 = convertTo24Hour(time);
    const date = new Date(`2025-01-21T${time24}:00`);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const options: Intl.DateTimeFormatOptions = {
      timeZone: toTimeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', options)
      .format(date)
      .toLowerCase()
      .replace(' ', '');

    return formattedTime;
  } catch (error) {
    console.error('Time conversion error:', error);
    return time; // Return original time if conversion fails
  }
}

function convertTo24Hour(time: string): string {
  const [hour, minute] = time.replace(/[^0-9:]/g, '').split(':');
  const period = time.toLowerCase().includes('pm') ? 'PM' : 'AM';
  
  let hour24 = parseInt(hour, 10);
  if (period === 'PM' && hour24 !== 12) {
    hour24 += 12;
  }
  if (period === 'AM' && hour24 === 12) {
    hour24 = 0;
  }
  
  return `${String(hour24).padStart(2, '0')}:${minute}`;
}

export const formatTimeForTimeZone = (date: Date, timeZone: string) => {
    const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', options)
        .format(date)
        .toLowerCase()
        .replace(' ', '');

    return formattedTime;
}; 