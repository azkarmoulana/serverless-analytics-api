import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

let options = {};

// Defining the dynamodb local server options
if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000"
  }
}

// Defining the dynamodb options for jest
if (process.env.JEST_WORKER_ID) {
  options = {
    region: "local-env",
    endpoint: "http://localhost:8000",
    sslEnabled: false
  }
}

const dynamodb = new AWS.DynamoDB.DocumentClient(options);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  /** 
   * Client reques will cantain the header information about the details that we need to calculat the metrics 
   * Ex - pageview, logon, logoff, ip
   */

  // Destructuring relavant information from request headers(only few headers)
  const { logon, logoff, ip } = event.headers;

  /**
   * According to the architecture designed, these data should be loaded to kinesis data strems
   * Since I'm not implementing the Kinesis part, just saving these data to a DynamoDB table
   */

  // Saving all the capturing data in a DynamoDB table
  // Usually I will separate the data layer from business logic layer, but since this is a one singel function,
  // to avoid creating too many files inside the repo, including this inside the handler file itself
  const timestamp = new Date();
  const TableName = process.env.IS_OFFLINE || process.env.JEST_WORKER_ID ? "MetricsTable-dev" : process.env.METRICS_TABLE_NAME!;

  const params = {
    RequestItems: {
      [TableName]: [
        {
          PutRequest: {
            Item: {
              id: uuid(),
              metric: {
                name: "logon",
                value: logon
              },
              timestamp: timestamp.toISOString()
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: uuid(),
              metric: {
                name: "logoff",
                value: logoff
              },
              timestamp: timestamp.toISOString()
            }
          }
        },
        {
          PutRequest: {
            Item: {
              id: uuid(),
              metric: {
                name: "ip",
                value: ip
              },
              timestamp: timestamp.toISOString()
            }
          }
        }
      ]
    }
  };

  let result;
  try {
    result = await dynamodb.batchWrite(params).promise();
  } catch (e) {
    console.error(e);
    return {
      statusCode: 502,
      body: "Internal server error",
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };
};
