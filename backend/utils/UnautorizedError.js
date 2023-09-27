class UnautorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnautorizedError';
  }
}

module.exports = UnautorizedError;
