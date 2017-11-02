const subscribers = {};
const pubsub = {
   subscribe(event, callback) {
      if (!subscribers[event])  {
        subscribers[event] = [];
      }
      subscribers[event].push(callback);
  },

  publish(event, data) {
    if (!subscribers[event]) { return false; }
    subscribers[event].forEach((callback) => {
        callback(data);
    })
  }
};

export default pubsub;
