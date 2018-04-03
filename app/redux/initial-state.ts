import IGlobalState from 'types/global-state';
import { initialState as entities } from './entities/rdc.root';
import { initialState as interactive } from './interactive/rdc.root';

const initialState: IGlobalState = {
  entities,
  interactive,
};

export default initialState;
