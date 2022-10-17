pragma solidity 0.8.15;

import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { ERC721Storage } from "@erc721k/core-sol/contracts/ERC721Storage.sol";

/**
 * @title ImpactCardStorage
 * @author Kames Geraghty
 */
contract ImpactCardStorage is ERC721Storage {
  mapping(uint256 => string) _name;

  constructor(
    address _svgRender_,
    address _traitsFetch_,
    ContractURI memory _contractURI_
  ) ERC721Storage(_svgRender_, _traitsFetch_, _contractURI_) {}

  function _parseName(uint256 _tokenId) internal view override returns (string memory) {
    return string.concat("Impact Card #", Strings.toString(_tokenId));
  }

  function _parseDescription(uint256 _tokenId) internal view override returns (string memory) {
    return string.concat("Contributor to public goods.");
  }

  function getData(uint256 _tokenId) internal view returns (string memory) {
    return _name[_tokenId];
  }
}
