// src/lib/utils.ts

// Fonction utilitaire pour concaténer les classes CSS conditionnellement
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}