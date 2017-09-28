'use strict';

class Game {
  constructor() {
    this.id = null;
    this.players = [];
    this.round = 0;
    this.phase = null;
    this.votes = {};
    this.turn = -1;
    this.quest = null;
    this.questResult = [];
  }
}
