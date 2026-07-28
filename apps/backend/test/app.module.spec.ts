import { Test } from '@nestjs/testing';

import { AppModule } from '../src/app.module.js';

describe('AppModule', () => {
  it('compiles the foundation module', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(moduleRef.get(AppModule)).toBeInstanceOf(AppModule);
    await moduleRef.close();
  });
});
