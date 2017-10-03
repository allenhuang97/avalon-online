import io from 'socket.io-client';

import {
  LOBBY_UPDATED,
  GAME_STARTED,
  GAME_SETUP_COMPLETE,
  VOTE_STARTED,
  VOTE_FINISHED,
  QUEST_PLAYERS_UPDATED,
  QUEST_FINISHED
} from 'constants/serverEvents.js';

const socket = io();

export function emitAction(action, data) {
  socket.emit(action, data);
}

// Functions below handle incoming socket events from server

export function lobbyUpdated(callback) {
  socket.on(LOBBY_UPDATED, players => callback(players));
}

export function gameStarted(callback) {
  socket.on(GAME_STARTED, callback);
}

export function gameSetupComplete(callback) {
  socket.on(GAME_SETUP_COMPLETE, data => callback(data));
}

export function questPlayersUpdated(callback) {
  socket.on(QUEST_PLAYERS_UPDATED, questPlayers => callback(questPlayers));
}

export function voteStarted(callback) {
  socket.on(VOTE_STARTED, callback);
}

export function voteFinished(callback) {
  socket.on(VOTE_FINISHED, voteCount => callback(voteCount));
}

export function questFinished(callback) {
  socket.on(QUEST_FINISHED, state => callback(state));
}
