// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// This set of contract is to create a ERC721 token with URI support for each game trade listing
// ERC721URIStorage we use here is an OpenZeppelin contract for ERC721 that allows to set URI on token creation
contract GameListing is ERC1155Pausable, ERC1155Burnable, ERC1155Supply {
    // Counters for the total supply and balances of all tokens
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;
    string gameMetadata;
    address private _owner;

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(!paused(), "ERC20Pausable: token transfer while paused");
        
        if (from == address(0)) { // When minting tokens
            require(totalSupply().add(amount) <= _cap, "ERC20Capped: cap exceeded");
        }
    }

    // Take the markeplace contract address to deploy the contract
    constructor(address marketplaceAddress) ERC1155(gameMetadata) public {
        contractAddress = marketplaceAddress;
        _owner = msg.sender;
    }

    // Pass game trading metadata to the createToken function will create a new ERC721 token for the DeGame Trading contract to use
    function createGameListing(bytes memory gameListingDetails, uint256 amount, uint start) public returns (uint) {
        _tokenIds.increment();
        uint256 newgameID = _tokenIds.current();

        _mint(msg.sender, newgameID, amount, gameListingDetails);
        setApprovalForAll(contractAddress, true);

        if (block.timestamp >= start + 30 * 1 days) {
            _burn(msg.sender, newgameID, amount);
        }

        return newgameID;
    }

    // Ability to reset the base gameData for the game listing contract
    function setGameData(string memory newGameData) public onlyOwner {
        require (msg.sender == _owner);
        _setURI(newGameData);
    }

    function getGameTotalSupply(uint256 tokenId) public view returns (uint256) {
        return totalSupply(tokenId);
    }

    function checkGameListing(uint256 tokenId) public view returns (bool) {
        return exists(tokenId);
    }

    function pauseGameListing() public onlyOwner {
        require (msg.sender == _owner);
        _pause();
    }

    function unpauseGameListing() public onlyOwner {
        require (msg.sender == _owner);
        _unpause();
    }
}
