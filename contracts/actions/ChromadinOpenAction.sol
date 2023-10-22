// SPDX-License-Identifier: UNLICENSE

pragma solidity ^0.8.16;

import {HubRestricted} from "./../lens/v2/base/HubRestricted.sol";
import {Types} from "./../lens/v2/libraries/constants/Types.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IPublicationActionModule} from "./../lens/v2/interfaces/IPublicationActionModule.sol";
import {IModuleGlobals} from "./../lens/v2/interfaces/IModuleGlobals.sol";
import "./../MarketCreator.sol";
import "./../CollectionCreator.sol";
import "./../PrintAccessControl.sol";
import "./../PrintDesignData.sol";

library ChromadinOpenActionLibrary {
    struct CollectionValues {
        uint256[][] prices;
        string[] uris;
        address[] fulfillers;
        uint256[] amounts;
        bool[] unlimiteds;
    }
}

contract ChromadinOpenAction is HubRestricted, IPublicationActionModule {
    MarketCreator public marketCreator;
    CollectionCreator public collectionCreator;
    PrintAccessControl public printAccessControl;
    PrintSplitsData public printSplitsData;
    PrintDesignData public printDesignData;

    error CurrencyNotWhitelisted();
    error InvalidAddress();
    error InvalidAmounts();

    struct CollectionInfo {
        uint256[] collectionIds;
        uint256[] amounts;
    }

    mapping(uint256 => mapping(uint256 => CollectionInfo)) _collectionGroups;

    modifier onlyAdmin() {
        if (!printAccessControl.isAdmin(msg.sender)) {
            revert InvalidAddress();
        }
        _;
    }

    IModuleGlobals public immutable MODULE_GLOBALS;

    event ChromadinPurchased(
        address buyerAddress,
        uint256[] collectionIds,
        uint256 pubId,
        uint256 profileId,
        uint256 totalAmount
    );
    event ChromadinInitialized(
        uint256[] collectionIds,
        uint256 profileId,
        uint256 pubId,
        address creatorAddress,
        uint256 numberOfCollections
    );

    constructor(
        address _hub,
        address _moduleGlobals,
        address _printAccessControlAddress,
        address _printSplitsDataAddress,
        address _printDesignDataAddress,
        address _marketCreatorAddress,
        address _collectionCreatorAddress
    ) HubRestricted(_hub) {
        MODULE_GLOBALS = IModuleGlobals(_moduleGlobals);
        marketCreator = MarketCreator(_marketCreatorAddress);
        collectionCreator = CollectionCreator(_collectionCreatorAddress);
        printAccessControl = PrintAccessControl(_printAccessControlAddress);
        printSplitsData = PrintSplitsData(_printSplitsDataAddress);
        printDesignData = PrintDesignData(_printDesignDataAddress);
    }

    function initializePublicationAction(
        uint256 _profileId,
        uint256 _pubId,
        address _creatorAddress,
        bytes calldata _data
    ) external override onlyHub returns (bytes memory) {
        if (!printAccessControl.isDesigner(_creatorAddress)) {
            revert InvalidAddress();
        }

        PrintLibrary.CollectionValuesParams memory _collectionCreator = abi
            .decode(_data, (PrintLibrary.CollectionValuesParams));

        if (
            _collectionCreator.prices.length !=
            _collectionCreator.uris.length ||
            _collectionCreator.fulfillers.length !=
            _collectionCreator.amounts.length ||
            _collectionCreator.unlimiteds.length !=
            _collectionCreator.prices.length
        ) {
            revert InvalidAmounts();
        }

        uint256[] memory _collectionIds = _configureCollection(
            _collectionCreator.uris,
            _collectionCreator.fulfillers,
            _collectionCreator.prices,
            _collectionCreator.amounts,
            _collectionCreator.unlimiteds,
            _creatorAddress,
            _pubId,
            _profileId
        );

        _collectionGroups[_profileId][_pubId] = CollectionInfo({
            collectionIds: _collectionIds,
            amounts: _collectionCreator.amounts
        });

        emit ChromadinInitialized(
            _collectionIds,
            _profileId,
            _pubId,
            _creatorAddress,
            _collectionCreator.prices.length
        );

        return _data;
    }

    function processPublicationAction(
        Types.ProcessActionParams calldata _params
    ) external override onlyHub returns (bytes memory) {
        address _currency = abi.decode(_params.actionModuleData, (address));

        if (
            !MODULE_GLOBALS.isCurrencyWhitelisted(_currency) ||
            !printSplitsData.getIsCurrency(_currency)
        ) {
            revert CurrencyNotWhitelisted();
        }

        uint256[] memory _collectionIds = _collectionGroups[
            _params.publicationActedProfileId
        ][_params.publicationActedId].collectionIds;

        uint256 _grandTotal = 0;

        for (uint256 i; i < _collectionIds.length; i++) {
            address _designer = printDesignData.getCollectionCreator(
                _collectionIds[i]
            );

            _grandTotal += _transferTokens(
                _collectionIds[i],
                _designer,
                _currency,
                _params.transactionExecutor
            );
        }

        PrintLibrary.BuyTokensOnlyNFTParams
            memory _buyTokensParams = PrintLibrary.BuyTokensOnlyNFTParams({
                collectionIds: _collectionIds,
                collectionAmounts: _collectionGroups[
                    _params.publicationActedProfileId
                ][_params.publicationActedId].amounts,
                buyerAddress: _params.transactionExecutor,
                chosenCurrency: _currency,
                pubId: _params.publicationActedId,
                profileId: _params.publicationActedProfileId,
                buyerProfileId: _params.actorProfileId
            });

        marketCreator.buyTokensOnlyNFT(_buyTokensParams);

        emit ChromadinPurchased(
            _params.transactionExecutor,
            _collectionIds,
            _params.publicationActedId,
            _params.publicationActedProfileId,
            _grandTotal
        );

        return abi.encode(_collectionIds, _currency);
    }

    function _transferTokens(
        uint256 _collectionId,
        address _chosenCurrency,
        address _designer,
        address _buyer
    ) internal returns (uint256) {
        uint256 _totalPrice = printDesignData.getCollectionPrices(
            _collectionId
        )[0];
        uint256 _calculatedPrice = _calculateAmount(
            _chosenCurrency,
            _totalPrice
        );

        IERC20(_chosenCurrency).transferFrom(
            _buyer,
            _designer,
            _calculatedPrice
        );

        return _calculatedPrice;
    }

    function setPrintDesignDataAddress(
        address _newPrintDesignDataAddress
    ) public onlyAdmin {
        printDesignData = PrintDesignData(_newPrintDesignDataAddress);
    }

    function setPrintAccessControlAddress(
        address _newPrintAccessControlAddress
    ) public onlyAdmin {
        printAccessControl = PrintAccessControl(_newPrintAccessControlAddress);
    }

    function setMarketCreatorAddress(
        address _newMarketCreatorAddress
    ) public onlyAdmin {
        marketCreator = MarketCreator(_newMarketCreatorAddress);
    }

    function setCollectionCreatorAddress(
        address _newCollectionCreatorAddress
    ) public onlyAdmin {
        collectionCreator = CollectionCreator(_newCollectionCreatorAddress);
    }

    function _configureCollection(
        string[] memory _uris,
        address[] memory _fulfillers,
        uint256[][] memory _prices,
        uint256[] memory _amounts,
        bool[] memory _unlimiteds,
        address _creatorAddress,
        uint256 _pubId,
        uint256 _profileId
    ) internal returns (uint256[] memory) {
        uint256[] memory _collectionIds = new uint256[](_uris.length);

        for (uint256 i = 0; i < _uris.length; i++) {
            uint256 _id = collectionCreator.createCollection(
                PrintLibrary.MintParams({
                    prices: _prices[i],
                    uri: _uris[i],
                    fulfiller: _fulfillers[i],
                    pubId: _pubId,
                    profileId: _profileId,
                    creator: _creatorAddress,
                    printType: PrintLibrary.PrintType.NFTOnly,
                    origin: PrintLibrary.Origin.Chromadin,
                    amount: _amounts[i],
                    unlimited: _unlimiteds[i]
                })
            );
            _collectionIds[i] = _id;
        }

        return _collectionIds;
    }

    function _calculateAmount(
        address _currency,
        uint256 _amountInWei
    ) internal view returns (uint256) {
        if (_amountInWei == 0) {
            revert InvalidAmounts();
        }

        uint256 _exchangeRate = printSplitsData.getRateByCurrency(_currency);
        uint256 _weiDivisor = printSplitsData.getWeiByCurrency(_currency);

        uint256 _tokenAmount = (_amountInWei * _weiDivisor) / _exchangeRate;

        return _tokenAmount;
    }
}