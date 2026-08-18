import { UserRoles } from '../types/enums';
import { test, expect } from '@playwright/test'

test('enums', async ({ page }) => {
  const currentUser: UserRoles = UserRoles.Admin;
  console.log(currentUser);
});