import StatelessTextInput from 'components/text-input/stateless-text-input';
import reducer from 'global-reducer';
import DemoItemList from 'modules/demo';
import { fetchData, updateText } from 'modules/demo/act.demo';
import withRedux from 'next-redux-wrapper';
import React from 'react';
import makeStore from 'redux-util';
/** Demo Page */
class Demo extends React.Component {
    componentDidMount() {
        window.setTimeout(() => this.props.dispatch(fetchData()), 2000);
    }
    render() {
        const onChange = (text) => this.props.dispatch(updateText(text));
        return (<div>
        Hello World
        <h1>{this.props.isLoading ? 'Loading ...' : 'Loaded!'}</h1>
        <StatelessTextInput value={this.props.text} onChange={onChange}/>
        <DemoItemList />
      </div>);
    }
}
const mapStateToProps = (state) => ({
    isLoading: state.interactive.demo.isLoading,
    text: state.interactive.demo.text,
});
export default withRedux(makeStore(reducer), mapStateToProps)(Demo);
//# sourceMappingURL=login.jsx.map