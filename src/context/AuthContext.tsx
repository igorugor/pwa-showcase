import { createContext } from 'react';

import type { IAuthContext } from './types';

// Create the context
export const AuthContext = createContext<IAuthContext | null>(null);
