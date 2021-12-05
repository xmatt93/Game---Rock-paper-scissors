const players = {
  playerHand: "",
  aiHand: "",
  playerName: "",
};

const scores = {
  numberOfGames: "",
  wins: "",
  losses: "",
  draws: "",
};

savePlayerName = () => {
  const input = document.querySelector(".header__input");
  players.playerName = input.value;
  document.querySelector(
    ".main__h1"
  ).textContent = `${players.playerName} turn your hand, please`;
  input.value = "";
  document.querySelector(
    ".section__playerName span"
  ).textContent = `${players.playerName}`;
  scores.numberOfGames = "";
  scores.wins = "";
  scores.losses = "";
  scores.draws = "";
  document.querySelector(".section__numbers span").textContent = "0";
  document.querySelector(".section__losses span").textContent = "0";
  document.querySelector(".section__wins span").textContent = "0";
  document.querySelector(".section__draws span").textContent = "0";
};
document
  .querySelector(".header__btn")
  .addEventListener("click", savePlayerName);

const hands = [...document.querySelectorAll(".main__img")];

handSelect = (event) => {
  players.playerHand = event.target.dataset.option;
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  event.target.style.boxShadow = "0 0 0 4px black";
};
hands.forEach((hand) => hand.addEventListener("click", handSelect));

aiChoice = () => {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
};

checkResult = (player, ai) => {
  if (player === ai) {
    return "draw";
  } else if (player === "scissors" && ai === "paper") {
    return "win";
  } else if (player === "paper" && ai === "rock") {
    return "win";
  } else if (player === "rock" && ai === "scissors") {
    return "win";
  } else {
    return "loss";
  }
};

publishResult = (player, ai, result) => {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;

  if (result === "win") {
    ++scores.wins;
    document.querySelector(
      '[data-summary="who-win"]'
    ).textContent = `"${players.playerName}! ;))"`;
    document.querySelector('[data-summary="who-win"]').style.color = "green";
    document.querySelector(".section__wins span").textContent = scores.wins;
  } else if (result === "draw") {
    ++scores.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Draw ;//";
    document.querySelector('[data-summary="who-win"]').style.color = "gray";
    document.querySelector(".section__draws span").textContent = scores.draws;
  } else if (result === "loss") {
    ++scores.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Computer ;(";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
    document.querySelector(".section__losses span").textContent = scores.losses;
  }
  ++scores.numberOfGames;
  document.querySelector(".section__numbers span").textContent =
    scores.numberOfGames;
};

endGame = () => {
  document.querySelector(
    `[data-option='${players.playerHand}']`
  ).style.boxShadow = "";
  players.playerHand = "";
};

game = () => {
  if (players.playerName === "")
    return alert("Type your player name and click save button!");
  if (players.playerHand === "") return alert("Choose your hand!");
  players.aiHand = aiChoice();
  const gameResult = checkResult(players.playerHand, players.aiHand);
  publishResult(players.playerHand, players.aiHand, gameResult);
  endGame();
};

const letsPlayButton = document.querySelector(".main__btn");
letsPlayButton.addEventListener("click", game);
