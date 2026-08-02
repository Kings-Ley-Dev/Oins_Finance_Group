import {
  ShieldCheck,
  Vault,
  Scissors,
  DoorOpen,
  StarHalf,
  UserPlus,
  ListChecks,
  TrendingUp,
  Wallet,
  Tractor,
  Fuel,
  Building2,
  Bitcoin,
  Cpu,
  Gem,
  CreditCard,
  HandCoins,
  Star,
  HelpCircle,
  CircleDollarSign,
  Users,
  LineChart,
} from "lucide-react";

const MAP = {
  CircleDollarSign,
  Users,
  LineChart,
  ShieldCheck,
  Vault,
  Scissors,
  DoorOpen,
  StarHalf,
  UserPlus,
  ListChecks,
  TrendingUp,
  Wallet,
  Tractor,
  Fuel,
  Building2,
  Bitcoin,
  Cpu,
  Gem,
  CreditCard,
  HandCoins,
  Star,
};

export default function Icon({ name, ...props }) {
  const Cmp = MAP[name] || HelpCircle;
  return <Cmp {...props} />;
}
