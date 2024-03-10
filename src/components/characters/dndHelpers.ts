export const allowDropToPrefixes = {
  inventory: "inventory_",
  equipmentAndMerchant: "equipment_&_merchant_",
};

export const selectClassName = (isActive: boolean, canDrop: boolean) => {
  if (isActive) {
    return "active";
  } else if (canDrop) {
    return "canDrop";
  }
};
