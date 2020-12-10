function getRandomNumber(max) {
  return (Math.floor((Math.random() * max)));
}
function getNextRoundRobin(total, current) {
  return (current + 1) % total;
}

export { getRandomNumber, getNextRoundRobin };
