//SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import { ERC721K } from "@erc721k/core-sol/contracts/ERC721K.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { ERC721Storage } from "@erc721k/core-sol/contracts/ERC721Storage.sol";
import { ISVGRender } from "./interfaces/ISVGRender.sol";
import { ImpactCardOracle } from "./ImpactCardOracle.sol";

contract ImpactCard is ERC721K, AccessControl {
  uint256 public nonce;
  uint256 public depositNonce;
  address private oracle;
  mapping(uint256 => uint8) private styleSelection;
  mapping(uint256 => string) private emojiSelection;
  mapping(address => uint256) private _tokenOwner;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  struct OracleData {
    bool gitcoinFlag;
    bool impactMarketFlag;
    bool ethixFlag;
  }

  constructor(
    string memory name,
    string memory symbol,
    address erc721Storage,
    address _oracle
  ) ERC721K(name, symbol, erc721Storage) {
    oracle = _oracle;
  }

  /* ===================================================================================== */
  /* External Functions                                                                    */
  /* ===================================================================================== */

  function tokenOwner(address _address) external view returns (uint256) {
    return _tokenOwner[_address];
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721K, AccessControl)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  // --------------------------------------------
  // READS
  // --------------------------------------------

  function preview(
    address account,
    uint8 style,
    string memory emoji
  ) external view returns (string memory) {
    uint256 balance = address(account).balance;
    bytes memory imageData = abi.encode(balance, style, false, false, false, emoji);
    return ISVGRender(ERC721Storage(_erc721Storage).getSvgRender()).render(imageData);
  }

  // --------------------------------------------
  // WRITES
  // --------------------------------------------

  /**
   * @notice Mints a new token to the given address
   * @param to address - Address to mint to`
   */
  function mint(
    address to,
    uint8 cardStyle,
    string memory emoji
  ) external {
    require(balanceOf(msg.sender) == 0, "ImpactCard:already-minted");
    unchecked {
      uint256 tokenIdNext = _idCounter++;
      styleSelection[tokenIdNext] = cardStyle;
      emojiSelection[tokenIdNext] = emoji;
      _mint(to, tokenIdNext);
      _tokenOwner[to] = tokenIdNext;
    }
  }

  function updateOracle(address _oracle) external onlyOwner {
    oracle = _oracle;
  }

  /* ===================================================================================== */
  /* Internal Functions                                                                    */
  /* ===================================================================================== */

  function _tokenData(uint256 tokenId)
    internal
    view
    virtual
    override
    returns (bytes memory, bytes memory)
  {
    address owner = ownerOf(tokenId);
    uint256 balanceOwner = address(owner).balance;

    // Oracle
    ImpactCardOracle oracleContract = ImpactCardOracle(oracle);
    OracleData memory oracleData = getOracleData(owner);

    // Encoded Image Render Instructions
    bytes memory imageData = abi.encode(
      balanceOwner,
      styleSelection[tokenId],
      oracleData.gitcoinFlag,
      oracleData.impactMarketFlag,
      oracleData.ethixFlag,
      emojiSelection[tokenId]
    );
    bytes memory traitsData = bytes(abi.encode("0x0"));
    return (imageData, traitsData);
  }

  function getOracleData(address account) internal view returns (OracleData memory) {
    ImpactCardOracle oracleContract = ImpactCardOracle(oracle);
    return
      OracleData({
        gitcoinFlag: oracleContract.status(
          0x0000000000000000000000000000000000000000000000000000000000000001,
          account
        ),
        impactMarketFlag: oracleContract.status(
          0x0000000000000000000000000000000000000000000000000000000000000011,
          account
        ),
        ethixFlag: oracleContract.status(
          0x0000000000000000000000000000000000000000000000000000000000000111,
          account
        )
      });
  }

  /* ===================================================================================== */
  /* Override Functions                                                                    */
  /* ===================================================================================== */
}
