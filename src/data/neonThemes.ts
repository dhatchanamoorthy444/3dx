'use client';

export interface NeonTheme {
  id: number;
  name: string;
  group: 'colored' | 'white';
  /** main LED color */
  neon: string;
  hover: string;
  active: string;
  /** soft glow used for shadows / blurs */
  glow: string;
  /** text color to use on top of neon buttons */
  ink: string;
}

/**
 * Sampled from the uploaded LED jacket chart.
 * Left column = COLORED JACKET (1-10), right = WHITE JACKET (11-21).
 */
export const NEON_THEMES: NeonTheme[] = [
  { id: 1, name: 'dark red', group: 'colored', neon: '#FF2000', hover: '#E61D00', active: '#C41800', glow: 'rgba(255,32,0,0.35)', ink: '#140000' },
  { id: 2, name: 'dark green', group: 'colored', neon: '#00F92A', hover: '#00DE26', active: '#00BE20', glow: 'rgba(0,249,42,0.32)', ink: '#001405' },
  { id: 3, name: 'dark blue', group: 'colored', neon: '#00A6FF', hover: '#0095E6', active: '#007FC4', glow: 'rgba(0,166,255,0.35)', ink: '#00131C' },
  { id: 4, name: 'dark orange', group: 'colored', neon: '#FFAA00', hover: '#E69900', active: '#C48200', glow: 'rgba(255,170,0,0.35)', ink: '#1A1000' },
  { id: 5, name: 'lemon yellow', group: 'colored', neon: '#FAFF00', hover: '#E1E600', active: '#BFC400', glow: 'rgba(250,255,0,0.32)', ink: '#171700' },
  { id: 6, name: 'dark purple', group: 'colored', neon: '#6A2BFF', hover: '#5F27E6', active: '#5121C4', glow: 'rgba(106,43,255,0.4)', ink: '#0E001F' },
  { id: 7, name: 'dark pink', group: 'colored', neon: '#FF00CC', hover: '#E600B8', active: '#C4009D', glow: 'rgba(255,0,204,0.38)', ink: '#1C000F' },
  { id: 8, name: 'baby pink', group: 'colored', neon: '#FFAEE0', hover: '#F09DCE', active: '#CE86B0', glow: 'rgba(255,174,224,0.35)', ink: '#221016' },
  { id: 9, name: 'sky blue', group: 'colored', neon: '#00E5FF', hover: '#00CEE6', active: '#00AFC4', glow: 'rgba(0,229,255,0.35)', ink: '#00181B' },
  { id: 10, name: 'cyan', group: 'colored', neon: '#00FFF2', hover: '#00E6DA', active: '#00C4B9', glow: 'rgba(0,255,242,0.32)', ink: '#001917' },
  { id: 11, name: 'bright red', group: 'white', neon: '#FF0F1E', hover: '#E60E1B', active: '#C40C17', glow: 'rgba(255,15,30,0.38)', ink: '#180002' },
  { id: 12, name: 'bright green', group: 'white', neon: '#00FFC8', hover: '#00E6B4', active: '#00C499', glow: 'rgba(0,255,200,0.32)', ink: '#001812' },
  { id: 13, name: 'royal blue', group: 'white', neon: '#1EAEFF', hover: '#1B9DE6', active: '#1785C4', glow: 'rgba(30,174,255,0.38)', ink: '#00121C' },
  { id: 14, name: 'bright orange', group: 'white', neon: '#FFAB73', hover: '#F09A63', active: '#CE8355', glow: 'rgba(255,171,115,0.38)', ink: '#241106' },
  { id: 15, name: 'gold yellow', group: 'white', neon: '#FFDD00', hover: '#E6C700', active: '#C4A900', glow: 'rgba(255,221,0,0.35)', ink: '#191300' },
  { id: 16, name: 'purple', group: 'white', neon: '#B266FF', hover: '#A05CE6', active: '#884EC4', glow: 'rgba(178,102,255,0.42)', ink: '#140A22' },
  { id: 17, name: 'hot pink', group: 'white', neon: '#FF00E5', hover: '#E600CE', active: '#C400AF', glow: 'rgba(255,0,229,0.4)', ink: '#1D0018' },
  { id: 18, name: 'peach pink', group: 'white', neon: '#FFF0D0', hover: '#EAD8B9', active: '#C7B89E', glow: 'rgba(255,240,208,0.4)', ink: '#241C0E' },
  { id: 19, name: 'ice blue', group: 'white', neon: '#2ED9FF', hover: '#29C3E6', active: '#23A6C4', glow: 'rgba(46,217,255,0.38)', ink: '#00161C' },
  { id: 20, name: 'cool white', group: 'white', neon: '#E8F6FF', hover: '#D1DDE6', active: '#B2BCC4', glow: 'rgba(232,246,255,0.4)', ink: '#0F1A20' },
  { id: 21, name: 'warm white', group: 'white', neon: '#FFF5A0', hover: '#E6DC90', active: '#C4BB7E', glow: 'rgba(255,245,160,0.4)', ink: '#221E08' },
];

export const DEFAULT_NEON_ID = 5;
