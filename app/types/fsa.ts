import { Action } from 'redux';
// tslint:disable interface-name

/** Flux Standard Actions */
export interface FSA extends Action {
  /**
   * Any information about the action that is not the type or status of the action
   * should be part of the payload field.
   *
   * By convention, if error is true, the payload SHOULD be an error object.
   * This is akin to rejecting a Promise with an error object.
   */
  payload?: any;

  /**
   * True if the action represents an error. By convention,
   * the payload SHOULD be an error object.
   */
  error?: boolean;

  /** Intended for any extra information that is not part of the payload. */
  meta?: any;
}

export default FSA;
