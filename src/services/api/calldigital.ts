import axios from 'axios';
import { process_sv } from '@/yosys2digitaljs/src/index';

async function callYosys2DigitalAPI(sv_text: string, options: any = {}): Promise<any> {
  try {
    const result = await process_sv(sv_text, options);
    return result;
  } catch (error) {
    console.error('Error calling Yosys2Digital API:', error);
    throw error;
  }
}

export { callYosys2DigitalAPI };
