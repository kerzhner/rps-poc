import { Channel } from 'fmg-core';
import { Play, Reveal, Propose } from '../src/game-engine/positions';

const RpsStateContract = artifacts.require("./RockPaperScissorsState.sol");

contract('RockPaperScissorsState', (accounts) => {

  const preCommit = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const salt = "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
  const turnNum = 4;
  const balances = [4, 5];
  const stake = 2;
  const aPlay = Play.Rock;
  const bPlay = Play.Scissors;

  // Serializing / Deserializing
  // ===========================

  const channel = new Channel("0xdeadbeef", 0, [accounts[0], accounts[1]]);
  const propose = new Propose(
    channel, turnNum, balances, stake, preCommit
  )
  const reveal = new Reveal(
    channel, turnNum, balances, stake, aPlay, bPlay, salt
  )
  
  let stateContract;

  before( async () => {
    stateContract = await RpsStateContract.deployed();
  });

  // skipped because web3 can't cope with the positionType object that is returned
  it.skip("can parse positionType", async () => {
    assert.equal(await stateContract.positionType(reveal.toHex()), 'some type');
  });

  it("can parse aBal", async () => {
    assert.equal(await stateContract.aResolution(reveal.toHex()), balances[0]);
  });

  it("can parse bBal", async () => {
    assert.equal(await stateContract.bResolution(reveal.toHex()), balances[1]);
  });

  it("can parse stake", async () => {
    assert.equal(await stateContract.stake(reveal.toHex()), stake);
  });

  it("can parse preCommit", async () => {
    assert.equal(await stateContract.preCommit(propose.toHex()), preCommit);
  });

  // skipped because web3 can't cope with the Play object that is returned
  it.skip("can parse bPlay", async () => {
    assert.equal(await stateContract.bPlay.call(reveal.toHex()), bPlay);
  });

  // skipped because web3 can't cope with the Play object that is returned
  it.skip("can parse aPlay", async () => {
    assert.equal(await stateContract.aPlay.call(reveal.toHex()), aPlay);
  });

  it("can parse salt", async () => {
    assert.equal(await stateContract.salt(reveal.toHex()), salt);
  });

});
