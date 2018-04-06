import 'core-js/es7/object'; // tslint:disable-line no-submodule-imports
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import 'raf/polyfill'; // tslint:disable-line no-submodule-imports
configure({ adapter: new Adapter() });
// fail tests for console warning and errors
const throwErrorFn = jest.fn(error => {
    throw new Error(error);
});
console.warn = throwErrorFn;
console.error = throwErrorFn;
//# sourceMappingURL=setupTest.js.map