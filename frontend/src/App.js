import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuth from "./utils/requireAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './components/Alert/Alert.css';
import Loader from './components/Loader/Loader';
import Layout from './components/Layout';
const ChangeAddress = React.lazy(() => import('./components/pages/Profile/ChangeAddressPage/ChangeAddress'));
const ChangePassword = React.lazy(() => import('./components/pages/Profile/ChangePasswordPage/ChangePassword'));
const EditInfo = React.lazy(() => import('./components/pages/Profile/EditInfoPage/EditInformation'));
const Profile = React.lazy(() => import('./components/pages/Profile/Profile'));
const Order = React.lazy(() => import('./components/pages/Order/Order'));
const AdminPage = React.lazy(() => import('./components/pages/AdminPage/AdminPage'));
const ProductPage = React.lazy(() => import('./components/pages/Product/ProductPage'));
const ListProducts = React.lazy(() => import('./components/pages/Catalog/ListProducts'));
const Cart = React.lazy(() => import('./components/pages/Cart/Cart'));
const SignIn = React.lazy(() => import('./components/pages/SignIn/SignIn'));
const SignUpPage = React.lazy(() => import('./components/pages/SignUp/SignUpPage'));
const Service = React.lazy(() => import('./components/pages/Service/Service'));
const PersonalData = React.lazy(() => import('./components/pages/PersonalDataPage/PersonalData'));
const NotFound = React.lazy(() => import('./components/pages/NotFound/NotFound'));
const Discounts = React.lazy(() => import('./components/pages/Discounts/Discounts'));
const Search = React.lazy(() => import('./components/pages/Search/Search'));
const UserOrders = React.lazy(() => import('./components/pages/Profile/UserOrders/UserOrders'));
const News = React.lazy(() => import('./components/pages/News/News'));
const Home = React.lazy(() => import('./components/pages/Home/Home'));
const Reviews = React.lazy(() => import('./components/pages/ReviewPage/Reviews'));
const PublicOffer = React.lazy(() => import('./components/pages/PublicOfferPage/PublicOffer'));
const ConfirmEmail = React.lazy(() => import('./components/pages/ConfirmEmail/ConfirmEmail'));


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'show'
    }
  }
  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    window.onload = () => {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
      this.setState({ visible: 'hide' });
    }
  }
  render() {
    return (
      <section>
        <Loader visible={this.state.visible} />
        <Layout>
          <Suspense fallback={<div className='collapse'>Loading...</div>}>
            <Router>
              <Switch>
                <Route exact path='/' render={(props) => <Home {...props} />} />
                <Route exact path='/services' render={(props) => <Service {...props} />} />
                <Route exact path='/account/signup' render={(props) => <SignUpPage {...props} />} />
                <Route exact path='/account/signin' render={(props) => <SignIn {...props} />} />
                <Route exact path='/cart' render={(props) => <Cart {...props} />} />
                <Route exact path='/catalog/search/:gender?/:category?/:brand?/:size?/:color?/:price?/:name?'
                  render={(props) => <ListProducts {...props} />} />
                <Route exact path='/catalog/:gender/:category/:brand/p:id' render={(props) => <ProductPage {...props} />} />
                <Route exact path='/admin' render={(props) => <AdminPage {...props} />} />
                <Route exact path='/order' render={(props) => <Order {...props} />} />
                <Route exact path='/profile' component={requireAuth(Profile)} />
                <Route exact path='/profile/edit' component={requireAuth(EditInfo)} />
                <Route exact path='/profile/changepassword' component={requireAuth(ChangePassword)} />
                <Route exact path='/profile/ChangeAddress' component={requireAuth(ChangeAddress)} />
                <Route exact path='/profile/orders/:page?' component={requireAuth(UserOrders)} />
                <Route exact path='/news' render={(props) => <News {...props} />} />
                <Route exact path='/search/:name?' render={(props) => <Search {...props} />} />
                <Route exact path='/discounts' render={(props) => <Discounts {...props} />} />
                <Route exact path='/personal-data' render={(props) => <PersonalData {...props} />} />
                <Route exact path='/reviews' render={(props) => <Reviews {...props} />} />
                <Route exact path='/public-offer-agreement' render={(props) => <PublicOffer {...props} />} />
                <Route exact path='/confirmemail' render={(props) => <ConfirmEmail {...props} />} />
                <Route exact render={(props) => <NotFound {...props} />} />
              </Switch>
            </Router>
          </Suspense>
        </Layout >
      </section>
    );
  }
}
export default App;

