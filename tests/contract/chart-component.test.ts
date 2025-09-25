import { describe, it, expect } from 'vitest';
import { Chart } from '../../src/components/Chart';

describe('Chart Component - Basic Tests', () => {
  const simpleData = {
    labels: ['A', 'B'],
    datasets: [{
      label: 'Test',
      data: [1, 2]
    }]
  };

  it('should exist as an export', () => {
    expect(Chart).toBeDefined();
    expect(typeof Chart).toBe('function');
  });

  it('should be a component that can be imported', () => {
    // Just verify the component exists and is importable
    expect(Chart).not.toBeNull();
    expect(Chart).not.toBeUndefined();
  });
});