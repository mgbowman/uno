/**
 * Enum holding available card colors.
 *
 * Red, Blue, Green and Yellow,
 * represented with indexes
 * 0, 1, 2, 3, respectively.
 */
export enum Colors {
  RED = 0,
  BLUE = 1,
  GREEN = 2,
  YELLOW = 3,
}

export namespace Colors {
  /**
   * Runtime type checking
   */
  export function isValidValue(value: Colors) {
    return values.indexOf(value) !== -1;
  }

  export const values = [Colors.RED, Colors.BLUE, Colors.GREEN, Colors.YELLOW];
}
