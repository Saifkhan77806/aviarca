'use client';

import { useQuery } from '@tanstack/react-query';
import { getBillById } from '@/data/bill';

export const useBillQuery = (id: string | null) => {
  return useQuery({
    queryKey: ['bill', id],
    queryFn: () => getBillById(id),
    enabled: !!id,
  });
};
