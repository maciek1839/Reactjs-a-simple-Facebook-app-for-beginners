import {Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';
import {User} from '../types/user';
import {UserListPageContainer} from '../pages/UserListPage/UserListPageContainer';
import {ApplicationRoutePrefix} from './routes';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import {HomePageContainer} from '../pages/HomePage/HomePageContainer';

interface RoutingContentProps {
  topUsers: User[];
  isErrorDuringLoadingTopUsers: boolean;
  users: User[];
  isErrorDuringLoadingUsers: boolean;
}

const RoutingContent: React.FC<RoutingContentProps> = (props: RoutingContentProps) => (
  <Switch>
    <Switch>
      <Route path={'/' + ApplicationRoutePrefix.HOME}
             exact
             component={() => <HomePageContainer
               isErrorDuringLoading={props.isErrorDuringLoadingTopUsers}
               topUsers={props.topUsers}/>
             }/>
      <Route path={'/' + ApplicationRoutePrefix.USER_LIST}
             exact
             component={() => <UserListPageContainer
               isErrorDuringLoading={props.isErrorDuringLoadingUsers}
               users={props.users}/>
             }/>
      <Route path={'/' + ApplicationRoutePrefix.NOT_FOUND} component={NotFoundPage}/>
      <Redirect to={'/' + ApplicationRoutePrefix.NOT_FOUND}/>
    </Switch>
  </Switch>
);

export default RoutingContent;
