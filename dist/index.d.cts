import { RequestFn, WalletEventListener, WatchAssetParameters, ChainId, Permission, TypedData } from '@starknet-io/types-js';
import { Account, AccountInterface, ProviderOptions, ProviderInterface, CairoVersion, ArraySignatureType, Call } from 'starknet';

/**
 * PRIMITIVES
 */
/**
 * An Ethereum address, represented as 40 hex digits.
 * @pattern ^0x[a-fA-F0-9]{40}$
 */
type ETH_ADDRESS = string;
/**
 * A transaction hash, represented as a 32-byte hex string.
 * @pattern ^0x[a-fA-F0-9]{64}$
 */
type TXN_HASH = string;
/**
 * A block hash, represented as a 32-byte hex string.
 * @pattern ^0x[a-fA-F0-9]{64}$
 */
type BLOCK_HASH = string;
/**
 * A block number, represented as a positive integer.
 */
type BLOCK_NUMBER = string | number | 'latest' | 'finalized' | 'pending';
/**
 * Block Tag of 'latest' or 'pending' block.
 */
type BLOCK_TAG = 'latest' | 'pending';
/**
 * Ethereum Transaction Request Type
 */
type TX_REQUEST = {
    /** The transaction type (optional). */
    type?: null | number;
    /** The target address of the transaction (optional). */
    to?: null | ETH_ADDRESS;
    /** The sender address of the transaction (optional). */
    from?: null | ETH_ADDRESS;
    /** The nonce of the transaction (optional). */
    nonce?: null | number;
    /** The gas limit for the transaction (optional). */
    gasLimit?: null | string;
    /** The gas price for legacy transactions (optional). */
    gasPrice?: null | string;
    /** The max priority fee to pay per gas (EIP-1559) (optional). */
    maxPriorityFeePerGas?: null | string;
    /** The max total fee to pay per gas (EIP-1559) (optional). */
    maxFeePerGas?: null | string;
    /** The transaction data (optional). */
    data?: null | string;
    /** The value of the transaction in wei (optional). */
    value?: null | string;
    /** The chain ID for the transaction (optional). */
    chainId?: null | string;
    /** The access list for EIP-2930 transactions (optional). */
    accessList?: null | Array<{
        address: ETH_ADDRESS;
        storageKeys: string[];
    }>;
    /** Custom data for network-specific values (optional). */
    customData?: any;
    /** Block tag for call or estimateGas (optional). */
    blockTag?: string;
    /** Whether CCIP-read should be enabled (optional). */
    enableCcipRead?: boolean;
    /** Blob versioned hashes for EIP-4844 transactions (optional). */
    blobVersionedHashes?: null | Array<string>;
    /** The maximum fee per blob gas for EIP-4844 (optional). */
    maxFeePerBlobGas?: null | string;
};

