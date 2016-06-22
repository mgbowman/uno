"use strict";

const should = require('chai').should();
const Game = require('../game');
const Card = require('../card');
const Values = require('../values');
const Colors = require('../colors');

describe('Game', function () {
  it('should error if started with less than 2 players', function (done) {
    let game = Game(["Guilherme"]);
    game.on('error', e => done());
    game.on('start', e => done(e == null ? new Error("Error expected") : null));
  });

  it('should error if started with more than 10 players', function (done) {
    let game = Game([
      "Player 0", "Player 1", "Player 2", "Player 3", "Player 4",
      "Player 5", "Player 6", "Player 7", "Player 8", "Player 9", "Excess"]);
    game.on('error', e => done());
    game.on('start', e => done(e == null ? new Error("Error expected") : null));
  });

  it('should error if player names repeat');

  it('should not start with a special card', function (done) {
    let game = Game(["Player 1", "Player 2", "Player 3", "Player 4"]);
    game.on('start', _ => {
      game.getDiscardedCard().isSpecialCard().should.be.false;
      done();
    });
  });

  it('should start', function (done) {
    let game = null;
    should.not.throw(() => game = Game(["Guilherme", "Thamy Top", "André Marques"]));
    game.on('start', done);
  });

  describe("with more than two players", function () {
    let game = null;

    beforeEach(function (done) {
      game = Game(["Player 1", "Player 2", "Player 3", "Player 4"]);
      game.on('start', done);
    });

    describe("#play()", function () {
      it('should throw if user does not have the played card in hand', function () {
        let curr = game.getCurrentPlayer();

        curr.hand = [
          Card(Values.ZERO, Colors.RED)
        ];

        should.throw(_ => game.play(Card(Values.EIGHT, Colors.BLUE)));
      });

      it('should throw if user must draw');

      it('should throw if the card on discard pile does not match with played card', function () {
        let curr = game.getCurrentPlayer();
        let discardedCard = game.getDiscardedCard();
        let playerCard = Card(
          discardedCard.value == Values.ZERO ? Values.ONE : Values.ZERO,
          discardedCard.color == Colors.RED ? Colors.BLUE : Colors.RED
        );

        curr.hand = [playerCard];

        playerCard.matches(discardedCard).should.be.false;
        should.throw(_ => game.play(playerCard));
      });

      it('should change the playing direction when REVERSE card is accepted');
      it('should not accept players that must draw to play a card');

      it('should remove played card from player hand', function () {
        let curr = game.getCurrentPlayer();
        let discardedCard = game.getDiscardedCard();
        let playerCard = Card(discardedCard.value,
          discardedCard.color == Colors.BLUE ? Colors.RED : Colors.BLUE);

        curr.hand = [playerCard];

        playerCard.matches(discardedCard).should.be.true;

        should.not.throw(_ => game.play(playerCard));
        curr.hand.should.have.length(0);
        curr.hand.should.not.contain(playerCard);
        curr.hand.indexOf(playerCard).should.equal(-1);

        // discarded card must be equal to player card now
        game.getDiscardedCard().color.is(playerCard.color).should.be.true;
        game.getDiscardedCard().value.is(playerCard.value).should.be.true;
      });

      it('should pass turn to next player', function () {
        let curr = game.getCurrentPlayer();
        let discardedCard = game.getDiscardedCard();
        let playerCard = Card(discardedCard.value,
          discardedCard.color == Colors.BLUE ? Colors.RED : Colors.BLUE);

        curr.hand = [playerCard];

        playerCard.matches(discardedCard).should.be.true;

        game.getCurrentPlayer().name.should.equal(curr.name);
        should.not.throw(_ => game.play(playerCard));
        game.getCurrentPlayer().name.should.not.equal(curr.name);
      });
    });

    describe('#pass()', function () {
      it('should throw if player must draw');

      it('should throw if player did not draw before passing', function () {
        should.throw(game.pass);
      });

      it('should pass the play to the next player', function () {
        let curr = game.getCurrentPlayer();
        game.draw();
        game.getCurrentPlayer().name.should.equal(curr.name);        
        should.not.throw(game.pass);
        game.getCurrentPlayer().name.should.not.equal(curr.name);
      });
    });

    describe('#draw()', function () {
      it('should pass to next player if draw card was at place (draw two, wild draw four)');
      it('should add a card to player hand');
    });
  });

  describe("with two players", function () {
    let game = null;

    beforeEach(function (done) {
      game = Game(["Player 1", "Player 2"]);
      game.on('start', done);
    });
  });
});