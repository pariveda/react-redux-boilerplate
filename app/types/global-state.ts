import { IState as IEntityState } from 'redux/entities/rdc.root';
import { IState as IInteractiveState } from 'redux/interactive/rdc.root';

interface IGlobalState {
  entities: IEntityState;
  interactive: IInteractiveState;
}

export default IGlobalState;
