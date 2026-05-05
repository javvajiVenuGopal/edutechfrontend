import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  createCallSession,
  getCallToken,
  endCallAPI,
  startCallAPI
} from "../../../Service/callService";
import toast from "react-hot-toast";
import {
  joinVoiceCall,
  leaveVoiceCall
} from "../../../Service/agoraCall";

import {
  connectIncomingCallSocket
} from "../../../Service/callSocket";

import { creditCallEarning } from "../../../Apiroute";


function GuideCallPage() {

  const { booking_id } = useParams();

  const navigate = useNavigate();

  const [joined, setJoined] = useState(false);

  const ringtoneRef = useRef(null);
  const [callId, setCallId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const callEndedRef = useRef(false);
  const joinCall = async () => {

    await navigator.mediaDevices.getUserMedia({
      audio: true
    });

    const session = await createCallSession(booking_id);

setCallId(session.session_id);

  // ✅ VERY IMPORTANT
  await startCallAPI(booking_id);

    const tokenData =
      await getCallToken(booking_id);

    await joinVoiceCall(tokenData);
    setStartTime(Date.now());

    ringtoneRef.current?.pause();
if (ringtoneRef.current) {
  ringtoneRef.current.currentTime = 0;
}
    setJoined(true);
  };

const leaveCall = async () => {

  if (callEndedRef.current) return;

  callEndedRef.current = true;




  await leaveVoiceCall();

  if (!startTime) {
    await endCallAPI(booking_id);
    navigate("/call-history");
    return;
  }

  const endTime = Date.now();

  const durationSeconds = Math.floor((endTime - startTime) / 1000);

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  toast.success(`Call Duration: ${minutes} min ${seconds} sec ⏱️`);

  await endCallAPI(booking_id);

  try {
    if (callId) {
  await creditCallEarning(callId);
}
  } catch (err) {
    console.log("Wallet credit failed:", err);
  }

  navigate(`/feedback/${booking_id}`);
};


  useEffect(() => {

    ringtoneRef.current =
      new Audio("/ringtone.mp3");

    const guideId =
      Number(localStorage.getItem("user_id"));

    const socket =
      connectIncomingCallSocket(
        guideId,
        data => {

          if (data.type === "call_ended") {

  if (ringtoneRef.current) {

   ringtoneRef.current?.pause();
if (ringtoneRef.current) {
  ringtoneRef.current.currentTime = 0;
}

  }

  leaveCall();

}
        }
      );

    return () => socket?.close();

  }, []);

useEffect(() => {

  if (!joined) return;

  const timer = setTimeout(() => {

    leaveCall();

    toast("Call ended automatically after 15 minutes ⏱️");

  }, 15 * 60 * 1000);

  return () => clearTimeout(timer);

}, [joined]);
  return (

    <div className="flex flex-col items-center justify-center h-screen">

      <h1 className="text-3xl font-bold">
        Guide Call
      </h1>

      {!joined ? (

        <button
          onClick={joinCall}
          className="bg-green-500 text-white px-6 py-3 mt-6 rounded"
        >
          Start Call 📞
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

export default GuideCallPage;
