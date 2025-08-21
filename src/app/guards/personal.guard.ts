import { CanActivateFn } from '@angular/router';

export const personalGuard: CanActivateFn = (route, state) => {
  return true;
};
