import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PrivateRouter = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        // const baseUrl = `${window.location.origin}/auth/boxed-signin`;
        router.replace("/login"); // Redirect to login if no token is found
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default PrivateRouter;
