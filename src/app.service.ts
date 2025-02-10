import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  // 新增方法：调用外部 API
  async callDifyApi() {
    const url = 'https://api.dify.ai/v1/chat-messages';
    const apiKey = 'app-SUT6ACnPtUtJ1kKUssFlSObk'; // 替换为你的实际 API Key

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          {
            inputs: {},
            query: '你是谁?',
            response_mode: 'blocking',
            user: 'abc-123',
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data?.answer; // 返回 API 响应数据
    } catch (error) {
      console.error(
        'Error calling Dify API:',
        error.response?.data || error.message,
      );
      return { error: 'Failed to call Dify API', details: error.message };
    }
  }
}
