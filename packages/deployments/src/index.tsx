import ImpactCardABI from '@impact-cards/core-sol/abis/contracts/ImpactCard.sol/ImpactCard.json'
import ImpactCardStorageABI from '@impact-cards/core-sol/abis/contracts/ImpactCardStorage.sol/ImpactCardStorage.json'

// Localhost
import ImpactCardLocalhost from '@impact-cards/core-sol/deployments/localhost/ImpactCard.json';
import ImpactCardOracleLocalhost from '@impact-cards/core-sol/deployments/localhost/ImpactCardOracle.json';

// Celo Testnet
import ImpactCardCeloTestnet from '@impact-cards/core-sol/deployments/celoTestnet/ImpactCard.json';
import ImpactCardMinterCeloTestnet from '@impact-cards/core-sol/deployments/celoTestnet/ImpactCardMinter.json';

import ImpactCardCeloMainnet from '@impact-cards/core-sol/deployments/celo/ImpactCard.json';
import ImpactCardOracleMainnet from '@impact-cards/core-sol/deployments/celo/ImpactCardOracle.json';


function useNetworkContract(network: string, contract: string): any {

    switch (network) {
        case 'mainnet':
            switch (contract) {
                case 'ImpactCard':
                    return ImpactCardCeloMainnet
                case 'ImpactCardOracle':
                    return ImpactCardOracleMainnet
                default:
                    throw new Error(`Unknown contract ${contract}`);
            }
        case 'celoTestnet':
            switch (contract) {
                case 'ImpactCard':
                    return ImpactCardCeloTestnet
                case 'ImpactCardMinter':
                    return ImpactCardMinterCeloTestnet
                default:
                    throw new Error(`Unknown contract ${contract}`);
            }
        case 'localhost':
            switch (contract) {
                case 'ImpactCard':
                    return ImpactCardLocalhost
                case 'ImpactCardOracle':
                    return ImpactCardOracleLocalhost
                default:
                    throw new Error(`Unknown contract ${contract}`);
            }
        default:
            break;
    }

}

export { ImpactCardABI, ImpactCardStorageABI, useNetworkContract }