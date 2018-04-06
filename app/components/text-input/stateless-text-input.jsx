import React from 'react';
class Input extends React.Component {
    constructor() {
        super(...arguments);
        // validators
        this.checkLength = (input) => !this.props.maxLength || input.length <= this.props.maxLength;
        this.validateInput = (input) => !this.props.validationFn || this.props.validationFn(input);
        // event handlers
        this.edit = () => {
            this.setState({
                isEditing: true,
            });
        };
        this.formatValue = (value) => {
            let saveValue = value;
            if (this.props.textFormat) {
                saveValue =
                    this.props.textFormat === 'uppercase'
                        ? saveValue.toUpperCase()
                        : saveValue.toLocaleLowerCase();
            }
            return saveValue;
        };
        this.handleChange = (e) => {
            this.props.onChange(e.target.value);
            return;
        };
        this.handleKeyPress = (e) => {
            if (this.props.onEnter && e.keyCode === 13) {
                const element = e.target;
                this.props.onEnter(element.value);
                element.blur();
            }
            return;
        };
        this.renderInput = () => {
            return (<input onKeyUp={this.handleKeyPress} onBlur={this.props.onBlur} value={this.props.value} onChange={this.handleChange} onClick={this.props.onClick} autoFocus={this.props.autoFocus} ref={this.props.inputRef} onFocus={this.props.onFocus}/>);
        };
    }
    render() {
        return <div className={this.props.className}>{this.renderInput()}</div>;
    }
}
export default Input;
//# sourceMappingURL=stateless-text-input.jsx.map