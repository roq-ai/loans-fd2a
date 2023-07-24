interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: [''],
  customerRoles: [''],
  tenantRoles: ['Financial Advisor'],
  tenantName: 'Organization',
  applicationName: 'loans',
  addOns: ['chat', 'notifications', 'file'],
};
