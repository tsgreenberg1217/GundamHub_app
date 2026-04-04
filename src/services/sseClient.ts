import EventSource, {
  type ErrorEvent,
  type ExceptionEvent,
  type TimeoutEvent,
} from 'react-native-sse';

export interface SSEClientOptions {
  url: string;
  method: 'POST' | 'GET';
  headers: Record<string, string>;
  body?: string;
}

export class SSEClient {
  private es: InstanceType<typeof EventSource>;

  constructor(
    options: SSEClientOptions,
    onMessage: (rawData: string) => void,
    onError: (event: ErrorEvent | TimeoutEvent | ExceptionEvent) => void,
    onDone: () => void,
  ) {
    this.es = new EventSource(options.url, {
      method: options.method,
      headers: options.headers,
      body: options.body,
      pollingInterval: 0,
    });

    this.es.addEventListener('open', event => {
      console.log('SSE Client opened', event);
    });

    this.es.addEventListener('message', event => {
      if (event.data) {
        onMessage(event.data);
      }
    });

    this.es.addEventListener('error', e => {
      console.log('SSEClient Error:', e);
      this.es.close();
      onError(e);
    });
    this.es.addEventListener('done', () => {
      console.log('SSE stream done (server closed)');
      this.es.close();
      onDone();
    });

    this.es.addEventListener('close', () => {
      console.log('SSE client closed');
    });
  }

  close(): void {
    this.es.close();
  }
}
