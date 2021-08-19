/* tslint:disable */
/* eslint-disable */
/**
*/
export class CraftsAI {
  free(): void;
/**
* @param {JsStatus} s
*/
  constructor(s: JsStatus);
/**
* @param {Function} report
*/
  init(report: Function): void;
/**
* @param {JsStatus} s
* @returns {any}
*/
  resolve(s: JsStatus): any;
}
/**
*/
export class JsStatus {
  free(): void;
/**
* @param {number} level
* @param {number} craftsmanship
* @param {number} control
* @param {number} craft_points
* @param {boolean} specialist
* @param {number} rlv
* @param {number} recipe_player_level
* @param {number} progress
* @param {number} quality
* @param {number} durability
*/
  constructor(level: number, craftsmanship: number, control: number, craft_points: number, specialist: boolean, rlv: number, recipe_player_level: number, progress: number, quality: number, durability: number);
/**
* @param {string} sk
* @returns {any}
*/
  cast_skills(sk: string): any;
/**
* @returns {number}
*/
  du(): number;
/**
* @returns {number}
*/
  cp(): number;
/**
* @returns {number}
*/
  pg(): number;
/**
* @returns {number}
*/
  qu(): number;
}
