const { PubSub } = require("@google-cloud/pubsub")

const publish = (message, topic, pubsub, date) => {
  const timestamp = date.toISOString()
  const data = JSON.stringify({ ...message, timestamp })
  const dataBuffer = Buffer.from(data)

  return pubsub.topic(topic).publish(dataBuffer)
}

module.exports = {
  success: (project, topic, pubsub = new PubSub(), now = new Date()) => {
    const message = { project }

    return publish(message, topic, pubsub, now)
  },

  error: (err, topic, pubsub = new PubSub(), now = new Date()) => {
    const message = { error: { name: err.name, message: err.message } }

    return publish(message, topic, pubsub, now)
  },
}
