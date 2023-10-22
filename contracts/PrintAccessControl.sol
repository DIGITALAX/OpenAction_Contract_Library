// SPDX-License-Identifier: UNLICENSE

pragma solidity ^0.8.16;

contract PrintAccessControl {
    mapping(address => bool) private _admins;
    mapping(address => bool) private _designers;
    mapping(address => bool) private _openActions;
    mapping(address => bool) private _fulfillers;
    mapping(address => bool) private _pkps;

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);
    event DesignerAdded(address indexed designer);
    event DesignerRemoved(address indexed designer);
    event OpenActionAdded(address indexed openAction);
    event OpenActionRemoved(address indexed openAction);
    event FulfillerAdded(address indexed fulfiller);
    event FulfillerRemoved(address indexed fulfiller);
    event PKPAdded(address indexed pkp);
    event PKPRemoved(address indexed pkp);

    error AddressInvalid();
    error Existing();
    error CantRemoveSelf();

    modifier onlyAdmin() {
        if (!_admins[msg.sender]) {
            revert AddressInvalid();
        }
        _;
    }

    constructor() {
        _admins[msg.sender] = true;
    }

    function addAdmin(address _admin) external onlyAdmin {
        if (_admins[_admin] || _admin == msg.sender) {
            revert Existing();
        }
        _admins[_admin] = true;
        emit AdminAdded(_admin);
    }

    function removeAdmin(address _admin) external onlyAdmin {
        if (_admin == msg.sender) {
            revert CantRemoveSelf();
        }
        if (!_admins[_admin]) {
            revert AddressInvalid();
        }
        _admins[_admin] = false;
        emit AdminRemoved(_admin);
    }

    function addDesigner(address _designer) external onlyAdmin {
        if (_designers[_designer]) {
            revert Existing();
        }
        _designers[_designer] = true;
        emit DesignerAdded(_designer);
    }

    function removeDesigner(address _designer) external onlyAdmin {
        if (!_designers[_designer]) {
            revert AddressInvalid();
        }
        _designers[_designer] = false;
        emit DesignerRemoved(_designer);
    }

    function addOpenAction(address _openAction) external onlyAdmin {
        if (_openActions[_openAction]) {
            revert Existing();
        }
        _openActions[_openAction] = true;
        emit OpenActionAdded(_openAction);
    }

    function removeOpenAction(address _openAction) external onlyAdmin {
        if (!_openActions[_openAction]) {
            revert AddressInvalid();
        }
        _openActions[_openAction] = false;
        emit OpenActionRemoved(_openAction);
    }

    function addFulfiller(address _fulfiller) external onlyAdmin {
        if (_fulfillers[_fulfiller]) {
            revert Existing();
        }
        _fulfillers[_fulfiller] = true;
        emit FulfillerAdded(_fulfiller);
    }

    function removeFulfiller(address _fulfiller) external onlyAdmin {
        if (!_fulfillers[_fulfiller]) {
            revert AddressInvalid();
        }
        _fulfillers[_fulfiller] = false;
        emit FulfillerRemoved(_fulfiller);
    }

    function addPKP(address _pkp) external onlyAdmin {
        if (_pkps[_pkp]) {
            revert Existing();
        }
        _pkps[_pkp] = true;
        emit PKPAdded(_pkp);
    }

    function removePKP(address _pkp) external onlyAdmin {
        if (!_pkps[_pkp]) {
            revert AddressInvalid();
        }
        _pkps[_pkp] = false;
        emit PKPRemoved(_pkp);
    }

    function isAdmin(address _address) public view returns (bool) {
        return _admins[_address];
    }

    function isOpenAction(address _address) public view returns (bool) {
        return _openActions[_address];
    }

    function isDesigner(address _address) public view returns (bool) {
        return _designers[_address];
    }

    function isFulfiller(address _address) public view returns (bool) {
        return _fulfillers[_address];
    }

    function isPKP(address _address) public view returns (bool) {
        return _pkps[_address];
    }
}