import { APIGatewayProxyResult } from 'aws-lambda';

export const isApiGatewayResponse = (response: APIGatewayProxyResult): boolean => {
    const { body, statusCode } = response;

    if (!body || !statusCode) return false;
    if (typeof statusCode !== 'number') return false;
    if (typeof body !== 'string') return false;
    return true;
};