class State {
  execute(obj) {}
  enter(obj) {}
  exit(obj) {}
  onMessage(entity, telegram) { return false; }
}

export default State;
