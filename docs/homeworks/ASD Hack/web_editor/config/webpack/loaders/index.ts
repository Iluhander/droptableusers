import { ModuleOptions } from 'webpack';
import { deriveCSSLoaders } from './css';
import { deriveTSLoaders } from './ts';
import { deriveFontsLoaders } from './fonts';

export function deriveLoaders(): ModuleOptions['rules'] {
  return [...deriveCSSLoaders(), deriveTSLoaders(), deriveFontsLoaders()];
}
