export interface User {
  naam: string;
  foto: string;
  rol: Rol;
}

export enum Rol {
  'begeleider',
  'cliënt',
  'stagiair',
  'vrijwilliger'
}
