export const formatTransactionDate = (input: string | Date): string => {
  const date = new Date(input);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const given = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today.getTime() - given.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const isSameYear = date.getFullYear() === now.getFullYear();

  if (diffDays === 0) {
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

 
  if (diffDays === 1) {
    return "Yesterday";
  }


  if (diffDays < 7) {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
    });
  }


  if (isSameYear) {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  }


  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};