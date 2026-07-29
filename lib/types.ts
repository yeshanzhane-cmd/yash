export type DepartmentId = "ceo" | "marketing" | "sales" | "support" | "finance";

export type AgentMode = "autonomous" | "strategic" | "manual";

export type AgentStatus = "active" | "paused";

export type DecisionStatus = "pending" | "approved" | "rejected";

export interface Kpi {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}

export interface FlowStep {
  label: string;
  icon: string;
}

export interface Permission {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface Target {
  id: string;
  label: string;
  value: number;
  unit: string;
}

export interface Decision {
  id: string;
  agentId: DepartmentId;
  text: string;
  timestamp: string;
  status: DecisionStatus;
}

export interface AgentMeta {
  id: DepartmentId;
  name: string;
  departmentLabel: string;
  tagline: string;
  status: AgentStatus;
  mode: AgentMode;
  kpis: Kpi[];
  flow: FlowStep[];
  permissions: Permission[];
  targets: Target[];
}
