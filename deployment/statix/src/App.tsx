import { Route, Switch } from "wouter";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/:tenant" component={Dashboard} />
      <Route>
        <div className="center-page">
          <h1>404</h1>
          <a href="/">Return to Statix</a>
        </div>
      </Route>
    </Switch>
  );
}
