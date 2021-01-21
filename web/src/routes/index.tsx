import React from 'react';
import { Switch, Route as Router } from 'react-router-dom';
import {
  isMobile,
  isIOS,
  isAndroid,
  isChrome,
  isEdgeChromium,
} from 'react-device-detect';

import Route from './Route';
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
import Dashboard from '../pages/Dashboard/index';
import NewIncident from '../pages/NewIncident';
import UpdateIncident from '../pages/UpdateIncident';
import Profile from '../pages/Profile';
import ActiveOrRejectOngRegistration from '../pages/Adm/ActiveOrRejectOngRegistration';
import UnavailableOnMobileDevice from '../pages/UnavailableOnMobileDevice';
import RecoveryPassoword from '../pages/RecoveryPassword';

const Routes: React.FC = () => {
  if (isMobile || isAndroid || isIOS) {
    return <UnavailableOnMobileDevice />;
  }

  if (!(isEdgeChromium || isChrome)) {
    alert(
      'Recomendamos que você acesse nossa aplicação usando o Google Chrome ou Microsoft Edge para uma melhor experiência',
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/account" component={Profile} isPrivate />
      <Route path="/incidents/create" component={NewIncident} isPrivate />
      <Route
        path="/incidents/update/:incidentId"
        component={UpdateIncident}
        isPrivate
      />
      <Router
        path="/administration/account/permissions/:id"
        component={ActiveOrRejectOngRegistration}
      />
      <Router
        path="/account/password/recovery/:token"
        component={RecoveryPassoword}
      />
    </Switch>
  );
};
export default Routes;
