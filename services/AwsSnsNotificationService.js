// AwsSnsNotificationService.js
const snsClient = require('aws-sdk/clients/sns');

class AwsSnsNotificationService {
  constructor(config) {
    this.config = config;
    this.client = new snsClient(this.config);

  }

  /**
   * Publish a message to SNS
   *
   * @param {object} payload
   * @param {object} payload.message The message to send
   * @param {string} payload.topic The topic name to publish to
   *
   * @return {string} MessageId
   */
  async publish(payload) {
    try {
      return this.client.publish({
        Message: JSON.stringify(payload.message),
        TopicArn: `arn:aws:sns:`
        + `${process.env.AWS_REGION}:`
        + `${process.env.AWS_ACCOUNT}:`
        + `${payload.topic}-`
        + `${process.env.APP_ENV}`
      }, (err, data) => {
        if (err) {
          console.error(err, err.stack)
        } else {
          console.log('Publish successful: ' + JSON.stringify(data))
        };
      });

    } catch($e) {
      console.error($e);
      return false;

    }

  }//end publish()

}//end class

module.exports = AwsSnsNotificationService;
