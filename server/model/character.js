'use strict';

class Character {
  canSee(character) {
    return false;
  }
}

class Good extends Character {
}

class Evil extends Character {
  canSee(character) {
    return (character != this) && (character instanceof Evil) && !(character instanceof Oberon);
  }
}

class Merlin extends Good {
  canSee(character) {
    return (character instanceof Evil) && !(character instanceof Oberon);
  }
}

class Percival extends Good {
  canSee(character) {
    return (character instanceof Merlin) || (character instanceof Morgana);
  }
}

class Servant extends Good {
}

class Mordred extends Evil {
}

class Morgana extends Evil {
}

class Oberon extends Evil {
  constructor(canSeeEvil) {
    this.canSeeEvil = canSeeEvil;
  }

  canSeeEvil(character) {
    return this.canSeeEvil ? super.canSee(character) : false;
  }
}

class Minion extends Evil {
}

class Assassin extends Minion {
}
