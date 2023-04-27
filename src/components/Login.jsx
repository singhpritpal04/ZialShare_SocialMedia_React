import React, { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import bgVideo from "../assets/green_particles.mp4";
import logo from "../assets/logo2.png"
import { client } from "../client";
import { GoogleOAuthProvider,GoogleLogin } from "@react-oauth/google";

export default function Login(){

  const navigate = useNavigate()
   const createOrGetuser = async (response) => {
     const decoded = jwt_decode(response.credential);
     localStorage.setItem("user", JSON.stringify(decoded));
     const { name, email, picture, sub } = decoded;
     const doc = {
       _id: sub,
       _type: "user",
       userName: name,
       image: picture,
     };

     client.createIfNotExists(doc).then(() => {
       navigate("/", { replace: true });
     });
   };
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src={bgVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />

          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width="130px" alt="logo" />
            </div>
            <div className="shadow-2xl ">
              <GoogleLogin
                onSuccess={(response) => createOrGetuser(response)}
                onError={() => console.log("Error")}
                cookiePolicy="single_host_origin"
              />

              {/* {user ? (<div>Logged In</div>)
                                : <GoogleLogin
                                    onSuccess={(response) => createOrGetuser(response)}
                                    onError={() => console.log('Error')}
                                />
                            } */}
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}