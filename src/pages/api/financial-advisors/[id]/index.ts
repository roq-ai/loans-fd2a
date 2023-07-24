import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { financialAdvisorValidationSchema } from 'validationSchema/financial-advisors';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.financial_advisor
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFinancialAdvisorById();
    case 'PUT':
      return updateFinancialAdvisorById();
    case 'DELETE':
      return deleteFinancialAdvisorById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFinancialAdvisorById() {
    const data = await prisma.financial_advisor.findFirst(convertQueryToPrismaUtil(req.query, 'financial_advisor'));
    return res.status(200).json(data);
  }

  async function updateFinancialAdvisorById() {
    await financialAdvisorValidationSchema.validate(req.body);
    const data = await prisma.financial_advisor.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFinancialAdvisorById() {
    const data = await prisma.financial_advisor.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
