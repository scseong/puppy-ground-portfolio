export function getCountFromTable(column: unknown) {
  const _column = (Array.isArray(column) ? column[0] : column) as {
    count?: number;
  };

  return _column.count ?? null;
}
