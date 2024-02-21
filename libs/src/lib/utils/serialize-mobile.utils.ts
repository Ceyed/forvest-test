export function SerializeMobile(mobile: string): string {
  return mobile[0] === '0' ? '+98' + mobile.slice(1) : mobile;
}
