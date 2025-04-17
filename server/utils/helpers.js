
// Generate a unique tracking ID for grievances
const generateTrackingId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `GR${timestamp}${random}`;
};

module.exports = {
  generateTrackingId
};
