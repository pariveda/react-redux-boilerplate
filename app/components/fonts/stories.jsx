import safeStory from 'helpers/tests/safe-story';
import React from 'react';
import styled from 'styled-components';
import * as Fonts from 'components/fonts';
// display here should match the font varieties at
// https://amerisourcebergen.invisionapp.com/d/#/console/10874972/231750392/preview
const FontTable = styled.table `
  border: 1px solid gray;
`;
const FontTd = styled.td `
  border: 1px solid gray;
  padding: 10px;
`;
export const allFonts = (<FontTable>
    <tbody>
      <tr>
        <th>name</th>
        <th>component</th>
      </tr>
      <tr>
        <FontTd> Display 3 </FontTd>
        <FontTd> &lt;Fonts.Display3&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Display3>Display 3</Fonts.Display3>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Display 2 </FontTd>
        <FontTd> &lt;Fonts.Display2&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Display2>Display 2</Fonts.Display2>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Display 1 </FontTd>
        <FontTd> &lt;Fonts.Display1&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Display1>Display 1</Fonts.Display1>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> H1 </FontTd>
        <FontTd> &lt;Fonts.H1&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.H1>Header 1</Fonts.H1>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> H2 </FontTd>
        <FontTd> &lt;Fonts.H2&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.H2>Header 2</Fonts.H2>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> H3 </FontTd>
        <FontTd> &lt;Fonts.H3&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.H3>Header 3</Fonts.H3>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> H4 </FontTd>
        <FontTd> &lt;Fonts.H4&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.H4>Header 4</Fonts.H4>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Body 3 </FontTd>
        <FontTd> &lt;Fonts.Body3&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Body3>Body 3</Fonts.Body3>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Body 2 </FontTd>
        <FontTd> &lt;Fonts.Body2&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Body2>Body 2</Fonts.Body2>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Body 1 </FontTd>
        <FontTd> &lt;Fonts.Body1&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Body1>Body 1</Fonts.Body1>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Link 3 </FontTd>
        <FontTd> &lt;Fonts.Link3&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Link3>Link 3</Fonts.Link3>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Link 2 </FontTd>
        <FontTd> &lt;Fonts.Link2&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Link2>Link 2</Fonts.Link2>{' '}
        </FontTd>
      </tr>
      <tr>
        <FontTd> Link 1 </FontTd>
        <FontTd> &lt;Fonts.Link1&gt; </FontTd>
        <FontTd>
          {' '}
          <Fonts.Link1>Link 1</Fonts.Link1>{' '}
        </FontTd>
      </tr>
    </tbody>
  </FontTable>);
export const rockwellFonts = (<FontTable>
    <tbody>
      <tr>
        <th>name</th>
        <th>component</th>
        <th>Fonts.BoldnessLEvels.Light</th>
        <th>Fonts.BoldnessLEvels.Normal</th>
      </tr>
      <tr>
        <FontTd> Display 3 </FontTd>
        <FontTd> &lt;Fonts.Display3&gt; </FontTd>
        <FontTd>
          <Fonts.Display3 boldness={Fonts.BoldnessLevels.Light}>
            Display 3
          </Fonts.Display3>
        </FontTd>
        <FontTd>
          <Fonts.Display3 boldness={Fonts.BoldnessLevels.Normal}>
            Display 3
          </Fonts.Display3>
        </FontTd>
      </tr>
      <tr>
        <FontTd> Display 2 </FontTd>
        <FontTd> &lt;Fonts.Display2&gt; </FontTd>
        <FontTd>
          <Fonts.Display2 boldness={Fonts.BoldnessLevels.Light}>
            Display 2
          </Fonts.Display2>
        </FontTd>
        <FontTd>
          <Fonts.Display2 boldness={Fonts.BoldnessLevels.Normal}>
            Display 2
          </Fonts.Display2>
        </FontTd>
      </tr>
      <tr>
        <FontTd> Header 3 (H3) </FontTd>
        <FontTd> &lt;Fonts.H3&gt; </FontTd>
        <FontTd>
          <Fonts.H3 boldness={Fonts.BoldnessLevels.Light}>Header 3</Fonts.H3>
        </FontTd>
        <FontTd>
          <Fonts.H3 boldness={Fonts.BoldnessLevels.Normal}>Header 3</Fonts.H3>
        </FontTd>
      </tr>
    </tbody>
  </FontTable>);
export const fontsAsSpans = (<div>
    <Fonts.Body1 tag="span">The quick brown </Fonts.Body1>
    <Fonts.Body1 tag="span" boldness={Fonts.BoldnessLevels.Bold}>
      fox
    </Fonts.Body1>
    <Fonts.Body1 tag="span"> jumped over the lazy dog</Fonts.Body1>
  </div>);
safeStory('Fonts')
    .add('All fonts with variants', allFonts)
    .add('Rockwell boldness variants', rockwellFonts)
    .add('Fonts as spans', fontsAsSpans);
//# sourceMappingURL=stories.jsx.map