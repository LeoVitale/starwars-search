import React, { memo } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Search from 'containers/Search';
import Details from 'containers/Details';

import {
  MainContainer,
  AppContainer,
  BackgroundImage,
  GlobalStyle,
  Logo,
} from './styles';

const App = () => {
  return (
    <MainContainer>
      <GlobalStyle />
      <BackgroundImage />
      <AppContainer>
        <Logo src={`${process.env.PUBLIC_URL}/assets/images/Star_Wars_logo.svg`} />
        <Router>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/details/:id" component={Details} />
          </Switch>
        </Router>
      </AppContainer>
    </MainContainer>
  );
};

export default hot(module)(memo(App));
