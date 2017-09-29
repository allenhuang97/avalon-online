import io from 'socket.io-client';

import {
  LOBBY_UPDATED,
  GAME_STARTED,
  VOTE_FINISHED
} from 'constants/serverEvents.js';

const socket = io();

export function emitAction(action, data) {
  socket.emit(action, data);
}

// Functions below handle incoming socket events

export function lobbyUpdated(callback) {
  socket.on(LOBBY_UPDATED, players => callback(players));
}

export function gameStarted(callback) {
  socket.on(GAME_STARTED, assignedCharacter => callback(assignedCharacter));
}

export function voteFinished(callback) {
  socket.on(VOTE_FINISHED, voteCount => callback(voteCount));
}
