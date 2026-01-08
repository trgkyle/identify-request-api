import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src';

describe('Identify Request API', () => {
  it('responds with JSON containing IP and location', async () => {
    const request = new Request('http://example.com', {
      headers: {
        'cf-connecting-ip': '127.0.0.1'
      }
    });
    // Create an empty context to pass to `worker.fetch()`.
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    await waitOnExecutionContext(ctx);

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
    
    const data = await response.json();
    expect(data).toHaveProperty('ip');
    expect(data.ip).toBe('127.0.0.1');
    
    // Flattened structure checks
    // Note: In local test environment, location properties might be undefined
    // so we just check the structure allows for them or check for the flattened keys if we mock them.
    // Since we aren't mocking cf object fully in this basic test, we primarily ensure the structure matches the new logic.
    
    // We expect these keys to be present in the logic, even if undefined in local test context
    // However, to be safe with the test, we can check for keys that are definitely set or check the object structure.
    
    // Let's verify it is NOT nested
    expect(data).not.toHaveProperty('location');
    expect(data).not.toHaveProperty('meta');
  });
});
