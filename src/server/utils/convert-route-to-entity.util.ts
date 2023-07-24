const mapping: Record<string, string> = {
  customers: 'customer',
  'financial-advisors': 'financial_advisor',
  organizations: 'organization',
  'personal-loans': 'personal_loan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
