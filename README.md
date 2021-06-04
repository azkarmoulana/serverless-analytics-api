<h1 align="center">:zap::zap: Serverless Analytics API</h1>
<hr>

<p align="center">
  <img width="800" src="https://i.imgur.com/DJnko7G.png" alt="architecture diagram">
</p>

API to capture time series data from client application to genarate relevant metrics for real time dashboard
***
<br>

### How to run the app locally
1. Clone the repository
2. Navigate to the project folder
3. Run `npm install` to install all the required dependencies
4. Run `sls dynamodb install` to install DynamoDB local plugin(You need to have installed JRE(Java Runtime Environment) in your local machine)
5. Run `npm run start:dev` to start the serverless offline application locally

### API endpoints
**Request**
- Path: `/{STAGE}/getMerics`  
- Method: `POST`  
- Required parameters:  
  - Need to add the required header values in request header
  
**Response**
- API returns the `201` on success

### Running unit tests  
Unit tests are written using [Jest](https://jestjs.io/)
1. Run `npm run test` to run the unit tests(Make sure to run the serverless offline application in background)
