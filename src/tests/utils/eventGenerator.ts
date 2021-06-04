import { APIGatewayProxyEvent } from 'aws-lambda';

interface ReqInput {
    body?: any,
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS",
    headers?: any
    path?: string,
    queryStringObject?: any,
    pathParametersObject?: any,
    stageVariables?: any,
}

export const eventGenerator = (input: ReqInput): APIGatewayProxyEvent => {
    const request = {
        body: input.body ? JSON.stringify(input.body) : null,
        headers: input.headers ? JSON.stringify(input.headers) : {},
        multiValueHeaders: {},
        httpMethod: input.method,
        isBase64Encoded: false,
        path: input.path,
        pathParameters: input.pathParametersObject || null,
        queryStringParameters: input.queryStringObject || null,
        multiValueQueryStringParameters: null,
        stageVariables: input.stageVariables,
        requestContext: {
            accountId: '',
            apiId: '',
            httpMethod: input.method,
            identity: {
                accessKey: '',
                accountId: '',
                apiKey: '',
                apiKeyId: '',
                caller: '',
                cognitoAuthenticationProvider: '',
                cognitoAuthenticationType: '',
                cognitoIdentityId: '',
                cognitoIdentityPoolId: '',
                principalOrgId: '',
                sourceIp: '',
                user: '',
                userAgent: '',
                userArn: '',
            },
            path: input.path,
            stage: '',
            requestId: '',
            requestTimeEpoch: 3,
            resourceId: '',
            resourcePath: '',
        },
        resource: '',
    };

    return request as APIGatewayProxyEvent;
}