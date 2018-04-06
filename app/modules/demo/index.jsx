import React from 'react';
import { connect } from 'react-redux';
import DemoItem from './demo-item';
class DemoItemList extends React.Component {
    render() {
        const list = this.props.items.map(id => <DemoItem key={id} code={id}/>);
        return <div>{list}</div>;
    }
}
const mapStateToProps = (state) => ({
    items: state.interactive.demo.demoItems,
});
export default connect(mapStateToProps)(DemoItemList);
//# sourceMappingURL=index.jsx.map