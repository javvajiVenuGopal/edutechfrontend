import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {

  getCallToken,
  endCallAPI 
} from "../../../Service/callService";

import {
  joinVoiceCall,
  leaveVoiceCall
} from "../../../Service/agoraCall";

import {
  connectIncomingCallSocket
} from "../../../Service/callSocket";
import toast from "react-hot-toast";

function SeekerCallPage() {

  const { booking_id } = useParams();

  const navigate = useNavigate();

  const [joined, setJoined] = useState(false);

  const ringtoneRef = useRef(null);
  const [startTime, setStartTime] = useState(null);
  const callEndedRef = useRef(false);

 const joinCall = async () => {

  if (ringtoneRef.current) {
    
    ringtoneRef.current?.pause();
ringtoneRef.current && (ringtoneRef.current.currentTime = 0);
  }

  await navigator.mediaDevices.getUserMedia({
    audio: true
  });

 

  const tokenData =
    await getCallToken(booking_id);

  await joinVoiceCall(tokenData);

  setStartTime(Date.now());

  setJoined(true);
};


 const leaveCall = async () => {

  if (callEndedRef.current) return;

  callEndedRef.current = true;

  await leaveVoiceCall();

  if (!startTime) {
    await endCallAPI(booking_id);
    navigate(`/rating/${booking_id}`);
    return;
  }

  const endTime = Date.now();

  const durationSeconds = Math.floor((endTime - startTime) / 1000);

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  toast.success(`Call Duration: ${minutes} min ${seconds} sec ⏱️`);

  await endCallAPI(booking_id);

  navigate(`/rating/${booking_id}`);
};


useEffect(() => {

  ringtoneRef.current = new Audio("/ringtone.mp3");

  const seekerId = Number(localStorage.getItem("user_id"));

  const socket = connectIncomingCallSocket(
    seekerId,
    (data) => {

      if (data.type === "incoming_call") {

        if (Number(data.booking_id) !== Number(booking_id)) {
          navigate(`/seeker-call/${data.booking_id}`);
          return;
        }

        ringtoneRef.current?.play().catch(() => {});

      }

      if (data.type === "call_ended") {

        ringtoneRef.current?.pause();

        if (ringtoneRef.current) {
          ringtoneRef.current.currentTime = 0;
        }

        leaveCall();

      }

    }
  );

  return () => socket?.close();

}, [booking_id]);
  useEffect(() => {

  if (!joined) return;

  const timer = setTimeout(() => {

    leaveCall();

    toast("Call ended automatically after 15 minutes ⏱️");

  }, 15 * 60 * 1000);

  return () => clearTimeout(timer);

}, [joined]);
useEffect(() => {

  if (!joined && ringtoneRef.current) {

    ringtoneRef.current.loop = true;

    ringtoneRef.current.play().catch(() => {});

  }

}, []);


  return (

    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-3xl font-bold">
        Consultation Call
      </h1>

      {!joined ? (

        <button
          onClick={joinCall}
          className="bg-green-500 text-white px-6 py-3 mt-6 rounded"
        >
          Join Call
        </button>

      ) : (

        <button
          onClick={leaveCall}
          className="bg-red-500 text-white px-6 py-3 mt-6 rounded"
        >
          End Call
        </button>

      )}

    </div>
  );
}

export default SeekerCallPage;
