// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/* @dev Interface of ERC20.
*/
interface IERC20 {
    function decimals() external  view returns (uint8);
    function transfer(address _to, uint256 _value) external  returns (bool success);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

/* @dev Interface of ERC721.
*/
interface IERC721 {
    function ownerOf(uint256 _tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
}

/* @dev Interface of ERC1155.
*/
interface IERC1155 {
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external;
}

/* @title MaketPlace to sell and buy tokens.
*/
contract MarketPlace {

    uint256 constant public PRIMARY_PROTOCOL_FEE = 55;
    /* @dev To store the details of an asset to sale.
    */    
    struct  AssetOnSale {
        uint256 assetId; 
        uint256 priceOfAsset;
        uint256 numberOfAsset;
        address assetContractAddress; //asset
        address paymentContractAddress;// paymentToken
        address owner;
    }
    
    address private owner;
    bytes32[] private listOfAssetId;
    address[] private listOfprotocolFeeAssetAddress;
    mapping(address => uint256) public protocolFeeInfo;
    mapping(bytes32 tokenId => AssetOnSale) private assetInfo; //assetInfo

    event Registered721Token(
        address indexed seller, 
        uint256 indexed assetId, 
        uint256 indexed PriceOfAsset
    );

    event Bought721Token(
        address indexed buyer, 
        uint256 indexed assetId, 
        uint256 indexed PriceOfAsset
    );

    event Registered1155Token(
        address indexed seller, 
        uint256[] indexed assetIds, 
        uint256[] indexed PriceOfAssets
    );

    event Bought1155Token(
        address indexed buyer, 
        uint256[] indexed assetIds, 
        uint256[] indexed PriceOfAssets
    );

    error InvalidAddress();
    error InvalidAssetId();
    error InvalidPriceOfAssset();
    error Unauthorised();
    error AssetsNotOnSale();
    error FailedToCollectProtocolFee();

    /* @dev To validate Address.
    */
    modifier addressValidation(address newAddress){
        if(newAddress == address(0)){
            revert InvalidAddress();
        }
        _;
    }

    /* @dev To Validate user Input.
    */
    modifier userInputValidation(uint256 assetId, uint256 priceOfAsset){
        if(assetId == 0){
            revert InvalidAssetId();
        }
        if(priceOfAsset == 0){
            revert InvalidPriceOfAssset();
        }
        _;
    }

    // constructor  
    constructor() {
        owner = msg.sender;
    }

    /*@dev function for owner to collet the Protocol fee. 
    */ 
    function collectProtocolFee() public {
        require(msg.sender == owner, "MarketPlace: Only the contract's owner can access this function.");

        if(listOfprotocolFeeAssetAddress.length == 0){
            revert FailedToCollectProtocolFee();
        }

        for(uint256 i; i < listOfprotocolFeeAssetAddress.length; i++){
            address currentAssetAddress = listOfprotocolFeeAssetAddress[i];
            if(currentAssetAddress == address(0)){
                bool sent;
                bytes memory data;
                (sent, data) = owner.call{value: protocolFeeInfo[currentAssetAddress]}("");
                require(sent, "MarketPlace: Failed to send Ether");
            } else {
                bool status = IERC20(currentAssetAddress).transfer(owner, protocolFeeInfo[currentAssetAddress]);
                if(status == false){
                    revert FailedToCollectProtocolFee();
                }
            }
            
            delete protocolFeeInfo[currentAssetAddress];
        }
        delete listOfprotocolFeeAssetAddress;
    }

    /* @dev function to set the protocol fees 
    */
    function setProtocolFeeList(address assetAddress, uint256 amount) private {
        if(protocolFeeInfo[assetAddress] == 0){
            protocolFeeInfo[assetAddress] = amount;
            listOfprotocolFeeAssetAddress.push(assetAddress);
        } else {
            protocolFeeInfo[assetAddress] += amount;
        }
    }

    /* @dev To Register Asset on the Marketplace Contract.
     * @param tokenId of the Asset.
     * @param priceOfAssets An array containg the price of all the Assets.
     * @param address of asset contract.
     * @param address of payment contract.
    */
    function registerERC721AssetForSale(
        uint256 tokenId, 
        uint256 priceOfAsset,
        address assetContractAddress,
        address paymentContractAddress
    ) addressValidation(assetContractAddress) public {

            if(tokenId == 0){
                revert InvalidAssetId();
            }
            if(msg.sender != IERC721(assetContractAddress).ownerOf(tokenId)){
                revert Unauthorised();
            }
            if(priceOfAsset == 0){
                revert InvalidPriceOfAssset();
            }
            
            AssetOnSale memory asset = AssetOnSale({
                assetContractAddress: assetContractAddress, 
                assetId: tokenId, 
                priceOfAsset: priceOfAsset, 
                numberOfAsset: 1,
                paymentContractAddress: paymentContractAddress,
                owner: msg.sender
            });
            
            // Generate unique TokenId.
            bytes32 uniqueTokenId  = genrateUniqueTokenId(assetContractAddress, tokenId);

            // Push the token ID to an array of listOfAssetId.
            listOfAssetId.push(uniqueTokenId);

            // Map the token ID to an AssetOnSale struct.
            assetInfo[uniqueTokenId] = asset;

            //emit event 
            emit Registered721Token(msg.sender, tokenId, priceOfAsset); 
    }

    /* @dev Function to Register Asset on the Marketplace Contract.*/
    function registerERC1155AssetForSale( 
        uint256[] calldata assetIds, 
        uint256[] calldata priceOfAssets, 
        uint256[] calldata numberOfAssets, 
        address assetContractAddress, 
        address paymentContractAddress
    ) addressValidation(assetContractAddress) public {
        
        for (uint i; i < assetIds.length; i++) {
            if(assetIds[i] == 0){
                revert InvalidAssetId();
            }
            if(priceOfAssets[i] == 0){
                revert InvalidPriceOfAssset();
            }
            
            AssetOnSale memory asset = AssetOnSale({
                assetContractAddress: assetContractAddress, 
                assetId: assetIds[i], 
                priceOfAsset: priceOfAssets[i], 
                numberOfAsset: numberOfAssets[i],
                paymentContractAddress: paymentContractAddress,
                owner: msg.sender
            });
            
            // Generate unique TokenId.
            bytes32 uniqueTokenId  = genrateUniqueTokenId(assetContractAddress, assetIds[i]);

            // Push the token ID to an array of listOfAssetId.
            listOfAssetId.push(uniqueTokenId);

            // Map the token ID to an AssetOnSale struct.
            assetInfo[uniqueTokenId] = asset;

            //emiting event 
            emit Registered1155Token(msg.sender, assetIds, priceOfAssets);
        }
    }
    
    /* @dev To buy ERC721 Standard Asset.
     * @param Address of Asset Contract.
     * @param TokenId of Asset.
     * @param Price Of Asset.
    */
    function buyERC721Asset(
        address assetContractAddress,
        uint256 assetId, 
        uint256 priceOfAsset
    ) addressValidation(assetContractAddress) userInputValidation(assetId, priceOfAsset) public payable {
        // Generate unique asset Id.
        bytes32 uniqueAssetId = genrateUniqueTokenId(assetContractAddress, assetId);

        for( uint i; i < listOfAssetId.length; i++){
            if(listOfAssetId[i] == uniqueAssetId) {
                AssetOnSale memory currentAsset = assetInfo[uniqueAssetId];
                if(currentAsset.paymentContractAddress != address(0)) {

                    uint256 protocolFee = ((priceOfAsset * (10**IERC20(currentAsset.paymentContractAddress).decimals()) * PRIMARY_PROTOCOL_FEE)/10000);
                    setProtocolFeeList(currentAsset.paymentContractAddress,protocolFee);

                    uint256 amountOfERC20ToTransfer = ((priceOfAsset *(10**IERC20(currentAsset.paymentContractAddress).decimals()))*9945)/10000;
                    IERC20(currentAsset.paymentContractAddress).transferFrom(owner, currentAsset.owner, amountOfERC20ToTransfer);
                } else {
                    address  _to = currentAsset.owner;
                    bool sent;
                    bytes memory data;
                    uint256 amountToTransfer = ((priceOfAsset *(10**18))*9945)/10000;
                    (sent, data) = _to.call{value: amountToTransfer}("");
                    require(sent, "MarketPlace: Failed to send Ether");

                    uint256 protocolFee = ((priceOfAsset *(10**18))*PRIMARY_PROTOCOL_FEE)/10000;
                    setProtocolFeeList(currentAsset.paymentContractAddress,protocolFee);
                }
                IERC721(currentAsset.assetContractAddress).transferFrom(currentAsset.owner, msg.sender, currentAsset.assetId);
                delete assetInfo[uniqueAssetId];
                emit Bought721Token(msg.sender, assetId, priceOfAsset);
                return;
            }
        }
    revert AssetsNotOnSale();
    }

    /* @dev To buy ERC1155 Standard Assets.
    *  @param Address of Asset Contract
    *  @param TokenIds of Asset.
    *  @param Number of Asset.
    *  @param Number of Asset.
    *  @param Price of Asset.
    */
    function buyERC1155Asset(
        address assetContractAddress,
        uint256[] calldata assetIds, 
        uint256[] calldata numberOfAssets,
        uint256[] calldata priceOfAsset
    ) addressValidation(assetContractAddress) public payable {
        uint256 totalPriceOfAsset;
        address currentAssetOwner;
        address paymentContractAddress;
        uint256 amountOfERC20ToTransfer;

        // validate user input
        for(uint256 i; i < assetIds.length; i++) {
        bytes32 uniqueTokenId = genrateUniqueTokenId(assetContractAddress, assetIds[i]);
            require(
                assetInfo[uniqueTokenId].priceOfAsset == priceOfAsset[i], 
                "MarketPlace: Incorrect amount of asset for the token" 
                );
            require(
                currentAssetOwner == address(0) || currentAssetOwner == assetInfo[uniqueTokenId].owner, 
                "MarketPlace: Owner of asset is diiferent"
                );

            totalPriceOfAsset += (assetInfo[uniqueTokenId].priceOfAsset);
            currentAssetOwner = assetInfo[uniqueTokenId].owner;
            assetContractAddress = assetInfo[uniqueTokenId].assetContractAddress;
            paymentContractAddress = assetInfo[uniqueTokenId].paymentContractAddress;
            
            // remove the uniqueTokenId from the assetInfo mapping
            delete assetInfo[uniqueTokenId];
            listOfAssetId[i] = listOfAssetId[listOfAssetId.length - 1];
            listOfAssetId.pop();
        }
    
        if(paymentContractAddress != address(0)) {
            uint256 protocolFee = ((totalPriceOfAsset * PRIMARY_PROTOCOL_FEE)/10000);
            setProtocolFeeList(paymentContractAddress,protocolFee);
            amountOfERC20ToTransfer = ((totalPriceOfAsset *(10**IERC20(paymentContractAddress).decimals()))*9945)/10000;
            IERC20(paymentContractAddress).transferFrom(msg.sender, currentAssetOwner, amountOfERC20ToTransfer);
        } else {
            
            bool sent;
            bytes memory data;
            amountOfERC20ToTransfer = ((totalPriceOfAsset *(10**18))*9945)/10000;
            (sent, data) = currentAssetOwner.call{value: amountOfERC20ToTransfer}("");
            require(sent, "Failed to send Ether");
            uint256 protocolFee = ((totalPriceOfAsset * PRIMARY_PROTOCOL_FEE)/10000);
            setProtocolFeeList(paymentContractAddress, protocolFee);
        }

        //transfer ERC1155 Tokens
        IERC1155(assetContractAddress).safeBatchTransferFrom(
            currentAssetOwner, 
            msg.sender, 
            assetIds,
            numberOfAssets,
            ""
        );
        emit Bought1155Token(msg.sender, assetIds, priceOfAsset);
    }

    /* @dev Generates unique token Id to store the both erc721 and erc1155 Assets seperately to the contract.*/
    function genrateUniqueTokenId(address assetContractAddress, uint256 tokenId) private pure returns(bytes32) {
        require(assetContractAddress != address(0), "Invalid Asset Address.");
        // add token owner address 
        return keccak256(abi.encodePacked(assetContractAddress, tokenId));
    }     
}

