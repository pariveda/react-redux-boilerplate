import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IDispatchProp from 'types/dispatch-prop';
import IGlobalState from 'types/global-state';
import IDemoItem from './demo.type';
interface IOwnProps {
  code: string;
}

interface IStateProps {
  demoItem: IDemoItem;
}

type IProps = IStateProps & IDispatchProp & IOwnProps;

class DemoItemCard extends React.Component<IProps> {
  render() {
    const Container = styled.div`
      margin: 12px;
      padding: 12px;
    `;
    return (
      <Container>
        {this.props.demoItem.name} with color {this.props.demoItem.color}
      </Container>
    );
  }
}

const mapStateToProps = (state: IGlobalState, ownProps: IOwnProps) => ({
  demoItem: state.entities.demo[ownProps.code],
});

export default connect<IStateProps, IDispatchProp, IOwnProps>(mapStateToProps)(
  DemoItemCard,
);
