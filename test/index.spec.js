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
    expect(data).toHaveProperty('location');
    expect(data.ip).toBe('127.0.0.1');
  });
});
