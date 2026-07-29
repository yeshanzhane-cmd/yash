import {
  Box,
  Calendar,
  CheckCircle2,
  DollarSign,
  Eye,
  FileText,
  Globe,
  HelpCircle,
  type LucideIcon,
  MessageCircle,
  Network,
  PenLine,
  Rocket,
  Search,
  Send,
  Target,
  TrendingUp,
  User,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  eye: Eye,
  chess: Target,
  network: Network,
  search: Search,
  pencil: PenLine,
  send: Send,
  user: User,
  calendar: Calendar,
  dollar: DollarSign,
  question: HelpCircle,
  chat: MessageCircle,
  check: CheckCircle2,
  file: FileText,
  trending: TrendingUp,
  rocket: Rocket,
  cube: Box,
  globe: Globe,
};

export function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? Search;
}
