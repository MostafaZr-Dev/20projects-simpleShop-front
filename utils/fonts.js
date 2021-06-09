import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'vazir';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/assets/fonts/Vazir.ttf') format('truetype'), url('assets/fonts/Vazir.woff') format('woff');
        
      },
      @font-face {
        font-family: 'open-sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('/assets/fonts/OpenSans-Regular.ttf') format('truetype');
        
      }
      `}
  />
);

export default Fonts;
