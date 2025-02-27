import {Module} from '@nestjs/common';
import {CognitoAuthGuard} from './guards.service';

@Module({
  providers: [CognitoAuthGuard],
  exports: [CognitoAuthGuard],
})
export class GuardsModule {}
