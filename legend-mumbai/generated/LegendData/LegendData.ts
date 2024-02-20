// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AllClaimedMilestone extends ethereum.Event {
  get params(): AllClaimedMilestone__Params {
    return new AllClaimedMilestone__Params(this);
  }
}

export class AllClaimedMilestone__Params {
  _event: AllClaimedMilestone;

  constructor(event: AllClaimedMilestone) {
    this._event = event;
  }

  get grantId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get milestone(): i32 {
    return this._event.parameters[1].value.toI32();
  }
}

export class GrantCreated extends ethereum.Event {
  get params(): GrantCreated__Params {
    return new GrantCreated__Params(this);
  }
}

export class GrantCreated__Params {
  _event: GrantCreated;

  constructor(event: GrantCreated) {
    this._event = event;
  }

  get grantId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get pubId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get profileId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class GrantDeleted extends ethereum.Event {
  get params(): GrantDeleted__Params {
    return new GrantDeleted__Params(this);
  }
}

export class GrantDeleted__Params {
  _event: GrantDeleted;

  constructor(event: GrantDeleted) {
    this._event = event;
  }

  get grantId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get deleter(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class GrantFunded extends ethereum.Event {
  get params(): GrantFunded__Params {
    return new GrantFunded__Params(this);
  }
}

export class GrantFunded__Params {
  _event: GrantFunded;

  constructor(event: GrantFunded) {
    this._event = event;
  }

  get currency(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get funder(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get grantId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class GrantOrder extends ethereum.Event {
  get params(): GrantOrder__Params {
    return new GrantOrder__Params(this);
  }
}

export class GrantOrder__Params {
  _event: GrantOrder;

  constructor(event: GrantOrder) {
    this._event = event;
  }

  get encryptedFulfillment(): string {
    return this._event.parameters[0].value.toString();
  }

  get currency(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get funder(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get grantId(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get orderId(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get level(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class MilestoneClaimed extends ethereum.Event {
  get params(): MilestoneClaimed__Params {
    return new MilestoneClaimed__Params(this);
  }
}

export class MilestoneClaimed__Params {
  _event: MilestoneClaimed;

  constructor(event: MilestoneClaimed) {
    this._event = event;
  }

  get claimer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get milestone(): i32 {
    return this._event.parameters[1].value.toI32();
  }

  get grantId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class MilestoneStatusUpdated extends ethereum.Event {
  get params(): MilestoneStatusUpdated__Params {
    return new MilestoneStatusUpdated__Params(this);
  }
}

export class MilestoneStatusUpdated__Params {
  _event: MilestoneStatusUpdated;

  constructor(event: MilestoneStatusUpdated) {
    this._event = event;
  }

  get updater(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get grantId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get milestone(): i32 {
    return this._event.parameters[2].value.toI32();
  }

  get status(): i32 {
    return this._event.parameters[3].value.toI32();
  }
}

export class LegendData extends ethereum.SmartContract {
  static bind(address: Address): LegendData {
    return new LegendData("LegendData", address);
  }

  getAllClaimedMilestone(_grantId: BigInt, _milestone: i32): boolean {
    let result = super.call(
      "getAllClaimedMilestone",
      "getAllClaimedMilestone(uint256,uint8):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );

    return result[0].toBoolean();
  }

  try_getAllClaimedMilestone(
    _grantId: BigInt,
    _milestone: i32
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getAllClaimedMilestone",
      "getAllClaimedMilestone(uint256,uint8):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getGrantAcceptedCurrencies(_grantId: BigInt): Array<Address> {
    let result = super.call(
      "getGrantAcceptedCurrencies",
      "getGrantAcceptedCurrencies(uint256):(address[])",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );

    return result[0].toAddressArray();
  }

  try_getGrantAcceptedCurrencies(
    _grantId: BigInt
  ): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getGrantAcceptedCurrencies",
      "getGrantAcceptedCurrencies(uint256):(address[])",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getGrantAddresses(_grantId: BigInt): Array<Address> {
    let result = super.call(
      "getGrantAddresses",
      "getGrantAddresses(uint256):(address[])",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );

    return result[0].toAddressArray();
  }

  try_getGrantAddresses(_grantId: BigInt): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getGrantAddresses",
      "getGrantAddresses(uint256):(address[])",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  getGrantAmountFundedByCurrency(_currency: Address, _grantId: BigInt): BigInt {
    let result = super.call(
      "getGrantAmountFundedByCurrency",
      "getGrantAmountFundedByCurrency(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_currency),
        ethereum.Value.fromUnsignedBigInt(_grantId)
      ]
    );

    return result[0].toBigInt();
  }

  try_getGrantAmountFundedByCurrency(
    _currency: Address,
    _grantId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getGrantAmountFundedByCurrency",
      "getGrantAmountFundedByCurrency(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_currency),
        ethereum.Value.fromUnsignedBigInt(_grantId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getGrantId(_profileId: BigInt, _pubId: BigInt): BigInt {
    let result = super.call(
      "getGrantId",
      "getGrantId(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_profileId),
        ethereum.Value.fromUnsignedBigInt(_pubId)
      ]
    );

    return result[0].toBigInt();
  }

  try_getGrantId(
    _profileId: BigInt,
    _pubId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getGrantId",
      "getGrantId(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_profileId),
        ethereum.Value.fromUnsignedBigInt(_pubId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getGrantLevelAmounts(_grantId: BigInt, _level: i32): Array<BigInt> {
    let result = super.call(
      "getGrantLevelAmounts",
      "getGrantLevelAmounts(uint256,uint8):(uint256[])",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_level))
      ]
    );

    return result[0].toBigIntArray();
  }

  try_getGrantLevelAmounts(
    _grantId: BigInt,
    _level: i32
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getGrantLevelAmounts",
      "getGrantLevelAmounts(uint256,uint8):(uint256[])",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_level))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getGrantLevelCollectionIds(_grantId: BigInt, _level: i32): Array<BigInt> {
    let result = super.call(
      "getGrantLevelCollectionIds",
      "getGrantLevelCollectionIds(uint256,uint8):(uint256[])",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_level))
      ]
    );

    return result[0].toBigIntArray();
  }

  try_getGrantLevelCollectionIds(
    _grantId: BigInt,
    _level: i32
  ): ethereum.CallResult<Array<BigInt>> {
    let result = super.tryCall(
      "getGrantLevelCollectionIds",
      "getGrantLevelCollectionIds(uint256,uint8):(uint256[])",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_level))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigIntArray());
  }

  getGrantProfileId(_grantId: BigInt): BigInt {
    let result = super.call(
      "getGrantProfileId",
      "getGrantProfileId(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );

    return result[0].toBigInt();
  }

  try_getGrantProfileId(_grantId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getGrantProfileId",
      "getGrantProfileId(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getGrantPubId(_grantId: BigInt): BigInt {
    let result = super.call(
      "getGrantPubId",
      "getGrantPubId(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );

    return result[0].toBigInt();
  }

  try_getGrantPubId(_grantId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getGrantPubId",
      "getGrantPubId(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_grantId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getGrantSupply(): BigInt {
    let result = super.call("getGrantSupply", "getGrantSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getGrantSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getGrantSupply",
      "getGrantSupply():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getGrantURI(_grantId: BigInt): string {
    let result = super.call("getGrantURI", "getGrantURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(_grantId)
    ]);

    return result[0].toString();
  }

  try_getGrantURI(_grantId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("getGrantURI", "getGrantURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(_grantId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getGranteeClaimedMilestone(
    _granteeAddress: Address,
    _grantId: BigInt,
    _milestone: i32
  ): boolean {
    let result = super.call(
      "getGranteeClaimedMilestone",
      "getGranteeClaimedMilestone(address,uint256,uint8):(bool)",
      [
        ethereum.Value.fromAddress(_granteeAddress),
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );

    return result[0].toBoolean();
  }

  try_getGranteeClaimedMilestone(
    _granteeAddress: Address,
    _grantId: BigInt,
    _milestone: i32
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getGranteeClaimedMilestone",
      "getGranteeClaimedMilestone(address,uint256,uint8):(bool)",
      [
        ethereum.Value.fromAddress(_granteeAddress),
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getGranteeSplitAmount(_granteeAddress: Address, _grantId: BigInt): BigInt {
    let result = super.call(
      "getGranteeSplitAmount",
      "getGranteeSplitAmount(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_granteeAddress),
        ethereum.Value.fromUnsignedBigInt(_grantId)
      ]
    );

    return result[0].toBigInt();
  }

  try_getGranteeSplitAmount(
    _granteeAddress: Address,
    _grantId: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getGranteeSplitAmount",
      "getGranteeSplitAmount(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(_granteeAddress),
        ethereum.Value.fromUnsignedBigInt(_grantId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getIsGrantAcceptedCurrency(_currency: Address, _grantId: BigInt): boolean {
    let result = super.call(
      "getIsGrantAcceptedCurrency",
      "getIsGrantAcceptedCurrency(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_currency),
        ethereum.Value.fromUnsignedBigInt(_grantId)
      ]
    );

    return result[0].toBoolean();
  }

  try_getIsGrantAcceptedCurrency(
    _currency: Address,
    _grantId: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "getIsGrantAcceptedCurrency",
      "getIsGrantAcceptedCurrency(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(_currency),
        ethereum.Value.fromUnsignedBigInt(_grantId)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  getMilestoneGoalToCurrency(
    _currency: Address,
    _grantId: BigInt,
    _milestone: i32
  ): BigInt {
    let result = super.call(
      "getMilestoneGoalToCurrency",
      "getMilestoneGoalToCurrency(address,uint256,uint8):(uint256)",
      [
        ethereum.Value.fromAddress(_currency),
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );

    return result[0].toBigInt();
  }

  try_getMilestoneGoalToCurrency(
    _currency: Address,
    _grantId: BigInt,
    _milestone: i32
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMilestoneGoalToCurrency",
      "getMilestoneGoalToCurrency(address,uint256,uint8):(uint256)",
      [
        ethereum.Value.fromAddress(_currency),
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getMilestoneStatus(_grantId: BigInt, _milestone: i32): i32 {
    let result = super.call(
      "getMilestoneStatus",
      "getMilestoneStatus(uint256,uint8):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );

    return result[0].toI32();
  }

  try_getMilestoneStatus(
    _grantId: BigInt,
    _milestone: i32
  ): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "getMilestoneStatus",
      "getMilestoneStatus(uint256,uint8):(uint8)",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  getMilestoneSubmitBy(_grantId: BigInt, _milestone: i32): BigInt {
    let result = super.call(
      "getMilestoneSubmitBy",
      "getMilestoneSubmitBy(uint256,uint8):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );

    return result[0].toBigInt();
  }

  try_getMilestoneSubmitBy(
    _grantId: BigInt,
    _milestone: i32
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMilestoneSubmitBy",
      "getMilestoneSubmitBy(uint256,uint8):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_grantId),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_milestone))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getOrderAmount(_orderId: BigInt): BigInt {
    let result = super.call(
      "getOrderAmount",
      "getOrderAmount(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );

    return result[0].toBigInt();
  }

  try_getOrderAmount(_orderId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getOrderAmount",
      "getOrderAmount(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getOrderCurrency(_orderId: BigInt): Address {
    let result = super.call(
      "getOrderCurrency",
      "getOrderCurrency(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );

    return result[0].toAddress();
  }

  try_getOrderCurrency(_orderId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getOrderCurrency",
      "getOrderCurrency(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getOrderEncryptedFulfillment(_orderId: BigInt): string {
    let result = super.call(
      "getOrderEncryptedFulfillment",
      "getOrderEncryptedFulfillment(uint256):(string)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );

    return result[0].toString();
  }

  try_getOrderEncryptedFulfillment(
    _orderId: BigInt
  ): ethereum.CallResult<string> {
    let result = super.tryCall(
      "getOrderEncryptedFulfillment",
      "getOrderEncryptedFulfillment(uint256):(string)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getOrderFunder(_orderId: BigInt): Address {
    let result = super.call(
      "getOrderFunder",
      "getOrderFunder(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );

    return result[0].toAddress();
  }

  try_getOrderFunder(_orderId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getOrderFunder",
      "getOrderFunder(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getOrderGrantId(_orderId: BigInt): BigInt {
    let result = super.call(
      "getOrderGrantId",
      "getOrderGrantId(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );

    return result[0].toBigInt();
  }

  try_getOrderGrantId(_orderId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getOrderGrantId",
      "getOrderGrantId(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getOrderLevel(_orderId: BigInt): BigInt {
    let result = super.call(
      "getOrderLevel",
      "getOrderLevel(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );

    return result[0].toBigInt();
  }

  try_getOrderLevel(_orderId: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getOrderLevel",
      "getOrderLevel(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(_orderId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getOrderSupply(): BigInt {
    let result = super.call("getOrderSupply", "getOrderSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getOrderSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getOrderSupply",
      "getOrderSupply():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getPeriodClaim(): BigInt {
    let result = super.call("getPeriodClaim", "getPeriodClaim():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getPeriodClaim(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPeriodClaim",
      "getPeriodClaim():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  legendAccessControl(): Address {
    let result = super.call(
      "legendAccessControl",
      "legendAccessControl():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_legendAccessControl(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "legendAccessControl",
      "legendAccessControl():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  legendMilestone(): Address {
    let result = super.call(
      "legendMilestone",
      "legendMilestone():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_legendMilestone(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "legendMilestone",
      "legendMilestone():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _legendAccessControlAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DeleteGrantCall extends ethereum.Call {
  get inputs(): DeleteGrantCall__Inputs {
    return new DeleteGrantCall__Inputs(this);
  }

  get outputs(): DeleteGrantCall__Outputs {
    return new DeleteGrantCall__Outputs(this);
  }
}

export class DeleteGrantCall__Inputs {
  _call: DeleteGrantCall;

  constructor(call: DeleteGrantCall) {
    this._call = call;
  }

  get _grantId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DeleteGrantCall__Outputs {
  _call: DeleteGrantCall;

  constructor(call: DeleteGrantCall) {
    this._call = call;
  }
}

export class RegisterGrantCall extends ethereum.Call {
  get inputs(): RegisterGrantCall__Inputs {
    return new RegisterGrantCall__Inputs(this);
  }

  get outputs(): RegisterGrantCall__Outputs {
    return new RegisterGrantCall__Outputs(this);
  }
}

export class RegisterGrantCall__Inputs {
  _call: RegisterGrantCall;

  constructor(call: RegisterGrantCall) {
    this._call = call;
  }

  get _params(): RegisterGrantCall_paramsStruct {
    return changetype<RegisterGrantCall_paramsStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }
}

export class RegisterGrantCall__Outputs {
  _call: RegisterGrantCall;

  constructor(call: RegisterGrantCall) {
    this._call = call;
  }
}

export class RegisterGrantCall_paramsStruct extends ethereum.Tuple {
  get levelInfo(): Array<RegisterGrantCall_paramsLevelInfoStruct> {
    return this[0].toTupleArray<RegisterGrantCall_paramsLevelInfoStruct>();
  }

  get goalToCurrency(): Array<Array<BigInt>> {
    return this[1].toBigIntMatrix();
  }

  get acceptedCurrencies(): Array<Address> {
    return this[2].toAddressArray();
  }

  get granteeAddresses(): Array<Address> {
    return this[3].toAddressArray();
  }

  get splitAmounts(): Array<BigInt> {
    return this[4].toBigIntArray();
  }

  get submitBys(): Array<BigInt> {
    return this[5].toBigIntArray();
  }

  get uri(): string {
    return this[6].toString();
  }

  get pubId(): BigInt {
    return this[7].toBigInt();
  }

  get profileId(): BigInt {
    return this[8].toBigInt();
  }
}

export class RegisterGrantCall_paramsLevelInfoStruct extends ethereum.Tuple {
  get collectionIds(): Array<BigInt> {
    return this[0].toBigIntArray();
  }

  get amounts(): Array<BigInt> {
    return this[1].toBigIntArray();
  }

  get level(): i32 {
    return this[2].toI32();
  }
}

export class SetAdditionalPeriodClaimCall extends ethereum.Call {
  get inputs(): SetAdditionalPeriodClaimCall__Inputs {
    return new SetAdditionalPeriodClaimCall__Inputs(this);
  }

  get outputs(): SetAdditionalPeriodClaimCall__Outputs {
    return new SetAdditionalPeriodClaimCall__Outputs(this);
  }
}

export class SetAdditionalPeriodClaimCall__Inputs {
  _call: SetAdditionalPeriodClaimCall;

  constructor(call: SetAdditionalPeriodClaimCall) {
    this._call = call;
  }

  get _period(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetAdditionalPeriodClaimCall__Outputs {
  _call: SetAdditionalPeriodClaimCall;

  constructor(call: SetAdditionalPeriodClaimCall) {
    this._call = call;
  }
}

export class SetAllClaimedMilestoneCall extends ethereum.Call {
  get inputs(): SetAllClaimedMilestoneCall__Inputs {
    return new SetAllClaimedMilestoneCall__Inputs(this);
  }

  get outputs(): SetAllClaimedMilestoneCall__Outputs {
    return new SetAllClaimedMilestoneCall__Outputs(this);
  }
}

export class SetAllClaimedMilestoneCall__Inputs {
  _call: SetAllClaimedMilestoneCall;

  constructor(call: SetAllClaimedMilestoneCall) {
    this._call = call;
  }

  get _grantId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _milestone(): i32 {
    return this._call.inputValues[1].value.toI32();
  }
}

export class SetAllClaimedMilestoneCall__Outputs {
  _call: SetAllClaimedMilestoneCall;

  constructor(call: SetAllClaimedMilestoneCall) {
    this._call = call;
  }
}

export class SetGrantAmountFundedCall extends ethereum.Call {
  get inputs(): SetGrantAmountFundedCall__Inputs {
    return new SetGrantAmountFundedCall__Inputs(this);
  }

  get outputs(): SetGrantAmountFundedCall__Outputs {
    return new SetGrantAmountFundedCall__Outputs(this);
  }
}

export class SetGrantAmountFundedCall__Inputs {
  _call: SetGrantAmountFundedCall;

  constructor(call: SetGrantAmountFundedCall) {
    this._call = call;
  }

  get _fulfillment(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _currency(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _funder(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _grantId(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _amountFunded(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _level(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class SetGrantAmountFundedCall__Outputs {
  _call: SetGrantAmountFundedCall;

  constructor(call: SetGrantAmountFundedCall) {
    this._call = call;
  }
}

export class SetGranteeClaimedMilestoneCall extends ethereum.Call {
  get inputs(): SetGranteeClaimedMilestoneCall__Inputs {
    return new SetGranteeClaimedMilestoneCall__Inputs(this);
  }

  get outputs(): SetGranteeClaimedMilestoneCall__Outputs {
    return new SetGranteeClaimedMilestoneCall__Outputs(this);
  }
}

export class SetGranteeClaimedMilestoneCall__Inputs {
  _call: SetGranteeClaimedMilestoneCall;

  constructor(call: SetGranteeClaimedMilestoneCall) {
    this._call = call;
  }

  get _granteeAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _grantId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _milestone(): i32 {
    return this._call.inputValues[2].value.toI32();
  }
}

export class SetGranteeClaimedMilestoneCall__Outputs {
  _call: SetGranteeClaimedMilestoneCall;

  constructor(call: SetGranteeClaimedMilestoneCall) {
    this._call = call;
  }
}

export class SetLegendAccessControlAddressCall extends ethereum.Call {
  get inputs(): SetLegendAccessControlAddressCall__Inputs {
    return new SetLegendAccessControlAddressCall__Inputs(this);
  }

  get outputs(): SetLegendAccessControlAddressCall__Outputs {
    return new SetLegendAccessControlAddressCall__Outputs(this);
  }
}

export class SetLegendAccessControlAddressCall__Inputs {
  _call: SetLegendAccessControlAddressCall;

  constructor(call: SetLegendAccessControlAddressCall) {
    this._call = call;
  }

  get _newLegendAccessControlAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetLegendAccessControlAddressCall__Outputs {
  _call: SetLegendAccessControlAddressCall;

  constructor(call: SetLegendAccessControlAddressCall) {
    this._call = call;
  }
}

export class SetMilestoneEscrowAddressCall extends ethereum.Call {
  get inputs(): SetMilestoneEscrowAddressCall__Inputs {
    return new SetMilestoneEscrowAddressCall__Inputs(this);
  }

  get outputs(): SetMilestoneEscrowAddressCall__Outputs {
    return new SetMilestoneEscrowAddressCall__Outputs(this);
  }
}

export class SetMilestoneEscrowAddressCall__Inputs {
  _call: SetMilestoneEscrowAddressCall;

  constructor(call: SetMilestoneEscrowAddressCall) {
    this._call = call;
  }

  get _legendMilestoneAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMilestoneEscrowAddressCall__Outputs {
  _call: SetMilestoneEscrowAddressCall;

  constructor(call: SetMilestoneEscrowAddressCall) {
    this._call = call;
  }
}

export class UpdateMilestoneStatusCall extends ethereum.Call {
  get inputs(): UpdateMilestoneStatusCall__Inputs {
    return new UpdateMilestoneStatusCall__Inputs(this);
  }

  get outputs(): UpdateMilestoneStatusCall__Outputs {
    return new UpdateMilestoneStatusCall__Outputs(this);
  }
}

export class UpdateMilestoneStatusCall__Inputs {
  _call: UpdateMilestoneStatusCall;

  constructor(call: UpdateMilestoneStatusCall) {
    this._call = call;
  }

  get _granteeAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _status(): i32 {
    return this._call.inputValues[1].value.toI32();
  }

  get _grantId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _milestone(): i32 {
    return this._call.inputValues[3].value.toI32();
  }
}

export class UpdateMilestoneStatusCall__Outputs {
  _call: UpdateMilestoneStatusCall;

  constructor(call: UpdateMilestoneStatusCall) {
    this._call = call;
  }
}
