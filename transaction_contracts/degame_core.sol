// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// This set of contract is to create a ERC721 token with URI support for each game trade listing
// ERC721URIStorage we use here is an OpenZeppelin contract for ERC721 that allows to set URI on token creation
contract GameListing is ERC721URIStorage {
    // Counters for the total supply and balances of all tokens
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    // Take the markeplace contract address to deploy the contract
    constructor(address marketplaceAddress) ERC721("DeGame Australia", "DEGAME") {
        contractAddress = marketplaceAddress;
    }

    // Pass game trading metadata to the createToken function will create a new ERC721 token for the DeGame Trading contract to use
    // The metadata will be stored in the URI of the token
    function createGameListing(string memory gameListingDetails) public returns (uint) {
        _tokenIds.increment();
        uint256 newgameID = _tokenIds.current();

        _mint(msg.sender, newgameID);
        _setTokenURI(newgameID, gameListingDetails);
        setApprovalForAll(contractAddress, true);
        return newgameID;
    }

    // This function is to check if the game listing exist or not
    function checkGameListing(uint gameID) public view returns (bool) {
        return _exists(gameID);
    }

    // This function is to get the game listing details
    function getGameListingDetails(uint gameID) public view returns (string memory) {
        return tokenURI(gameID);
    }

    // Martketplace contract can call this function to burn/cancel the game listing
    function cancelGameListing(uint gameID) public {
        require(msg.sender == contractAddress);
        require(checkGameListing(gameID));
        _burn(gameID);
    }

    function getLastListingID() public view returns (uint) {
        return _tokenIds.current();
    }
}

// This set of contract is the administrative contract for each game listing
// ReentrancyGuard is an OpenZeppelin contract that allows to prevent reentrancy attacks
contract DeGameTrading is ReentrancyGuard {

  // Count and index the item id and total number of items sold
  using Counters for Counters.Counter;
  Counters.Counter private _gameIDs;
  Counters.Counter private _itemsSold;

  // Payable to the contract deloyer address 
  // Listing fee is 0.1 ether
  address payable deloyer;
  uint256 listingPrice = 0.01 ether;

  // Default deloyer of this contract is whoever deploys it
  constructor() {
    deloyer = payable(msg.sender);
  }

  // A typical game item contain game id, nft contract address, ERC721 token id, seller address, buyer address, and price
  struct GameItem {
    uint gameID;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable deloyer;
    uint256 price;
  }

  mapping(uint256 => GameItem) private idToGameItem;
  
  // Log the game item to the blockchain whenever a new game item is created
  event GameItemCreated (
    uint indexed gameID,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address deloyer,
    uint256 price
  );

  // Function to get a sepcific game item from the blockchain by passing in the game id
  function getGameItem(uint256 GameItemID) public view returns (GameItem memory) {
    return idToGameItem[GameItemID];
  }

  // Function to create a new game item and add log to the blockchain
  function createGameItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {
    require(price > 0, "Price must be at least 1 wei");
    require(msg.value > listingPrice, "Price must be greater than the listing price");

    _gameIDs.increment();
    uint256 gameID = _gameIDs.current();
  
    idToGameItem[gameID] =  GameItem(
      gameID,
      nftContract,
      tokenId,
      payable(msg.sender),
      payable(address(0)),
      price
    );

    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit GameItemCreated(
      gameID,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      price
    );
  }

  // Function to buy a game item from the marketplace by passing in the game id
  function createMarketSale(
    address nftContract,
    uint256 gameID
    ) public payable nonReentrant {
    uint price = idToGameItem[gameID].price;
    uint tokenId = idToGameItem[gameID].tokenId;
    require(msg.value == price, "Please submit the asking price in order to complete the purchase");

    idToGameItem[gameID].seller.transfer(msg.value);
    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    idToGameItem[gameID].deloyer = payable(msg.sender);
    _itemsSold.increment();
    payable(deloyer).transfer(listingPrice);
  }

  // Function to get all the game items that is currently listed on the marketplace for sale
  function fetchGameItems() public view returns (GameItem[] memory) {
    uint itemCount = _gameIDs.current();
    uint unsoldItemCount = _gameIDs.current() - _itemsSold.current();
    uint currentIndex = 0;

    GameItem[] memory items = new GameItem[](unsoldItemCount);
    for (uint i = 0; i < itemCount; i++) {
      if (idToGameItem[i + 1].deloyer == address(0)) {
        uint currentId = i + 1;
        GameItem storage currentItem = idToGameItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
   
    return items;
  }

  // Function to check the game item that you had purchased
  function fetchMyNFTs() public view returns (GameItem[] memory) {
    uint totalItemCount = _gameIDs.current();
    uint itemCount = 0;
    uint currentIndex = 0;

    for (uint i = 0; i < totalItemCount; i++) {
      if (idToGameItem[i + 1].deloyer == msg.sender) {
        itemCount += 1;
      }
    }

    GameItem[] memory items = new GameItem[](itemCount);
    for (uint i = 0; i < totalItemCount; i++) {
      if (idToGameItem[i + 1].deloyer == msg.sender) {
        uint currentId = i + 1;
        GameItem storage currentItem = idToGameItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
   
    return items;
  }

  // Features to be added:
  // 1. Royalties 
  // 2. Chainlink off-chain oracle to fetch Nintendo Switch current game market price 
  // https://docs.chain.link/docs/off-chain-oracle
}