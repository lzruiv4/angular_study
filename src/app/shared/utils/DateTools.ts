export function sortMapByDateDesc(
  inputMap: Map<string, any[]>,
): Map<string, any[]> {
  const sortedEntries = Array.from(inputMap.entries()).sort(
    ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime(),
  );

  return new Map(sortedEntries);
}

export function sortArrayByDateDesc(inputMap: any[]) {
  return inputMap.sort(
    (a, b) =>
      new Date(b.recordDate).getTime() - new Date(a.recordDate).getTime(),
  );
}

export function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export const DATE_PIPE: string = 'yyyy-MM-dd hh:mm:ss';
