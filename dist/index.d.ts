import { RequestFn, WalletEventListener, WatchAssetParameters, TypedData } from '@starknet-io/types-js';
import { Account, AccountInterface, ProviderOptions, ProviderInterface, CairoVersion, ArraySignatureType, AllowArray, Call } from 'starknet';

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
    execute(calls: AllowArray<Call>): Promise<{
        transaction_hash: string;
    }>;
    static connect(provider: ProviderInterface, walletProvider: EthereumWindowObject, cairoVersion?: CairoVersion): Promise<RosettanetAccount>;
    static connectSilent(provider: ProviderInterface, walletProvider: EthereumWindowObject, cairoVersion?: CairoVersion): Promise<RosettanetAccount>;
}

type index_RosettanetAccount = RosettanetAccount;
declare const index_RosettanetAccount: typeof RosettanetAccount;
declare namespace index {
  export { index_RosettanetAccount as RosettanetAccount };
}

export { index as rosettanetWallet };
