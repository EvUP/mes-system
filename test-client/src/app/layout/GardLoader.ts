import { LoaderFunction, redirect } from 'react-router-dom';
import { getCurrent } from '../../entities/user/model/authThunks';
import { store } from '../lib/store';

let currentUser = false;
let init = true;
export const GardLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  if (init) {
    init = false;
    try {
      await store.dispatch(getCurrent());
      const state = store.getState();
      const user = state.auth.user;
      currentUser = !!user;

      if (!user) {
        return redirect('/login');
      }

      return url.pathname === '/orders' || url.pathname === '/equipment'
        ? null
        : redirect('/orders');
    } catch (error) {
      console.error('Ошибка в gardLoader:', error);
      return redirect('/login');
    }
  }
  if (url.pathname === '') {
    return currentUser ? redirect('/order') : redirect('/login');
  }
};
