import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  roles?: string[];
}

export default function PrivateRoute({ component: Component, roles, ...rest }: Props) {
  const { user } = useAppSelector(state => state.account);
  return (
    <Route {...rest} render={props => {
      if (!user) {
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }
      // sadece admin ürün ekleme yapıyor user yapmıyor.
      if (roles && !roles?.some(r => user.roles?.includes(r))) {
        toast.error('Yetkili değilsiniz izniniz yok');
        return <Redirect to={{ pathname: "/category" }} />
      }

      return <Component {...props} />
    }}
    />
  );
}