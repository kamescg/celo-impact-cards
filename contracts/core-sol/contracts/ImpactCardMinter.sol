//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { ERC721Storage } from "@erc721k/core-sol/contracts/ERC721Storage.sol";
import { ISVGRender } from "./interfaces/ISVGRender.sol";
import { ImpactCard } from "./ImpactCard.sol";

contract ImpactCardMinter {
  address public erc721Storage;
  address public erc721Oracle;
  mapping(address => address) public minted;

  event ImpactCardMinted(address indexed to);

  constructor(address _erc721Storage, address _erc721Oracle) {
    erc721Storage = _erc721Storage;
    erc721Oracle = _erc721Oracle;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  // --------------------------------------
  // READS
  // --------------------------------------

  function lookup(address to) external view returns (address card) {
    return minted[to];
  }

  function preview(
    address account,
    uint8 style,
    string memory emoji
  ) external view returns (string memory) {
    uint256 balance = address(account).balance;
    bytes memory imageData = abi.encode(balance, style, false, false, false, emoji);
    return ISVGRender(ERC721Storage(erc721Storage).getSvgRender()).render(imageData);
  }

  // --------------------------------------
  // WRITES
  // --------------------------------------

  function mint(
    address to,
    uint8 style,
    string memory emoji
  ) external payable {
    require(minted[to] == address(0), "ImpactCardMinter:previously-minted");
    ImpactCard impactCard = new ImpactCard("Impact Card", "IMPACT", erc721Storage, erc721Oracle);
    impactCard.mint(to, style, emoji);
    impactCard.transferOwnership(to);
    emit ImpactCardMinted(to);
    minted[to] = address(impactCard);
    if (msg.value > 0) {
      payable(to).transfer(msg.value);
    }
  }

  function setImpactCardStorage(address _erc721Storage) external {
    erc721Storage = _erc721Storage;
  }
}
