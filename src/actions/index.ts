// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

export * from "./auth";
export * from "./launchpad";
export * from "./profile";
export * from "./user";
export * from "./collection";
