'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Expense, ExpensesStore } from '@/lib/expenses.types';
import { localStore } from '@/lib/expenses.local';