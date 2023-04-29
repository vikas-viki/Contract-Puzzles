const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();
    const signers = await ethers.getSigners();
    return { game, signers};
  }
  it('should be a winner', async function () {
    const { game, signers} = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(signers[1]).write(signers[0].address);
    await game.connect(signers[0]).win(signers[1].address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
