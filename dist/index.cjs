"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  RosettanetAccount: () => RosettanetAccount,
  rosettanetWallet: () => rosettanetConnect_exports
});
module.exports = __toCommonJS(index_exports);

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
function watchAsset(ewo, asset) {
  return ewo.request({ method: "wallet_watchAsset", params: [asset] });
}
function requestChainId(ewo) {
  return ewo.request({ method: "eth_chainId" });
}
function sendTransaction(ewo, tx) {
  return ewo.request({ method: "eth_sendTransaction", params: [tx] });
}
function switchRosettanetChain(ewo, chainId) {
  return ewo.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId }]
  });
}
function getPermissions(ewo) {
  return ewo.request({ method: "wallet_getPermissions" });
}
function personalSign(ewo, message, address) {
  return ewo.request({ method: "personal_sign", params: [message, address] });
}
function accounts(ewo) {
  return ewo.request({ method: "eth_accounts" });
}
function clientVersion(ewo) {
  return ewo.request({ method: "web3_clientVersion" });
}
function getBlockNumber(ewo) {
  return ewo.request({ method: "eth_blockNumber" });
}
function call(ewo, tx) {
  return ewo.request({ method: "eth_call", params: [tx] });
}
function estimateGas(ewo, tx) {
  return ewo.request({ method: "eth_estimateGas", params: [tx] });
}
function gasPrice(ewo) {
  return ewo.request({ method: "eth_gasPrice" });
}
function getBalance(ewo, address, block = "latest") {
  return ewo.request({ method: "eth_getBalance", params: [address, block] });
}
function getBlockByHash(ewo, blockHash, hydratedTx = false) {
  return ewo.request({ method: "eth_getBlockByHash", params: [blockHash, hydratedTx] });
}
function getBlockByNumber(ewo, blockNumber, hydratedTx = false) {
  return ewo.request({ method: "eth_getBlockByNumber", params: [blockNumber, hydratedTx] });
}
function getBlockTransactionCountByHash(ewo, blockHash) {
  return ewo.request({ method: "eth_getBlockTransactionCountByHash", params: [blockHash] });
}
function getBlockTransactionCountByNumber(ewo, blockNumber) {
  return ewo.request({ method: "eth_getBlockTransactionCountByNumber", params: [blockNumber] });
}
function getCode(ewo, address, block = "latest") {
  return ewo.request({ method: "eth_getCode", params: [address, block] });
}
function getTransactionHashByBlockHashAndIndex(ewo, blockHash, index) {
  return ewo.request({
    method: "eth_getTransactionByBlockHashAndIndex",
    params: [blockHash, index]
  });
}
function getTransactionHashByBlockNumberAndIndex(ewo, blockNumber, index) {
  return ewo.request({
    method: "eth_getTransactionByBlockNumberAndIndex",
    params: [blockNumber, index]
  });
}
function getTransactionByHash(ewo, txHash) {
  return ewo.request({ method: "eth_getTransactionByHash", params: [txHash] });
}
function getTransactionCount(ewo, address, block = "latest") {
  return ewo.request({ method: "eth_getTransactionCount", params: [address, block] });
}
function getTransactionReceipt(ewo, txHash) {
  return ewo.request({ method: "eth_getTransactionReceipt", params: [txHash] });
}
function syncing(ewo) {
  return ewo.request({ method: "eth_syncing" });
}
function signMessage(ewo, message, address) {
  return ewo.request({ method: "eth_signTypedData_v4", params: [address, message] });
}

// src/RosettanetWallet/rosettanetAccount.ts
var import_rosettanet = require("rosettanet");
var import_starknet = require("starknet");
var RosettanetAccount = class _RosettanetAccount extends import_starknet.Account {
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
    const signedHashWithoutPrefix = import_starknet.encode.removeHexPrefix(evmSignedHash);
    const r = import_starknet.cairo.uint256(import_starknet.encode.addHexPrefix(signedHashWithoutPrefix.slice(0, 63)));
    const s = import_starknet.cairo.uint256(import_starknet.encode.addHexPrefix(signedHashWithoutPrefix.slice(64, 127)));
    const v = import_starknet.encode.addHexPrefix(signedHashWithoutPrefix.slice(128, 130));
    if (v !== "0x1c" && v !== "0x1b") {
      throw new Error("Invalid Ethereum Signature");
    }
    return [
      import_starknet.num.toHex(r.low),
      import_starknet.num.toHex(r.high),
      import_starknet.num.toHex(s.low),
      import_starknet.num.toHex(s.high),
      import_starknet.num.toHex(v)
    ];
  }
  async execute(calls) {
    const txCalls = [].concat(calls).map((it) => {
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
    const txData = (0, import_rosettanet.prepareMulticallCalldata)(params.calls);
    const txObject = {
      from: this.address,
      to: this.address,
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RosettanetAccount,
  rosettanetWallet
});
//# sourceMappingURL=index.cjs.map