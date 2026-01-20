export type Requisitos = {
  cpu?: string;
  ram?: string;
  so?: string;
  gpu?: string;
  disco?: string;
  directX?: string;
  notas?: string;
};

export type FichaTecnica = {
  plataformas?: string;
  desarrollador?: string;
  editor?: string;
  requisitos_minimos?: Requisitos;
  requisitos_recomendados?: Requisitos;
  sinopsis?: string;
};

export type Opinion = {
  historia?: string;
  logros?: string;
  mecanicas?: string;
  conclusiones?: string;
};

export type Recurso = {
  tipo: "video" | "artículo" | string;
  enlace?: string;
  autor?: string;
  titulo?: string;
  snippet?: string;
  imagen?: string;
};

export type EnlaceCompra = {
  plataforma: string;
  enlace: string;
};

export type Review = {
  id: string;
  titulo: string;
  imagen?: string;
  ficha_tecnica?: FichaTecnica;
  opinion?: Opinion;
  recursos?: Recurso[];
  enlaces_compra?: EnlaceCompra[];
};
