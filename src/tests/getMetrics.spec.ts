import { handler as getMetrics } from "../../src/functions/getMetrics"
import { eventGenerator } from "./utils/eventGenerator";
import { isApiGatewayResponse } from "./utils/validators"

describe("test suite for getMetrics", () => {

    const event = eventGenerator({
        headers: {
            logon: "true",
            logoff: "false",
            ip: "172.0.93.71",
        },
    });

    test("it should take headers and return an API gateway response", async () => {
        
        const res = await getMetrics(event);

        expect(res).toBeDefined();
        expect(isApiGatewayResponse(res)).toBe(true);
    });

    test("it should perform a batch write operation to dynamodb table", async () => {
        const res = await getMetrics(event);

        expect(isApiGatewayResponse(res)).toBe(true);
        expect(res.statusCode).toBe(201);
        expect(res.body).toBe('{"UnprocessedItems":{}}');
    })
});