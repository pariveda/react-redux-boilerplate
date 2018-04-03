import { DispatchProp as GenericDispatchProp } from 'react-redux';

import IGlobalState from 'types/global-state';

type IDispatchProp = GenericDispatchProp<IGlobalState>;

export default IDispatchProp;
