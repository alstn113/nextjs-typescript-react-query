import styled from '@emotion/styled';
import Link from 'next/link';
import { ReactChild } from 'react';

interface Props {
  children: ReactChild;
}

function LayoutComponent(props: Props) {
  return (
    <>
      <HomeHeader>
        <Header>
          <div className="notification">
            <Link href="/notification">
              <a>Notification</a>
            </Link>
          </div>
          <div className="links">
            <Link href="/search">
              <a>Search</a>
            </Link>
            <Link href="/more">
              <a>More</a>
            </Link>
          </div>
        </Header>
        <TapWrapper></TapWrapper>
      </HomeHeader>

      <HomePage>
        <div className="container">{props.children}</div>
      </HomePage>
    </>
  );
}

export default LayoutComponent;

export const HomeHeader = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 136px;
  background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;
export const Header = styled('div')`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  .links {
    margin-left: auto;
    a + a {
      margin-left: 20px;
    }
  }
  background-color: gray;
`;

export const TapWrapper = styled('div')`
  height: 82px;
  background-color: blue;
  .swiper {
    display: flex;
    height: 36px;
    max-width: 1024px;
    text-align: center;
  }
`;
export const HomePage = styled('div')`
  padding-top: 136px;

  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: red;
  }
`;
