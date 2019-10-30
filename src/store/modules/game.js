import defaultGame from '@/assets/default.game.json'
import { uuidv4 } from '@/util/util';


export default {
  state: {
    game: {
      name: '',
      id: '',
      pointUnit: '', // dollars
      pointMultiplier: '', // 100 for single, 200 for double
      buzzerLock: '',
      categories: '',
      answers: '',
      completedAnswerCounter: '',
      gameType: '', // single, double, or final.
      answer: '',
      wager: null
    },
    games: [
    ],
  },
  getters: {
    game: state => {
      return state.game;
    },
    singleGames: state => {
      return state.games.filter((g) => g.type === 'single');
    },
    doubleGames: state => {
      return state.games.filter((g) => g.type === 'double');
    },
    finalGames: state => {
      return state.games.filter((g) => g.type === 'final');
    },
    games: state => {
      return state.games;
    },
    isBuzzerLocked: state => {
      return state.game.buzzerLock;
    },
    pointMultiplier: state => {
      return state.game.pointMultiplier;
    },
    gameId: state => {
      return state.game.id;
    },
    answers: state => {
      return state.game.answers;
    },
    categories: state => {
      return state.game.categories;
    },
    completedAnswerCounter: state => {
      return state.game.completedAnswerCounter;
    }
  },
  mutations: {
    updateCategoryText(state, categoryData) {
      state.game.categories[categoryData.categoryIndex] = categoryData.text;
    },
    createGame(state, gameObject) {
      state.games.push({
        ...defaultGame,
        ...gameObject,
        id: uuidv4(),
      });
    },
    updateGame(state, gameObject) {
      let i = state.games.findIndex((g) => g.id === gameObject.id);
      state.games[i] = gameObject;
    },
    deleteGame(state, gameId) {
      let i = state.games.findIndex((g) => g.id === gameId);
      state.games.splice(i, 1)
    },
    unlockBuzzers(state) {
      state.game.buzzerLock = false;
    },
    lockBuzzers(state) {
      state.game.buzzerLock = true;
    },
    makeUnavailable(state, answerId) {
      const category = parseInt(answerId[0]);
      const item = parseInt(answerId[1]);
      let answer = state.game.answers.find((a) => {
        return a.category === category && a.item === item;
      });
      return answer.available = false;
    },
    loadDefaultGame(state) {
      return state.game = defaultGame;
    },
    loadGame(state, gameId) {
      let game = state.games.find((g) => g.id === gameId);
      state.game = game;
    },
    setGameId(state, gameId) {
      return state.game = { ...state.game, id: gameId };
    },
    setActiveAnswer(state, answerId) {
      const category = parseInt(answerId[0]);
      const item = parseInt(answerId[1]);
      let answer = state.game.answers.find((a) => {
        return a.category === category && a.item === item;
      });
      return state.game = { ...state.game, answer: answer };
    },
    incrementCompletedAnswerCounter(state) {
      if (typeof state.game.completedAnswerCounter === 'undefined') {
        return state.game = { ...state.game, completedAnswerCounter: 1 };
      }
      else {
        return state.game = { ...state.game, completedAnswerCounter: state.game.completedAnswerCounter+1 };
      }
    },
    submitWager(state, wager) {
      return state.game = { ...state.game, wager: wager };
    },
    clearWager(state) {
      return state.game = { ...state.game, wager: null };
    },
    updateImage(state, imageData) {
      return state.game.answer.image = imageData.imageURI;
    },
    updateAnswerText(state, text) {
      return state.game.answer.answerText = text;
    },
    updateQuestionText(state, text) {
      return state.game.answer.questionText = text;
    },
    updateDailyDouble(state, isDailyDouble) {
      return state.game.answer.dailyDouble = isDailyDouble;
    },
    updateGameTitle(state, text) {
      return state.game.name = text;
    },
    restartGame(state) {
      state.game.completedAnswerCounter = 0;
      return state.game.answers.forEach((a) => {
        a.available = true;
      })
    }
  }
}
