import { Global, css, useTheme } from '@emotion/react';
import emotionReset from 'emotion-reset';

export function GlobalStyle() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        ${emotionReset}
        html {
          box-sizing: border-box;
        }

        body {
          background: ${theme.color.background};
          margin: 0 auto;
        }
        a {
          text-decoration: none;
          color: #8e2ad6;
          border-bottom: 1px dotted;
        }
      `}
    />
  );
}
