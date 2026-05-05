import React, { useEffect, useState, useRef } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8"
});

export default function CallPage() {

  const navigate = useNavigate();
  const { bookingId } = useParams();

  const [joined, setJoined] = useState(false);
  const [micTrack, setMicTrack] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);


  // ================= FORMAT TIME =================
  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };


  // ================= JOIN CALL =================
  async function joinCall() {

    setIsConnecting(true);

    try {

      const track =
        await AgoraRTC.createMicrophoneAudioTrack();

      setMicTrack(track);

      setJoined(true);

      toast.success("Call started successfully");

    } catch (err) {

      console.error("Unable to join call:", err);

      toast.error(
        "Unable to join call. Please check microphone permissions."
      );

    } finally {

      setIsConnecting(false);

    }

  }


  // ================= SAVE HISTORY =================
  function saveCallHistory(durationSeconds) {

    const history =
      JSON.parse(localStorage.getItem("callHistory")) || [];

    history.unshift({

      id: Date.now(),

      student: "Dummy Student",

      time: new Date().toLocaleString(),

      duration: Math.floor(durationSeconds / 60),

      durationSeconds,

      status: "Completed",

      rating: 0

    });

    localStorage.setItem(
      "callHistory",
      JSON.stringify(history)
    );

  }


  // ================= LEAVE CALL =================
  async function leaveCall() {

    setIsLeaving(true);

    if (micTrack) {

      micTrack.stop();
      micTrack.close();

    }

    saveCallHistory(timer);

    if (intervalRef.current)
      clearInterval(intervalRef.current);

    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);

    setJoined(false);
    setTimer(0);
    setIsLeaving(false);

    console.log("Call ended successfully");

    // ✅ Redirect to feedback page
    navigate(`/feedback/${bookingId}`);

  }


  // ================= TIMER =================
  useEffect(() => {

    if (joined) {

      intervalRef.current = setInterval(() => {

        setTimer(prev => prev + 1);

      }, 1000);


      timeoutRef.current = setTimeout(() => {

        if (joined)
          leaveCall();

      }, 15 * 60 * 1000);

    }


    return () => {

      if (intervalRef.current)
        clearInterval(intervalRef.current);

      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);

    };

  }, [joined]);


  // ================= REMOTE AUDIO =================
  useEffect(() => {

    client.on(
      "user-published",
      async (user, mediaType) => {

        await client.subscribe(user, mediaType);

        if (mediaType === "audio")
          user.audioTrack.play();

      }
    );

  }, []);


  return (

    <div className="min-h-screen flex items-center justify-center bg-[#fffbed]">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl text-center">

        <h1 className="text-2xl font-bold mb-4">
          Voice Consultation
        </h1>


        <div className="text-4xl font-mono text-orange-500 mb-6">

          {formatTime(timer)}

        </div>


        {!joined ? (

          <button

            onClick={joinCall}

            disabled={isConnecting}

            className="bg-orange-500 text-white px-6 py-3 rounded-lg"

          >

            {isConnecting
              ? "Connecting..."
              : "Start Call"}

          </button>

        ) : (

          <button

            onClick={leaveCall}

            disabled={isLeaving}

            className="bg-red-500 text-white px-6 py-3 rounded-lg"

          >

            {isLeaving
              ? "Ending..."
              : "End Call"}

          </button>

        )}

      </div>

    </div>

  );

}