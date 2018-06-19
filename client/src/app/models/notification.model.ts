import { NotificationType } from './notification-type.enum';

export class Notification {
  title: string;
  content: string;
  override?: any;
  type: NotificationType;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
