import React from 'react';
import { connect } from 'react-redux';
import IDispatchProp from 'types/dispatch-prop';
import IGlobalState from 'types/global-state';
import DemoItem from './demo-item';

interface IStateProps {
  items: string[];
}

type IProps = IStateProps & IDispatchProp;

class DemoItemList extends React.Component<IProps> {
  render() {
    const list = this.props.items.map(id => <DemoItem key={id} code={id} />);
    return <div>{list}</div>;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  items: state.interactive.demo.demoItems,
});

export default connect<IStateProps, IDispatchProp, {}>(mapStateToProps)(
  DemoItemList,
);
