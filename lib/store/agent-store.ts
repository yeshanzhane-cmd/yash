"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AGENTS, INITIAL_DECISIONS } from "@/lib/data/agents";
import type {
  AgentMode,
  AgentStatus,
  Decision,
  DecisionStatus,
  DepartmentId,
  Permission,
  Target,
} from "@/lib/types";

interface AgentRuntimeState {
  status: AgentStatus;
  mode: AgentMode;
  permissions: Permission[];
  targets: Target[];
}

interface AgentStoreState {
  agents: Record<DepartmentId, AgentRuntimeState>;
  decisions: Decision[];
  setAgentStatus: (id: DepartmentId, status: AgentStatus) => void;
  setAgentMode: (id: DepartmentId, mode: AgentMode) => void;
  togglePermission: (id: DepartmentId, permissionId: string) => void;
  setTargetValue: (id: DepartmentId, targetId: string, value: number) => void;
  resolveDecision: (decisionId: string, status: DecisionStatus) => void;
}

function buildInitialAgents(): Record<DepartmentId, AgentRuntimeState> {
  const entries = Object.values(AGENTS).map((agent) => [
    agent.id,
    { status: agent.status, mode: agent.mode, permissions: agent.permissions, targets: agent.targets },
  ]);
  return Object.fromEntries(entries) as Record<DepartmentId, AgentRuntimeState>;
}

export const useAgentStore = create<AgentStoreState>()(
  persist(
    (set) => ({
      agents: buildInitialAgents(),
      decisions: INITIAL_DECISIONS,
      setAgentStatus: (id, status) =>
        set((state) => ({
          agents: { ...state.agents, [id]: { ...state.agents[id], status } },
        })),
      setAgentMode: (id, mode) =>
        set((state) => ({
          agents: { ...state.agents, [id]: { ...state.agents[id], mode } },
        })),
      togglePermission: (id, permissionId) =>
        set((state) => ({
          agents: {
            ...state.agents,
            [id]: {
              ...state.agents[id],
              permissions: state.agents[id].permissions.map((permission) =>
                permission.id === permissionId
                  ? { ...permission, enabled: !permission.enabled }
                  : permission
              ),
            },
          },
        })),
      setTargetValue: (id, targetId, value) =>
        set((state) => ({
          agents: {
            ...state.agents,
            [id]: {
              ...state.agents[id],
              targets: state.agents[id].targets.map((target) =>
                target.id === targetId ? { ...target, value } : target
              ),
            },
          },
        })),
      resolveDecision: (decisionId, status) =>
        set((state) => ({
          decisions: state.decisions.map((decision) =>
            decision.id === decisionId ? { ...decision, status } : decision
          ),
        })),
    }),
    { name: "alpha-x-agent-store" }
  )
);
