export const parseNumericValue = (value: string | number): number | null => {
    if (typeof value === 'number') return value;

    const trimmed = value.trim();

    const percentMatch = trimmed.match(/^(-?\d+(\.\d+)?)%$/);
    if (percentMatch) return parseFloat(percentMatch[1]);

    const avgCvssMatch = trimmed.match(/Avg CVSS:\s*([0-9.]+)/i);
    if (avgCvssMatch) return parseFloat(avgCvssMatch[1]);

    const plainNumber = parseFloat(trimmed);
    return !isNaN(plainNumber) ? plainNumber : null;
};
