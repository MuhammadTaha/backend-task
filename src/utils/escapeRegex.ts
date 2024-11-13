
export const escapeRegExp = (data: string): string => {
	return String(data).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
