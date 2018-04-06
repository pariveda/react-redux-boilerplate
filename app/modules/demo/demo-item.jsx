import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
class DemoItemCard extends React.Component {
    render() {
        const Container = styled.div `
      margin: 12px;
      padding: 12px;
    `;
        return (<Container>
        {this.props.demoItem.name} with color {this.props.demoItem.color}
      </Container>);
    }
}
const mapStateToProps = (state, ownProps) => ({
    demoItem: state.entities.demo[ownProps.code],
});
export default connect(mapStateToProps)(DemoItemCard);
//# sourceMappingURL=demo-item.jsx.map