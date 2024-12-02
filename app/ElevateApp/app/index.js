import { useEffect, useState } from "react";

import { Redirect } from "expo-router";
import db from "@/database/db";
import CreateAccount from "@/app/setup/welcome";
// import Loading from "@/components/Loading";

// we'll put all the commented code in when we have the backend setup
export default function App() {
  //   const [session, setSession] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true); // Default to true for initial load

  //   useEffect(() => {
  //     setIsLoading(true);

  //     db.auth.getSession().then(({ data: { session } }) => {
  //       setSession(session);
  //       setIsLoading(false);
  //     });

  //     const {
  //       data: { subscription },
  //     } = db.auth.onAuthStateChange((_event, session) => {
  //       setSession(session);
  //       setIsLoading(false);
  //     });

  //     return () => subscription.unsubscribe();
  //   }, []);

  //   if (session) {
  //     return <Redirect href="/tabs/feed/home" />;
  //   } else if (isLoading) {
  //     return <Loading />;
  //   } else {
  //     return <Login />;
  //   }
  //   return <Redirect href="/tabs/groupHome" />;
  return <CreateAccount />;
}
