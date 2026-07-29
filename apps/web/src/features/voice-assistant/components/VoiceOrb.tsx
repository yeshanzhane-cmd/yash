import type { OrbState } from "../types";
import "./VoiceOrb.css";

interface VoiceOrbProps {
  state: OrbState;
}

const STATE_LABELS: Record<OrbState, string> = {
  idle: "ALPHA X ONLINE",
  listening: "LISTENING",
  thinking: "PROCESSING",
  speaking: "RESPONDING"
};

export function VoiceOrb({ state }: VoiceOrbProps) {
  return (
    <div className="voice-orb-container" data-state={state}>
      <div className="voice-orb-ring voice-orb-ring--outer" />
      <div className="voice-orb-ring voice-orb-ring--inner" />
      <div className="voice-orb-core" />
      <p className="voice-orb-label">{STATE_LABELS[state]}</p>
    </div>
  );
}
