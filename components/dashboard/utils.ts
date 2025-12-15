export function formatDateTime(value: Date | string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatCellValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (value instanceof Date) return formatDateTime(value);
  if (typeof value === "number") return value.toLocaleString();
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "string") {
    if (value.length > 80) return `${value.slice(0, 77)}...`;
    return value;
  }

  try {
    const stringified = JSON.stringify(value);
    if (stringified.length > 80) return `${stringified.slice(0, 77)}...`;
    return stringified;
  } catch {
    return String(value);
  }
}
