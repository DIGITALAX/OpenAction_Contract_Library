// SPDX-License-Identifier: UNLICENSE

pragma solidity ^0.8.19;

import "./LegendAccessControl.sol";
import "./LegendErrors.sol";
import "./LegendLibrary.sol";
import "hardhat/console.sol";

contract LegendData {
    LegendAccessControl public legendAccessControl;
    string public symbol;
    string public name;
    address public legendMilestone;
    uint256 public _periodClaim;
    uint256 private _grantSupply;

    modifier onlyMilestoneEscrow() {
        if (msg.sender != legendMilestone) {
            revert LegendErrors.InvalidAddress();
        }
        _;
    }
    modifier onlyGrantee(uint256 _grantId) {
        if (_allGrants[_grantId].splitAmounts[msg.sender] == 0) {
            revert LegendErrors.InvalidAddress();
        }
        _;
    }
    modifier onlyOpenAction() {
        if (!legendAccessControl.isOpenAction(msg.sender)) {
            revert LegendErrors.InvalidContract();
        }
        _;
    }
    mapping(uint256 => LegendLibrary.Grant) private _allGrants;
    mapping(uint256 => mapping(uint256 => uint256)) private _lensToGrantId;

    event GrantCreated(
        uint256 grantId,
        address creator,
        uint256 pubId,
        uint256 profileId
    );
    event GrantFunded(address currency, uint256 grantId, uint256 amount);
    event AllClaimedMilestone(uint256 grantId, uint8 milestone);
    event GrantDeleted(uint256 grantId, address deleter);
    event MilestoneClaimed(address claimer, uint8 milestone, uint256 grantId);
    event MilestoneStatusUpdated(
        address updater,
        uint256 grantId,
        uint8 milestone,
        LegendLibrary.MilestoneStatus status
    );

    modifier onlyAdmin() {
        if (!legendAccessControl.isAdmin(msg.sender)) {
            revert LegendErrors.InvalidAddress();
        }
        _;
    }

    constructor(address _legendAccessControlAddress) {
        legendAccessControl = LegendAccessControl(_legendAccessControlAddress);
        symbol = "LD";
        name = "LegendData";
        _periodClaim = 2 weeks;
    }

    function registerGrant(
        LegendLibrary.CreateGrant memory _params
    ) external onlyOpenAction {
        if (_params.granteeAddresses.length != _params.splitAmounts.length) {
            revert LegendErrors.InvalidLengths();
        }
        _grantSupply++;
        _lensToGrantId[_params.profileId][_params.pubId] = _grantSupply;

        LegendLibrary.Grant storage newGrant = _allGrants[_grantSupply];

        newGrant.grantId = _grantSupply;
        newGrant.pubId = _params.pubId;
        newGrant.profileId = _params.profileId;
        newGrant.acceptedCurrencies = _params.acceptedCurrencies;
        newGrant.granteeAddresses = _params.granteeAddresses;

        for (uint256 i = 0; i < _params.acceptedCurrencies.length; i++) {
            newGrant.currencyAccepted[_params.acceptedCurrencies[i]] = true;
        }

        for (uint256 i = 0; i < _params.granteeAddresses.length; i++) {
            newGrant.splitAmounts[_params.granteeAddresses[i]] = _params
                .splitAmounts[i];
        }

        _setLevels(newGrant, _params.levelInfo);
        _setMilestones(
            newGrant,
            _params.goalToCurrency,
            _params.acceptedCurrencies,
            _params.submitBys
        );

        emit GrantCreated(
            _grantSupply,
            msg.sender,
            _params.pubId,
            _params.profileId
        );
    }

    function deleteGrant(uint256 _grantId) external onlyGrantee(_grantId) {
        if (
            _lensToGrantId[_allGrants[_grantId].profileId][
                _allGrants[_grantId].pubId
            ] == 0
        ) {
            revert LegendErrors.InvalidDelete();
        }
        for (
            uint256 i = 0;
            i < _allGrants[_grantId].acceptedCurrencies.length;
            i++
        ) {
            if (
                _allGrants[_grantId].amountFundedToCurrency[
                    _allGrants[_grantId].acceptedCurrencies[i]
                ] > 0
            ) {
                revert LegendErrors.InvalidDelete();
            }
        }

        delete _lensToGrantId[_allGrants[_grantId].profileId][
            _allGrants[_grantId].pubId
        ];
        delete _allGrants[_grantId];
        emit GrantDeleted(_grantId, msg.sender);
    }

    function updateMilestoneStatus(
        address _granteeAddress,
        LegendLibrary.MilestoneStatus _status,
        uint256 _grantId,
        uint8 _milestone
    ) external onlyMilestoneEscrow {
        _allGrants[_grantId].milestones[_milestone - 1].status = _status;

        emit MilestoneStatusUpdated(
            _granteeAddress,
            _grantId,
            _milestone,
            _status
        );
    }

    function setGrantAmountFunded(
        address _currency,
        uint256 _grantId,
        uint256 _amountFunded
    ) external onlyOpenAction {
        _allGrants[_grantId].amountFundedToCurrency[_currency] += _amountFunded;

        emit GrantFunded(_currency, _grantId, _amountFunded);
    }

    function setGranteeClaimedMilestone(
        address _granteeAddress,
        uint256 _grantId,
        uint8 _milestone
    ) external onlyMilestoneEscrow {
        _allGrants[_grantId].milestones[_milestone - 1].hasClaimedMilestone[
                _granteeAddress
            ] = true;

        emit MilestoneClaimed(_granteeAddress, _milestone, _grantId);
    }

    function setAllClaimedMilestone(
        uint256 _grantId,
        uint8 _milestone
    ) external onlyMilestoneEscrow {
        _allGrants[_grantId].milestones[_milestone - 1].allClaimed = true;

        emit AllClaimedMilestone(_grantId, _milestone);
    }

    function setAdditionalPeriodClaim(uint256 _period) public onlyAdmin {
        _periodClaim = _period;
    }

    function _setMilestones(
        LegendLibrary.Grant storage _newGrant,
        uint256[][3] memory _goalToCurrency,
        address[] memory _acceptedCurrencies,
        uint256[3] memory _submitBys
    ) private {
        for (uint8 j = 0; j < 3; j++) {
            _newGrant.milestones[j].submitBy = _submitBys[j];
            _newGrant.milestones[j].allClaimed = false;
            _newGrant.milestones[j].status = LegendLibrary
                .MilestoneStatus
                .NotClaimed;

            for (uint256 i = 0; i < _acceptedCurrencies.length; i++) {
                _newGrant.milestones[j].currencyToGoal[
                    _acceptedCurrencies[i]
                ] = _goalToCurrency[j][i];
            }
        }
    }

    function _setLevels(
        LegendLibrary.Grant storage _newGrant,
        LegendLibrary.LevelInfo[6] memory _levels
    ) private {
        for (uint8 i = 0; i < _levels.length; i++) {
            _newGrant.levelInfo[i].collectionIds = _levels[i].collectionIds;
            _newGrant.levelInfo[i].amounts = _levels[i].amounts;
            _newGrant.levelInfo[i].level = _levels[i].level;
        }
    }

    function setMilestoneClaimAddress(
        address _legendMilestoneAddress
    ) public onlyAdmin {
        legendMilestone = _legendMilestoneAddress;
    }

    function setLegendAccessControlAddress(
        address _newLegendAccessControlAddress
    ) public onlyAdmin {
        legendAccessControl = LegendAccessControl(
            _newLegendAccessControlAddress
        );
    }

    function getGrantSupply() public view returns (uint256) {
        return _grantSupply;
    }

    function getGrantAddresses(
        uint256 _grantId
    ) public view returns (address[] memory) {
        return _allGrants[_grantId].granteeAddresses;
    }

    function getGrantAcceptedCurrencies(
        uint256 _grantId
    ) public view returns (address[] memory) {
        return _allGrants[_grantId].acceptedCurrencies;
    }

    function getIsGrantAcceptedCurrency(
        address _currency,
        uint256 _grantId
    ) public view returns (bool) {
        return _allGrants[_grantId].currencyAccepted[_currency];
    }

    function getGrantId(
        uint256 _profileId,
        uint256 _pubId
    ) public view returns (uint256) {
        return _lensToGrantId[_profileId][_pubId];
    }

    function getGrantPubId(uint256 _grantId) public view returns (uint256) {
        return _allGrants[_grantId].pubId;
    }

    function getGrantProfileId(uint256 _grantId) public view returns (uint256) {
        return _allGrants[_grantId].profileId;
    }

    function getGrantLevelCollectionIds(
        uint256 _grantId,
        uint8 _level
    ) public view returns (uint256[] memory) {
        return _allGrants[_grantId].levelInfo[_level - 2].collectionIds;
    }

    function getGrantLevelAmounts(
        uint256 _grantId,
        uint8 _level
    ) public view returns (uint256[] memory) {
        return _allGrants[_grantId].levelInfo[_level - 2].amounts;
    }

    function getMilestoneGoalToCurrency(
        address _currency,
        uint256 _grantId,
        uint8 _milestone
    ) public view returns (uint256) {
        return
            _allGrants[_grantId].milestones[_milestone - 1].currencyToGoal[
                _currency
            ];
    }

    function getMilestoneStatus(
        uint256 _grantId,
        uint8 _milestone
    ) public view returns (LegendLibrary.MilestoneStatus) {
        return _allGrants[_grantId].milestones[_milestone - 1].status;
    }

    function getMilestoneSubmitBy(
        uint256 _grantId,
        uint8 _milestone
    ) public view returns (uint256) {
        return _allGrants[_grantId].milestones[_milestone - 1].submitBy;
    }

    function getGrantAmountFundedByCurrency(
        address _currency,
        uint256 _grantId
    ) public view returns (uint256) {
        return _allGrants[_grantId].amountFundedToCurrency[_currency];
    }

    function getGranteeClaimedMilestone(
        address _granteeAddress,
        uint256 _grantId,
        uint8 _milestone
    ) public view returns (bool) {
        return
            _allGrants[_grantId].milestones[_milestone - 1].hasClaimedMilestone[
                _granteeAddress
            ];
    }

    function getAllClaimedMilestone(
        uint256 _grantId,
        uint8 _milestone
    ) public view returns (bool) {
        return _allGrants[_grantId].milestones[_milestone - 1].allClaimed;
    }

    function getGranteeSplitAmount(
        address _granteeAddress,
        uint256 _grantId
    ) public view returns (uint256) {
        return _allGrants[_grantId].splitAmounts[_granteeAddress];
    }

    function getPeriodClaim() public view returns (uint256) {
        return _periodClaim;
    }
}
