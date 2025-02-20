export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // Function to get the day with the correct suffix (st, nd, rd, th)
    const getDayWithSuffix = (day) => {
      const suffix = ['th', 'st', 'nd', 'rd'];
      const value = day % 10;
      return day + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
    };
  
    // Array of month names (for English localization)
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    // Get formatted date parts
    const dayWithSuffix = getDayWithSuffix(date.getDate());
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getUTCHours(); // Use UTC to avoid timezone issues
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    const hour12 = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Return formatted date
    return `${dayWithSuffix} ${monthName} ${year} at ${hour12}:${formattedMinutes} ${ampm}`;
  };