interface Request extends RequestFn {
    (request: {
        method: string;
        params?: Array<unknown>;
    }): Promise<any>;
}
interface EthereumWindowObject {
    request: Request;
    on: WalletEventListener;
    off: WalletEventListener;
    id: string;
    name: string;
    icon: string;
    version: '1.0.0';
}
declare function requestAccounts(ewo: EthereumWindowObject): Promise<string[]>;
declare function watchAsset(ewo: EthereumWindowObject, asset: WatchAssetParameters): Promise<boolean>;
declare function requestChainId(ewo: EthereumWindowObject): Promise<string>;
declare function sendTransaction(ewo: EthereumWindowObject, tx: TX_REQUEST): Promise<string>;
declare function switchRosettanetChain(ewo: EthereumWindowObject, chainId: ChainId): Promise<string>;
declare function getPermissions(ewo: EthereumWindowObject): Promise<Permission[]>;
declare function personalSign(ewo: EthereumWindowObject, message: string, address: string): Promise<string>;
declare function accounts(ewo: EthereumWindowObject): Promise<string[]>;
declare function clientVersion(ewo: EthereumWindowObject): Promise<string>;
declare function getBlockNumber(ewo: EthereumWindowObject): Promise<string>;
declare function call(ewo: EthereumWindowObject, tx: TX_REQUEST): Promise<string>;
declare function estimateGas(ewo: EthereumWindowObject, tx: TX_REQUEST): Promise<string>;
declare function gasPrice(ewo: EthereumWindowObject): Promise<string>;
declare function getBalance(ewo: EthereumWindowObject, address: string, block?: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
declare function getBlockByHash(ewo: EthereumWindowObject, blockHash: BLOCK_HASH, hydratedTx?: boolean): Promise<string>;
declare function getBlockByNumber(ewo: EthereumWindowObject, blockNumber: BLOCK_NUMBER | BLOCK_TAG, hydratedTx?: boolean): Promise<string>;
declare function getBlockTransactionCountByHash(ewo: EthereumWindowObject, blockHash: BLOCK_HASH): Promise<string>;
declare function getBlockTransactionCountByNumber(ewo: EthereumWindowObject, blockNumber: BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
declare function getCode(ewo: EthereumWindowObject, address: string, block?: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
declare function getTransactionHashByBlockHashAndIndex(ewo: EthereumWindowObject, blockHash: BLOCK_HASH, index: string): Promise<string>;
declare function getTransactionHashByBlockNumberAndIndex(ewo: EthereumWindowObject, blockNumber: BLOCK_NUMBER | BLOCK_TAG, index: string): Promise<string>;
declare function getTransactionByHash(ewo: EthereumWindowObject, txHash: TXN_HASH): Promise<string>;
declare function getTransactionCount(ewo: EthereumWindowObject, address: string, block?: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
declare function getTransactionReceipt(ewo: EthereumWindowObject, txHash: TXN_HASH): Promise<string>;
declare function syncing(ewo: EthereumWindowObject): Promise<string>;
/**
 * Sign typed data using the wallet.
 * @param ewo wallet window object to request the signature.
 * @param message The typed data to sign.
 * @param address The wallet address to sign.
 * @returns Signatures as strings.
 */
declare function signMessage(ewo: EthereumWindowObject, message: TypedData, address: string): Promise<string>;

type rosettanetConnect_EthereumWindowObject = EthereumWindowObject;
declare const rosettanetConnect_accounts: typeof accounts;
declare const rosettanetConnect_call: typeof call;
declare const rosettanetConnect_clientVersion: typeof clientVersion;
declare const rosettanetConnect_estimateGas: typeof estimateGas;
declare const rosettanetConnect_gasPrice: typeof gasPrice;
declare const rosettanetConnect_getBalance: typeof getBalance;
declare const rosettanetConnect_getBlockByHash: typeof getBlockByHash;
declare const rosettanetConnect_getBlockByNumber: typeof getBlockByNumber;
declare const rosettanetConnect_getBlockNumber: typeof getBlockNumber;
declare const rosettanetConnect_getBlockTransactionCountByHash: typeof getBlockTransactionCountByHash;
declare const rosettanetConnect_getBlockTransactionCountByNumber: typeof getBlockTransactionCountByNumber;
declare const rosettanetConnect_getCode: typeof getCode;
declare const rosettanetConnect_getPermissions: typeof getPermissions;
declare const rosettanetConnect_getTransactionByHash: typeof getTransactionByHash;
declare const rosettanetConnect_getTransactionCount: typeof getTransactionCount;
declare const rosettanetConnect_getTransactionHashByBlockHashAndIndex: typeof getTransactionHashByBlockHashAndIndex;
declare const rosettanetConnect_getTransactionHashByBlockNumberAndIndex: typeof getTransactionHashByBlockNumberAndIndex;
declare const rosettanetConnect_getTransactionReceipt: typeof getTransactionReceipt;
declare const rosettanetConnect_personalSign: typeof personalSign;
declare const rosettanetConnect_requestAccounts: typeof requestAccounts;
declare const rosettanetConnect_requestChainId: typeof requestChainId;
declare const rosettanetConnect_sendTransaction: typeof sendTransaction;
declare const rosettanetConnect_signMessage: typeof signMessage;
declare const rosettanetConnect_switchRosettanetChain: typeof switchRosettanetChain;
declare const rosettanetConnect_syncing: typeof syncing;
declare const rosettanetConnect_watchAsset: typeof watchAsset;
declare namespace rosettanetConnect {
  export { type rosettanetConnect_EthereumWindowObject as EthereumWindowObject, rosettanetConnect_accounts as accounts, rosettanetConnect_call as call, rosettanetConnect_clientVersion as clientVersion, rosettanetConnect_estimateGas as estimateGas, rosettanetConnect_gasPrice as gasPrice, rosettanetConnect_getBalance as getBalance, rosettanetConnect_getBlockByHash as getBlockByHash, rosettanetConnect_getBlockByNumber as getBlockByNumber, rosettanetConnect_getBlockNumber as getBlockNumber, rosettanetConnect_getBlockTransactionCountByHash as getBlockTransactionCountByHash, rosettanetConnect_getBlockTransactionCountByNumber as getBlockTransactionCountByNumber, rosettanetConnect_getCode as getCode, rosettanetConnect_getPermissions as getPermissions, rosettanetConnect_getTransactionByHash as getTransactionByHash, rosettanetConnect_getTransactionCount as getTransactionCount, rosettanetConnect_getTransactionHashByBlockHashAndIndex as getTransactionHashByBlockHashAndIndex, rosettanetConnect_getTransactionHashByBlockNumberAndIndex as getTransactionHashByBlockNumberAndIndex, rosettanetConnect_getTransactionReceipt as getTransactionReceipt, rosettanetConnect_personalSign as personalSign, rosettanetConnect_requestAccounts as requestAccounts, rosettanetConnect_requestChainId as requestChainId, rosettanetConnect_sendTransaction as sendTransaction, rosettanetConnect_signMessage as signMessage, rosettanetConnect_switchRosettanetChain as switchRosettanetChain, rosettanetConnect_syncing as syncing, rosettanetConnect_watchAsset as watchAsset };
}

declare enum RosettanetChainId {
    MAIN = "0x52535453"
}

declare class RosettanetAccount extends Account implements AccountInterface {
    walletProvider: EthereumWindowObject;
    constructor(providerOrOptions: ProviderOptions | ProviderInterface, walletProvider: EthereumWindowObject, cairoVersion?: CairoVersion, address?: string);
    /**
     * Send transaction to the wallet.
     * @param params Ethereum transaction object.
     * @returns Transaction hash.
     */
    sendTransactionRosettanet(params: TX_REQUEST): Promise<string>;
    /**
     * Request the current chain ID from the wallet.
     * @returns The current Wallet Chain ID.
     */
    chainIdRosettanet(): Promise<string>;
    /**
     * Sign typed data using the wallet. Uses personal_sign method.
     * @param message The typed data to sign.
     * @param address The wallet address to sign.
     * @returns Signatures as strings.
     */
    personalSignRosettanet(message: string, address: string): Promise<string>;
    /**
     * Request connected accounts
     * @returns connected accounts addresses
     */
    accountsRosettanet(): Promise<string[]>;
    /**
     * Request latest block number in Starknet
     * @returns latest block number in hexadecimal format
     */
    blockNumberRosettanet(): Promise<string>;
    /**
     * Call request.
     * @param tx Ethereum transaction object.
     * @returns Answer from called contract.
     */
    callRosettanet(tx: TX_REQUEST): Promise<string>;
    /**
     * Estimated gas fee for the transaction.
     * @param tx Ethereum transaction object.
     * @returns Estimated gas amount.
     */
    estimateGasRosettanet(tx: TX_REQUEST): Promise<string>;
    /**
     * Latest gas price in network.
     * @returns Latest gas price.
     */
    gasPriceRosettanet(): Promise<string>;
    /**
     * STRK balance of given address.
     * @param address Address to check balance.
     * @param block Block number or hash. (optional)
     * @returns STRK balance.
     */
    getBalanceRosettanet(address: string, block?: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
    /**
     * Block by given block hash.
     * @param blockHash Block hash.
     * @param hydratedTx Hydrated transactions (optional)
     * @returns Block by given block hash.
     */
    getBlockByHashRosettanet(blockHash: BLOCK_HASH, hydratedTx?: boolean): Promise<string>;
    /**
     * Block by given block number.
     * @param blockNumber Block number or block tag.
     * @param hydratedTx Hydrated transactions (optional)
     * @returns Block by given block number.
     */
    getBlockByNumberRosettanet(blockNumber: BLOCK_NUMBER | BLOCK_TAG, hydratedTx?: boolean): Promise<string>;
    /**
     * Transaction count of given block hash.
     * @param blockHash Block hash.
     * @returns Transaction count of given block hash.
     */
    getBlockTransactionCountByHashRosettanet(blockHash: BLOCK_HASH): Promise<string>;
    /**
     * Transaction count of given block number.
     * @param blockNumber Block number or block tag..
     * @returns Transaction count of given block number.
     */
    getBlockTransactionCountByNumberRosettanet(blockNumber: BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
    getCodeRosettanet(address: string, block?: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
    getTransactionHashByBlockHashAndIndexRosettanet(blockHash: BLOCK_HASH, index: string): Promise<string>;
    getTransactionHashByBlockNumberAndIndexRosettanet(blockNumber: BLOCK_NUMBER | BLOCK_TAG, index: string): Promise<string>;
    getTransactionByHashRosettanet(txHash: TXN_HASH): Promise<string>;
    /**
     * Transaction count of given address.
     * @param address address.
     * @returns Transaction count of given address.
     */
    getTransactionCountRosettanet(address: string, block?: BLOCK_HASH | BLOCK_NUMBER | BLOCK_TAG): Promise<string>;
    /**
     * Transaction receipt of given transaction hash.
     * @param txHash address.
     * @returns Transaction receipt of given transaction hash.
     */
    getTransactionReceiptRosettanet(txHash: TXN_HASH): Promise<string>;
    requestAccounts(): Promise<string[]>;
    /**
     * Request Permission for wallet account
     * @returns allowed accounts addresses
     */
    getPermissions(): Promise<"accounts"[]>;
    switchStarknetChain(chainId: RosettanetChainId): Promise<string>;
    /**
     * Request adding ERC20 Token to Wallet List
     * @param asset WatchAssetParameters
     * @returns boolean
     */
    watchAsset(asset: WatchAssetParameters): Promise<boolean>;
    declare(): Promise<{
        transaction_hash: string;
        class_hash: string;
    }>;
    deploy(): Promise<{
        transaction_hash: string;
        contract_address: string[];
    }>;
    /**
     * Sign typed data using the wallet. Uses eth_signTypedData_v4 method.
     * @param message The typed data to sign.
     * @returns Signature as strings.
     */
    signMessage(message: TypedData): Promise<ArraySignatureType>;
    execute(calls: Call[]): Promise<{
        transaction_hash: string;
    }>;
    static connect(provider: ProviderInterface, walletProvider: EthereumWindowObject, cairoVersion?: CairoVersion): Promise<RosettanetAccount>;
    static connectSilent(provider: ProviderInterface, walletProvider: EthereumWindowObject, cairoVersion?: CairoVersion): Promise<RosettanetAccount>;
}

export { RosettanetAccount, rosettanetConnect as rosettanetWallet };
