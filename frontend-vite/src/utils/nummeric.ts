export const parseNumericValue = (value: string | number): number | null => {
    if (typeof value === 'number') return value;

    const trimmed = value.trim();

    const percentMatch = trimmed.match(/^(-?\d+(\.\d+)?)%$/);
    if (percentMatch) return parseFloat(percentMatch[1]);

    const avgCvssMatch = trimmed.match(/Avg CVSS:\s*([0-9.]+)/i);
    if (avgCvssMatch) return parseFloat(avgCvssMatch[1]);

    const totalLeaksMatch = trimmed.match(/Total Leaks:\s*([0-9.]+)/i);
    if (totalLeaksMatch) return parseFloat(totalLeaksMatch[1]);

    const outdatedLibraries = trimmed.match(/Outdated Libraries:\s*([0-9.]+)/i);
    if (outdatedLibraries) return parseFloat(outdatedLibraries[1]);

    const plainNumber = parseFloat(trimmed);
    return !isNaN(plainNumber) ? plainNumber : null;
};
