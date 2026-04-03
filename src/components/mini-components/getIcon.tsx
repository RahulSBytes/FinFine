import { Bus, Clapperboard, HeartPlus, Info, Salad, ShoppingCart, SquarePlus, Wallet, Zap } from "lucide-react";

const iconMap = {
    "Salary" : Wallet,
    "Food" : Salad,
    "Transport": Bus,
    "Shopping": ShoppingCart,
    "Utilities": Zap,
    "Entertainment" : Clapperboard,
    "Health" : HeartPlus,
    "Other":SquarePlus
}

export function getIcon(type: string) {
   const Icon = iconMap[type as keyof typeof iconMap] || Info;
  return <Icon/>
}