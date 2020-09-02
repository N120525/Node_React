import React from "react";
import { googleSignIn, userLoginStatus } from "../../actions/action_signIn";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import axios from 'axios'
let SignIn = props => {
  const dispatch = useDispatch();
  let onGoogleSignInSuccess = res => {
    if (res) {
      axios.get(`http://localhost:5000/verify?token_id=${res.tokenId}`)
      .then(res =>{
        if(res && res.data){
          dispatch(userLoginStatus(true));
          dispatch(googleSignIn(res.data));
          props.history.push("/dashboard");
        }
      }).catch(err=>{
        props.history.push("/signin");
        console.log("err::",err)
      })
    }
  };
  let onGoogleSignInFailure = err => {
    if(err){
      props.history.push("/signin");
      console.log("err",err)
    }
  };
  return (
    <div>
      <div className="login_section">
        <h2 className="fist_head">welcome to SignIn page</h2>
        <h3 className="second_head">Click the Sign In button  </h3>
      </div>
      <div className="login_btn">
      <GoogleLogin
        clientId={process.env.CLIENT_ID}
        buttonText="Sign In"
        onSuccess={onGoogleSignInSuccess}
        onFailure={onGoogleSignInFailure}
        cookiePolicy={"single_host_origin"}
        className="google_login"
      />
      </div>
    </div>
  );
};

export default SignIn;
