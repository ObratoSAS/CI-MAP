import axios, { AxiosInstance } from 'axios';

export interface SdkOptions {
  baseUrl: string;
  token?: string;
}

export class NovaLmsSdk {
  private readonly http: AxiosInstance;

  constructor(options: SdkOptions) {
    this.http = axios.create({
      baseURL: options.baseUrl,
      headers: options.token ? { Authorization: `Bearer ${options.token}` } : undefined,
      withCredentials: true,
    });
  }

  async getCourses() {
    const response = await this.http.get('/courses');
    return response.data;
  }
}

export function createSdk(options: SdkOptions) {
  return new NovaLmsSdk(options);
}
