import React from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider, SuspenseWithPerf } from "reactfire";

import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
  apiKey: "AIzaSyDAcpOJhivHCS0GGD8opng4ujdXJ8_babk",
  authDomain: "diet-school.firebaseapp.com",
  databaseURL: "https://diet-school.firebaseio.com",
  projectId: "diet-school",
  storageBucket: "diet-school.appspot.com",
  messagingSenderId: "605118797037",
  appId: "1:605118797037:web:223a3393c646e3ea0428e4",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <SuspenseWithPerf
        fallback={<p>loading grades...</p>}
        traceId={"load-grades-status"}
      >
        <App />
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
