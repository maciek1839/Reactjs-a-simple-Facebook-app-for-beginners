import {Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';
import {User} from '../types/user';
import {InitPageContainer} from '../pages/InitPage/InitPageContainer';
import {UserListPageContainer} from '../pages/UserListPage/UserListPageContainer';
import {ApplicationRoutePrefix} from './routes';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

interface RoutingContentProps {
  topUsers: User[];
  users: User[];
}

const RoutingContent: React.FC<RoutingContentProps> = (props: RoutingContentProps) => (
  <Switch>
    <Switch>
      <Route path={'/' + ApplicationRoutePrefix.HOME}
             exact
             component={() => <InitPageContainer topUsers={props.topUsers}/>}/>
      <Route path={'/' + ApplicationRoutePrefix.USER_LIST}
             exact
             component={() => <UserListPageContainer users={props.users}/>}/>
      <Route path={'/' + ApplicationRoutePrefix.NOT_FOUND} component={NotFoundPage}/>
      <Redirect to={'/' + ApplicationRoutePrefix.NOT_FOUND}/>
    </Switch>
  </Switch>
);

export default RoutingContent;
