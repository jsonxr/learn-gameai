class Telegram {
  dispatchTime = 0;
  sender = null;
  receiver = null;
  msg = null;
  extraInfo = null;
  constructor(options) {
    Object.assign(this, options);
  }
}

export {
  Telegram as default,
  Telegram,
}
