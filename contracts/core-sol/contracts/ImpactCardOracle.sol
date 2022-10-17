//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface DonationMinerImplementation {
  function donorScore(address _donorAddress) external view returns (uint256);
}

interface ERC20 {
  function balanceOf(address account) external view returns (uint256);
}

contract ImpactCardOracle is Ownable, AccessControl {
  address public impactMarketAddress;
  address public ethicHubAddress;

  // Storage
  mapping(address => bool) private gitcoinDonated;

  // Roles
  bytes32 public constant STAFF_ROLE = keccak256("STAFF_ROLE");

  constructor(
    address _impactMarket,
    address _ethicHub,
    address admin
  ) {
    _setupRole(DEFAULT_ADMIN_ROLE, admin);
    _setupRole(STAFF_ROLE, admin);
    impactMarketAddress = _impactMarket;
    ethicHubAddress = _ethicHub;
  }

  function status(bytes32 id, address account) external view returns (bool) {
    /* -------------------------------------- */
    /* ----------- Gitcoin Grants ----------- */
    /* -------------------------------------- */
    if (id == 0x0000000000000000000000000000000000000000000000000000000000000001) {
      return gitcoinDonated[account];
      /* ------------------------------------- */
      /* ----------- Impact Market ----------- */
      /* ------------------------------------- */
    } else if (id == 0x0000000000000000000000000000000000000000000000000000000000000011) {
      if (impactMarketAddress == address(0)) {
        return false;
      }
      DonationMinerImplementation impactMarket = DonationMinerImplementation(impactMarketAddress);
      uint256 score = impactMarket.donorScore(account);
      return score > 0;
      /* --------------------------------- */
      /* ----------- Ethic Hub ----------- */
      /* --------------------------------- */
    } else if (id == 0x0000000000000000000000000000000000000000000000000000000000000111) {
      if (ethicHubAddress == address(0)) {
        return false;
      }
      ERC20 ethicHub = ERC20(ethicHubAddress);
      uint256 balance = ethicHub.balanceOf(account);
      return balance > 0;
    }

    revert("ImpactCardOracle:invalid-id");
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  // --------------------------------------------
  // Minimal Viable Oracle
  // --------------------------------------------
  function enableGitcoinDonated(address account) external {
    require(hasRole(STAFF_ROLE, msg.sender), "ImpactCardOracle:not-authorized-staff");
    gitcoinDonated[account] = true;
  }

  function disableGitcoinDonated(address account) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "ImpactCardOracle:not-authorized-staff");
    gitcoinDonated[account] = false;
  }

  // --------------------------------------------
  // Access Controls
  // --------------------------------------------

  function addStaff(address account) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "ImpactCardOracle:not-authorized-staff");
    grantRole(STAFF_ROLE, account);
  }

  function removeStaff(address account) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "ImpactCardOracle:not-authorized-staff");
    revokeRole(STAFF_ROLE, account);
  }

  function addAdmin(address account) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "ImpactCardOracle:not-authorized-staff");
    grantRole(DEFAULT_ADMIN_ROLE, account);
  }

  function removeAdmin(address account) external {
    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "ImpactCardOracle:not-authorized-staff");
    revokeRole(DEFAULT_ADMIN_ROLE, account);
  }

  // --------------------------------------------
  // Manage External Contracts
  // --------------------------------------------

  function setImpactMarketAddress(address _impactMarketAddress) external onlyOwner {
    impactMarketAddress = _impactMarketAddress;
  }

  function setEthicHubAddress(address _ethicHubAddress) external onlyOwner {
    ethicHubAddress = _ethicHubAddress;
  }
}
