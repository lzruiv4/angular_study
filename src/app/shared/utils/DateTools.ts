export function sortMapByDateDesc(
  inputMap: Map<string, any[]>
): Map<string, any[]> {
  const sortedEntries = Array.from(inputMap.entries()).sort(
    ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime()
  );

  return new Map(sortedEntries);
}


export const DATE_PIPE:string = "yyyy-mm-dd hh:mm:ss"
