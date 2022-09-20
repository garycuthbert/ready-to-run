
/**
 * Helper function to test if a property exists on an object.
 * Explanations: IE messes up the hasOwnProperty method making it hard to trust it.
 * This method accesses the Object.prototype directly
 * @param obj
 * @param prop
 * @returns
 */
export function hasProp(obj: any, prop: any) : boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
