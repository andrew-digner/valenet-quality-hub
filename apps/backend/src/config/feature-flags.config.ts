import { registerAs } from '@nestjs/config';

const enabled = (value: string | undefined): boolean => value === 'true';

export default registerAs('featureFlags', () => ({
  ai: enabled(process.env.AI_ENABLED),
  appeals: enabled(process.env.APPEALS_ENABLED),
  calibration: enabled(process.env.CALIBRATION_ENABLED),
  notifications: enabled(process.env.NOTIFICATIONS_ENABLED),
}));
