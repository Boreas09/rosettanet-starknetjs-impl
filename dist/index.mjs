var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/RosettanetWallet/rosettanetConnect.ts
var rosettanetConnect_exports = {};
__export(rosettanetConnect_exports, {
  accounts: () => accounts,
  call: () => call,
  clientVersion: () => clientVersion,
  estimateGas: () => estimateGas,
  gasPrice: () => gasPrice,
  getBalance: () => getBalance,
  getBlockByHash: () => getBlockByHash,
  getBlockByNumber: () => getBlockByNumber,
  getBlockNumber: () => getBlockNumber,
  getBlockTransactionCountByHash: () => getBlockTransactionCountByHash,
  getBlockTransactionCountByNumber: () => getBlockTransactionCountByNumber,
  getCode: () => getCode,
  getPermissions: () => getPermissions,
  getTransactionByHash: () => getTransactionByHash,
  getTransactionCount: () => getTransactionCount,
  getTransactionHashByBlockHashAndIndex: () => getTransactionHashByBlockHashAndIndex,
  getTransactionHashByBlockNumberAndIndex: () => getTransactionHashByBlockNumberAndIndex,
  getTransactionReceipt: () => getTransactionReceipt,
  personalSign: () => personalSign,
  requestAccounts: () => requestAccounts,
  requestChainId: () => requestChainId,
  sendTransaction: () => sendTransaction,
  signMessage: () => signMessage,
  switchRosettanetChain: () => switchRosettanetChain,
  syncing: () => syncing,
  watchAsset: () => watchAsset
});
function requestAccounts(ewo) {
  return ewo.request({ method: "eth_requestAccounts" });
}
__name(requestAccounts, "requestAccounts");
function watchAsset(ewo, asset) {
  return ewo.request({ method: "wallet_watchAsset", params: [asset] });
}
__name(watchAsset, "watchAsset");
function requestChainId(ewo) {
  return ewo.request({ method: "eth_chainId" });
}
__name(requestChainId, "requestChainId");
function sendTransaction(ewo, tx) {
  return ewo.request({ method: "eth_sendTransaction", params: [tx] });
}
__name(sendTransaction, "sendTransaction");
function switchRosettanetChain(ewo, chainId) {
  return ewo.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId }]
  });
}
__name(switchRosettanetChain, "switchRosettanetChain");
function getPermissions(ewo) {
  return ewo.request({ method: "wallet_getPermissions" });
}
__name(getPermissions, "getPermissions");
function personalSign(ewo, message, address) {
  return ewo.request({ method: "personal_sign", params: [message, address] });
}
__name(personalSign, "personalSign");
function accounts(ewo) {
  return ewo.request({ method: "eth_accounts" });
}
__name(accounts, "accounts");
function clientVersion(ewo) {
  return ewo.request({ method: "web3_clientVersion" });
}
__name(clientVersion, "clientVersion");
function getBlockNumber(ewo) {
  return ewo.request({ method: "eth_blockNumber" });
}
__name(getBlockNumber, "getBlockNumber");
function call(ewo, tx) {
  return ewo.request({ method: "eth_call", params: [tx] });
}
__name(call, "call");
function estimateGas(ewo, tx) {
  return ewo.request({ method: "eth_estimateGas", params: [tx] });
}
__name(estimateGas, "estimateGas");
function gasPrice(ewo) {
  return ewo.request({ method: "eth_gasPrice" });
}
__name(gasPrice, "gasPrice");
function getBalance(ewo, address, block = "latest") {
  return ewo.request({ method: "eth_getBalance", params: [address, block] });
}
__name(getBalance, "getBalance");
function getBlockByHash(ewo, blockHash, hydratedTx = false) {
  return ewo.request({ method: "eth_getBlockByHash", params: [blockHash, hydratedTx] });
}
__name(getBlockByHash, "getBlockByHash");
function getBlockByNumber(ewo, blockNumber, hydratedTx = false) {
  return ewo.request({ method: "eth_getBlockByNumber", params: [blockNumber, hydratedTx] });
}
__name(getBlockByNumber, "getBlockByNumber");
function getBlockTransactionCountByHash(ewo, blockHash) {
  return ewo.request({ method: "eth_getBlockTransactionCountByHash", params: [blockHash] });
}
__name(getBlockTransactionCountByHash, "getBlockTransactionCountByHash");
function getBlockTransactionCountByNumber(ewo, blockNumber) {
  return ewo.request({ method: "eth_getBlockTransactionCountByNumber", params: [blockNumber] });
}
__name(getBlockTransactionCountByNumber, "getBlockTransactionCountByNumber");
function getCode(ewo, address, block = "latest") {
  return ewo.request({ method: "eth_getCode", params: [address, block] });
}
__name(getCode, "getCode");
function getTransactionHashByBlockHashAndIndex(ewo, blockHash, index) {
  return ewo.request({
    method: "eth_getTransactionByBlockHashAndIndex",
    params: [blockHash, index]
  });
}
__name(getTransactionHashByBlockHashAndIndex, "getTransactionHashByBlockHashAndIndex");
function getTransactionHashByBlockNumberAndIndex(ewo, blockNumber, index) {
  return ewo.request({
    method: "eth_getTransactionByBlockNumberAndIndex",
    params: [blockNumber, index]
  });
}
__name(getTransactionHashByBlockNumberAndIndex, "getTransactionHashByBlockNumberAndIndex");
function getTransactionByHash(ewo, txHash) {
  return ewo.request({ method: "eth_getTransactionByHash", params: [txHash] });
}
__name(getTransactionByHash, "getTransactionByHash");
function getTransactionCount(ewo, address, block = "latest") {
  return ewo.request({ method: "eth_getTransactionCount", params: [address, block] });
}
__name(getTransactionCount, "getTransactionCount");
function getTransactionReceipt(ewo, txHash) {
  return ewo.request({ method: "eth_getTransactionReceipt", params: [txHash] });
}
__name(getTransactionReceipt, "getTransactionReceipt");
function syncing(ewo) {
  return ewo.request({ method: "eth_syncing" });
}
__name(syncing, "syncing");
function signMessage(ewo, message, address) {
  return ewo.request({ method: "eth_signTypedData_v4", params: [address, message] });
}
__name(signMessage, "signMessage");

