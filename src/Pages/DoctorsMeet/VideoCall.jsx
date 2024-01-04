
import {
  MeetingProvider,
} from "@videosdk.live/react-sdk";

function MeetingView() {
  return null;
}

const VideoCall = () => {
  return (
    <div>
      <MeetingProvider
        config={{
          meetingId: "kyg9-h52v-qtei",
          micEnabled: true,
          webcamEnabled: true,
          name: "Md's Org",
        }}
        token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIwNzk5MmY1Ny0yMzJmLTQzZTEtYWNlMS02MTA0NjlmOTZiNTUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMjQwNDE3OCwiZXhwIjoxNzAyNDkwNTc4fQ.W50PZhdVKhx3IQClIpLlpnn7rfd8zHJmF_5pkfzm4dc"
      >
        <MeetingView />
      </MeetingProvider>
    </div>
  );
};

export default VideoCall;
