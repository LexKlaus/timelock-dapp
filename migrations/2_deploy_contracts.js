const MyToken = artifacts.require("MyToken");
const TimeLock = artifacts.require("TimeLock");

module.exports = async function (deployer) {
  await deployer.deploy(MyToken, "1000000000000000000000000"); // 1 million MTK
  const myTokenInstance = await MyToken.deployed();

  await deployer.deploy(TimeLock, myTokenInstance.address);
};
