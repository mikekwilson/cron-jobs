// AwsSnsNotificationService.test.js

//Load test subject
const AwsSnsNotificationService = require('../../../services/AwsSnsNotificationService.js');

//Load dependencies
const SnsClient = require('aws-sdk/clients/sns');

//Setup mocks
const mockPublish = jest.fn()
  .mockReturnValueOnce({MessageId:'1234abcd5678efgh'})
  .mockImplementation(() => { throw new Error('Test Error');});

jest.mock('aws-sdk/clients/sns', () => {
 return jest.fn().mockImplementation(() => {
  return {
    publish: mockPublish

  };
 });
});

describe('publish', () => {
  const OLD_ENV = process.env;
  const payload = {
    message : {
      hello : 'world'
    },
    topic : 'hello-world'
  }

  const expectedPublish = {
    Message : "{\"hello\":\"world\"}",
    TopicArn: 'arn:aws:sns:eu-west-1:000000000000:hello-world-test'
  }

  beforeAll(() => {
    process.env.AWS_REGION = 'eu-west-1';
    process.env.AWS_ACCOUNT = '000000000000';
    process.env.APP_ENV = 'test';
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('publish successfully', async () => {
    const snsService = new AwsSnsNotificationService({});

    const result = await snsService.publish(payload);

    expect(SnsClient).toHaveBeenCalled();
    expect(mockPublish).toHaveBeenCalled();
    expect(mockPublish).toHaveBeenCalledWith(expectedPublish);
    expect(result).toBe('1234abcd5678efgh');

  });

  test('publish failed', async () => {
    const snsService = new AwsSnsNotificationService({});

    const result = await snsService.publish(payload);

    expect(SnsClient).toHaveBeenCalled();
    expect(mockPublish).toHaveBeenCalled();
    expect(mockPublish).toHaveBeenCalledWith(expectedPublish);
    expect(result).toBe(false);

  });
})

