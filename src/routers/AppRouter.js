import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Step1 from '../components/RegistrationForm/Step1';
import Step2 from '../components/RegistrationForm/Step2';
import Step3 from '../components/RegistrationForm/Step3';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Step1} exact/>
        <Route path="/step2" component={Step2} />
        <Route path="/step3" component={Step3} />
      </Switch>
    </BrowserRouter>
  );
}
