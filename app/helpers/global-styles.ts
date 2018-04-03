import { blues, misc } from 'modules/config/colors';
import { normalize } from 'polished';
import { injectGlobal } from 'styled-components';

const injectGlobalStyles = (): void => {
  const workSans300File = '/static/fonts/work-sans-300-light-normal';
  const workSans400File = '/static/fonts/work-sans-400-regular-normal';
  const workSans500File = '/static/fonts/work-sans-500-medium-normal';
  const workSans600File = '/static/fonts/work-sans-600-semibold-normal';
  const workSans700File = '/static/fonts/work-sans-700-bold-normal';

  const rockwell400File = '/static/fonts/rockwell-300-normal';
  const rockwell300File = '/static/fonts/rockwell-400-normal';

  /* tslint:disable:no-unused-expression */
  injectGlobal`
    ${normalize()}

    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 300;
      src: url('${workSans300File}.woff2') format('woff2'),
          url('${workSans300File}.woff') format('woff'),
          url('${workSans300File}.ttf')  format('truetype'),
          url('${workSans300File}.svg#svgFontName') format('svg');
    }

    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 400;
      src: url('${workSans400File}.eot');
      src: url('${workSans400File}.eot?#iefix') format('embedded-opentype'),
          url('${workSans400File}.woff2') format('woff2'),
          url('${workSans400File}.woff') format('woff'),
          url('${workSans400File}.ttf')  format('truetype'),
          url('${workSans400File}.svg#svgFontName') format('svg');
    }

    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 500;
      src: url('${workSans500File}.eot');
      src: url('${workSans500File}.eot?#iefix') format('embedded-opentype'),
          url('${workSans500File}.woff2') format('woff2'),
          url('${workSans500File}.woff') format('woff'),
          url('${workSans500File}.ttf')  format('truetype'),
          url('${workSans500File}.svg#svgFontName') format('svg');
    }

    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 600;
      src: url('${workSans600File}.eot');
      src: url('${workSans600File}.eot?#iefix') format('embedded-opentype'),
          url('${workSans600File}.woff2') format('woff2'),
          url('${workSans600File}.woff') format('woff'),
          url('${workSans600File}.ttf')  format('truetype'),
          url('${workSans600File}.svg#svgFontName') format('svg');
    }

    @font-face {
      font-family: 'Work Sans';
      font-style: normal;
      font-weight: 700;
      src: url('${workSans700File}.eot');
      src: url('${workSans700File}.eot?#iefix') format('embedded-opentype'),
          url('${workSans700File}.woff2') format('woff2'),
          url('${workSans700File}.woff') format('woff'),
          url('${workSans700File}.ttf')  format('truetype'),
          url('${workSans700File}.svg#svgFontName') format('svg');
    }

    @font-face {
      font-family: 'Rockwell';
      font-style: normal;
      font-weight: 300;
      src: url('${rockwell300File}.eot');
      src: url('${rockwell300File}.eot?#iefix') format('embedded-opentype'),
          url('${rockwell300File}.woff2') format('woff2'),
          url('${rockwell300File}.woff') format('woff'),
          url('${rockwell300File}.ttf')  format('truetype'),
          url('${rockwell300File}.svg#svgFontName') format('svg');
    }

    @font-face {
      font-family: 'Rockwell';
      font-style: normal;
      font-weight: 400;
      src: url('${rockwell400File}.eot');
      src: url('${rockwell400File}.eot?#iefix') format('embedded-opentype'),
          url('${rockwell400File}.woff2') format('woff2'),
          url('${rockwell400File}.woff') format('woff'),
          url('${rockwell400File}.ttf')  format('truetype'),
          url('${rockwell400File}.svg#svgFontName') format('svg');
    }

    html {
      font-family: 'Work Sans';
    }

    /* sliding transition from bottom to top */
    .sliding-enter {
      transform: translate3d(0, 100%, 0);
    }

    .sliding-enter.sliding-enter-active {
      transform: translate3d(0, 0, 0);
      transition: all 300ms;
    }

    .sliding-leave {
      transform: translate3d(0, 0, 0);
      transition: all 300ms;
    }

    .sliding-leave.sliding-leave-active {
      transform: translate3d(0, 100%, 0);
    }

    /* sliding transition from left to right */
    .sliding-right-enter {
      transform: translate3d(-100%, 0, 0);
    }

    .sliding-right-enter.sliding-right-enter-active {
      transform: translate3d(0, 0, 0);
      transition: all 300ms;
    }

    .sliding-right-leave {
      transform: translate3d(0, 0, 0);
      transition: all 300ms;
    }

    .sliding-right-leave.sliding-right-leave-active {
      transform: translate3d(-100%, 0, 0);
    }

    /* fading transition */
    .fade-leave {
      opacity: 1;
    }

    .fade-leave.fade-leave-active {
      opacity: 0.01;
      transition: opacity 300ms ease-in;
    }

    /* slide transition where children expand down
        From: https://codepen.io/cotttpan/pen/JGzwVq
    */
    .slide-enter {
      max-height : 0;
      transition : max-height .2s cubic-bezier(.4,0,.2,1);
    }

    .slide-enter.slide-enter-active {
      max-height : 1000px;
    }

    .slide-leave {
      max-height : 1000px;
      transition : max-height .2s cubic-bezier(.4,0,.2,1);
    }

    .slide-leave.slide-leave-active {
      max-height : 0;
    }

    .sortable {
      background-color: ${blues.brandLightBlue};
      color: ${misc.white};
      path {
        opacity: 0.4;
      }
    }
  `;
};

const GlobalStyles = {
  injectGlobalStyles,
};

export default GlobalStyles;
