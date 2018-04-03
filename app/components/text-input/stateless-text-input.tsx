import React from 'react';
import { ActionReturn } from 'types/redux';
import IDefaultProps from 'types/styled-component-props';

interface IProps extends React.HTMLProps<HTMLInputElement>, IDefaultProps {
  /**
   * [optional] value to populate input with by default
   */
  value?: string;

  /**
   * [optional] value to display as placeholder when input is empty
   */
  placeholder?: string;

  /**
   * [optional] text alignment inside input.  defaults to left
   */
  textAlign?: 'left' | 'center' | 'right';

  /**
   * [optional] font color.  defaults to grey6
   */
  fontColor?: string;

  /**
   * [optional] display behavior.  default is flex
   */
  display?: string;

  /**
   * [optional] additional validation function for specific validation rqmts.
   */
  validationFn?: (args: string) => boolean;

  /**
   * [optional] max number of symbols for editable text component
   */
  maxLength?: number;

  /**
   * [optional] function to call when user clicks on text input
   */
  onClick?: (...args: any[]) => ActionReturn | void;

  /**
   * [optional] identifies if text should be formatted before being saved
   */
  textFormat?: 'uppercase' | 'lowercase';

  /**
   * [optional] Error message to display if input value is invalid
   */
  errorMsg?: string;

  /**
   * [optional] text input focus
   */
  autoFocus?: boolean;

  /**
   * [optional] detect changes, callback for managing change
   * outside component
   */
  onChange?: (...args: any[]) => ActionReturn | void;

  /**
   * [optional] callback to fire when hitting enter in the input
   */
  onEnter?: (...args: any[]) => ActionReturn | void;

  /**
   * [optional] detect changes, callback for managing change
   * outside component
   */
  onBlur?: (...args: any[]) => ActionReturn | void;

  /**
   * Ref callback for the inner input tag - useful for focusing
   */
  inputRef?: (input: HTMLElement) => void;
}

class Input extends React.Component<IProps, any> {
  // validators
  checkLength = (input: string) =>
    !this.props.maxLength || input.length <= this.props.maxLength;

  validateInput = (input: string) =>
    !this.props.validationFn || this.props.validationFn(input);

  // event handlers
  edit: React.EventHandler<React.MouseEvent<HTMLDivElement>> = () => {
    this.setState({
      isEditing: true,
    });
  };

  formatValue = (value: string) => {
    let saveValue = value;
    if (this.props.textFormat) {
      saveValue =
        this.props.textFormat === 'uppercase'
          ? saveValue.toUpperCase()
          : saveValue.toLocaleLowerCase();
    }
    return saveValue;
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
    return;
  };

  handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.props.onEnter && e.keyCode === 13) {
      const element = e.target as HTMLInputElement;
      this.props.onEnter(element.value);
      element.blur();
    }
    return;
  };

  renderInput = () => {
    return (
      <input
        onKeyUp={this.handleKeyPress}
        onBlur={this.props.onBlur}
        value={this.props.value}
        onChange={this.handleChange}
        onClick={this.props.onClick}
        autoFocus={this.props.autoFocus}
        ref={this.props.inputRef}
        onFocus={this.props.onFocus}
      />
    );
  };

  public render() {
    return <div className={this.props.className}>{this.renderInput()}</div>;
  }
}

export default Input;
