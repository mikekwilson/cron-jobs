// AwsSnsNotificationService.test.js

//Load test subject
const AwsSnsNotificationService = require('../../../services/AwsSnsNotificationService.js');

//Load dependencies
const SnsClient = require('aws-sdk/clients/sns');

//Setup mocks
const snsReturn = {
        "ResponseMetadata": {
          "RequestId": "3ec3262a-3abe-5b85-961b-7e1d07cee3c5"
          },
        "MessageId": "1234abcd5678efgh"
      };
const mockPromise = jest.fn()
  .mockReturnValueOnce(new Promise((resolve, reject) => {
    resolve(snsReturn);
  }))
  .mockReturnValue(new Promise((resolve, reject) => {
    throw new Error('Test Error');
  }));

const mockPublish = jest.fn()
  .mockImplementation(() => {
    return {
      promise: mockPromise

    };
  })

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
    expect(result).toBe('1234abcd5678efgh');

  });

  test('publish failed', async () => {
    const snsService = new AwsSnsNotificationService({});

    const result = await snsService.publish(payload);

    expect(SnsClient).toHaveBeenCalled();
    expect(result).toBe(false);

  });
})

