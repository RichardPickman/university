'use client';

import { createContextualCan } from '@casl/react';
import { createContext } from 'react';

export const AbilityContext = createContext(undefined)

export default createContextualCan(AbilityContext.Consumer)
