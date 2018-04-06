import { mountWithTheme } from 'helpers/enzyme-context';
import { allFonts, fontsAsSpans, rockwellFonts } from './stories';
describe('Fonts', () => {
    it('All Fonts', () => expect(mountWithTheme(allFonts)).toMatchSnapshot());
    it('Rockwell Variants', () => expect(mountWithTheme(rockwellFonts)).toMatchSnapshot());
    it('Fonts as Spans', () => expect(mountWithTheme(fontsAsSpans)).toMatchSnapshot());
});
//# sourceMappingURL=stories.test.jsx.map