// src/RosettanetWallet/rosettanetAccount.ts
import { prepareMulticallCalldata } from "rosettanet";
import {
  cairo,
  encode,
  num,
  Account
} from "starknet";
var RosettanetAccount = class _RosettanetAccount extends Account {
  static {
    __name(this, "RosettanetAccount");
  }
  walletProvider;
  constructor(providerOrOptions, walletProvider, cairoVersion, address = "") {
    super(providerOrOptions, address, "", cairoVersion);
    this.walletProvider = walletProvider;
    if (!address.length) {
      console.warn(
        "@deprecated Use static method WalletAccount.connect or WalletAccount.connectSilent instead. Constructor {@link WalletAccount.(format:2)}."
      );
      requestAccounts(this.walletProvider).then(([accountAddress]) => {
        this.address = accountAddress.toLowerCase();
      });
    }
  }
  /**
   * Send transaction to the wallet.
   * @param params Ethereum transaction object.
   * @returns Transaction hash.
   */
  sendTransactionRosettanet(params) {
    return sendTransaction(this.walletProvider, params);
  }
  /**
   * Request the current chain ID from the wallet.
   * @returns The current Wallet Chain ID.
   */
  chainIdRosettanet() {
    return requestChainId(this.walletProvider);
  }
  /**
   * Sign typed data using the wallet. Uses personal_sign method.
   * @param message The typed data to sign.
   * @param address The wallet address to sign.
   * @returns Signatures as strings.
   */
  personalSignRosettanet(message, address) {
    return personalSign(this.walletProvider, message, address);
  }
  /**
   * Request connected accounts
   * @returns connected accounts addresses
   */
  accountsRosettanet() {
    return accounts(this.walletProvider);
  }
  /**
   * Request latest block number in Starknet
   * @returns latest block number in hexadecimal format
   */
  blockNumberRosettanet() {
    return getBlockNumber(this.walletProvider);
  }
  /**
   * Call request.
   * @param tx Ethereum transaction object.
   * @returns Answer from called contract.
   */
  callRosettanet(tx) {
    return call(this.walletProvider, tx);
  }
  /**
   * Estimated gas fee for the transaction.
   * @param tx Ethereum transaction object.
   * @returns Estimated gas amount.
   */
  estimateGasRosettanet(tx) {
    return estimateGas(this.walletProvider, tx);
  }
  /**
   * Latest gas price in network.
   * @returns Latest gas price.
   */
  gasPriceRosettanet() {
    return gasPrice(this.walletProvider);
  }
  /**
   * STRK balance of given address.
   * @param address Address to check balance.
   * @param block Block number or hash. (optional)
   * @returns STRK balance.
   */
  getBalanceRosettanet(address, block = "latest") {
    return getBalance(this.walletProvider, address, block);
  }
  /**
   * Block by given block hash.
   * @param blockHash Block hash.
   * @param hydratedTx Hydrated transactions (optional)
   * @returns Block by given block hash.
   */
  getBlockByHashRosettanet(blockHash, hydratedTx = false) {
    return getBlockByHash(this.walletProvider, blockHash, hydratedTx);
  }
  /**
   * Block by given block number.
   * @param blockNumber Block number or block tag.
   * @param hydratedTx Hydrated transactions (optional)
   * @returns Block by given block number.
   */
  getBlockByNumberRosettanet(blockNumber, hydratedTx = false) {
    return getBlockByNumber(this.walletProvider, blockNumber, hydratedTx);
  }
  /**
   * Transaction count of given block hash.
   * @param blockHash Block hash.
   * @returns Transaction count of given block hash.
   */
  getBlockTransactionCountByHashRosettanet(blockHash) {
    return getBlockTransactionCountByHash(this.walletProvider, blockHash);
  }
  /**
   * Transaction count of given block number.
   * @param blockNumber Block number or block tag..
   * @returns Transaction count of given block number.
   */
  getBlockTransactionCountByNumberRosettanet(blockNumber) {
    return getBlockTransactionCountByNumber(this.walletProvider, blockNumber);
  }
  getCodeRosettanet(address, block = "latest") {
    return getCode(this.walletProvider, address, block);
  }
  getTransactionHashByBlockHashAndIndexRosettanet(blockHash, index) {
    return getTransactionHashByBlockHashAndIndex(this.walletProvider, blockHash, index);
  }
  getTransactionHashByBlockNumberAndIndexRosettanet(blockNumber, index) {
    return getTransactionHashByBlockNumberAndIndex(this.walletProvider, blockNumber, index);
  }
  getTransactionByHashRosettanet(txHash) {
    return getTransactionByHash(this.walletProvider, txHash);
  }
  /**
   * Transaction count of given address.
   * @param address address.
   * @returns Transaction count of given address.
   */
  getTransactionCountRosettanet(address, block = "latest") {
    return getTransactionCount(this.walletProvider, address, block);
  }
  /**
   * Transaction receipt of given transaction hash.
   * @param txHash address.
   * @returns Transaction receipt of given transaction hash.
   */
  getTransactionReceiptRosettanet(txHash) {
    return getTransactionReceipt(this.walletProvider, txHash);
  }
  // WALLET ACCOUNT METHODS
  requestAccounts() {
    return requestAccounts(this.walletProvider);
  }
  /**
   * Request Permission for wallet account
   * @returns allowed accounts addresses
   */
  getPermissions() {
    if (this.walletProvider.name === "Coinbase Wallet") {
      throw new Error("Get permissions Method not found in Coinbase Wallet");
    }
    return getPermissions(this.walletProvider);
  }
  switchStarknetChain(chainId) {
    return switchRosettanetChain(this.walletProvider, chainId);
  }
  /**
   * Request adding ERC20 Token to Wallet List
   * @param asset WatchAssetParameters
   * @returns boolean
   */
  watchAsset(asset) {
    return watchAsset(this.walletProvider, asset);
  }
  declare() {
    throw new Error("Declare Method not implemented in Rosettanet Account Class.");
  }
  deploy() {
    throw new Error("Deploy Method not implemented in Rosettanet Account Class.");
  }
  /**
   * Sign typed data using the wallet. Uses eth_signTypedData_v4 method.
   * @param message The typed data to sign.
   * @returns Signature as strings.
   */
  async signMessage(message) {
    const evmSignedHash = await signMessage(this.walletProvider, message, this.address);
    if (!evmSignedHash || evmSignedHash.length !== 132 && evmSignedHash.length !== 130) {
      throw new Error("Ethereum Signature error");
    }
    const signedHashWithoutPrefix = encode.removeHexPrefix(evmSignedHash);
    const r = cairo.uint256(encode.addHexPrefix(signedHashWithoutPrefix.slice(0, 63)));
    const s = cairo.uint256(encode.addHexPrefix(signedHashWithoutPrefix.slice(64, 127)));
    const v = encode.addHexPrefix(signedHashWithoutPrefix.slice(128, 130));
    if (v !== "0x1c" && v !== "0x1b") {
      throw new Error("Invalid Ethereum Signature");
    }
    return [
      num.toHex(r.low),
      num.toHex(r.high),
      num.toHex(s.low),
      num.toHex(s.high),
      num.toHex(v)
    ];
  }
  async execute(calls) {
    if (Array.isArray(calls) === false) {
      throw new Error("Invalid calls parameter. Expected an array of calls.");
    }
    const arrayCalls = calls.map((item) => [
      item.contractAddress,
      item.entrypoint,
      item.calldata
    ]);
    const txCalls = [].concat(arrayCalls).map((it) => {
      const { contractAddress, entrypoint, calldata } = it;
      return {
        contract_address: contractAddress,
        entry_point: entrypoint,
        calldata
      };
    });
    const params = {
      calls: txCalls
    };
    const txData = prepareMulticallCalldata(params.calls);
    const txObject = {
      from: this.address,
      to: "0x0000000000000000000000004645415455524553",
      data: txData,
      value: "0x0"
    };
    const txHash = await sendTransaction(this.walletProvider, txObject);
    return { transaction_hash: txHash };
  }
  static async connect(provider, walletProvider, cairoVersion) {
    const [accountAddress] = await requestAccounts(walletProvider);
    return new _RosettanetAccount(provider, walletProvider, cairoVersion, accountAddress);
  }
  static async connectSilent(provider, walletProvider, cairoVersion) {
    const [accountAddress] = await requestAccounts(walletProvider);
    return new _RosettanetAccount(provider, walletProvider, cairoVersion, accountAddress);
  }
};
export {
  RosettanetAccount,
  rosettanetConnect_exports as rosettanetWallet
};
//# sourceMappingURL=index.mjs.map