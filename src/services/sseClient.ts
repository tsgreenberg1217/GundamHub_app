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
    });

    this.es.addEventListener('message', event => {
      if (event.data) {
        onMessage(event.data);
      }
    });

    this.es.addEventListener('error', onError);
    this.es.addEventListener('close', onDone);
  }

  close(): void {
    this.es.close();
  }
}
