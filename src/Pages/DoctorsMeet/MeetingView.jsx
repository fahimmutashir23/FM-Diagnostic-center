import { useMeeting } from "@videosdk.live/react-sdk";
import { useState } from "react";

const ParticipantView =() => {
    return null
}

const MeetingView = () => {
    const [joined, setJoined] = useState(null);

    const { join, participants } = useMeeting({
        onMeetingJoined: () => {
          setJoined("JOINED");
        }
      });

      const joinMeeting = () => {
        setJoined("JOINING");
        join();
      };

    return (
        <div className="container">
        {joined && joined == "JOINED" ? (
          <div>
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined && joined == "JOINING" ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join the meeting</button>
        )}
      </div>
    );
};

export default MeetingView;