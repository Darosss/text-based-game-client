export const dropAcceptTypePrefix = "inventory_";

export const selectClassName = (isActive: boolean, canDrop: boolean) => {
  if (isActive) {
    return "active";
  } else if (canDrop) {
    return "canDrop";
  }
};
