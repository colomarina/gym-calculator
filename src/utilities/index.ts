export enum GymEnum {
  COMERCIAL = "Comercial",
  POWERLIFTING = "Powerlifting",
}

const createMessage = (objeto: Record<string, number>) => {
  const discos = Object.entries(objeto)
    .map(
      ([peso, cantidad]) =>
        `${cantidad} disco${cantidad > 1 ? "s" : ""} de ${peso}`
    )
    .join(" y ");

  return `Deberías usar la barra de 20kg y ponerle por lado ${discos}.`;
};

export const calculateDiscs = (
  pesoTotal: number,
  tipoGimnasio: GymEnum = GymEnum.COMERCIAL
) => {
  // TODO: Pasar todo a ingles
  const pesoBarra = 20;
  let pesoDiscosTotal = pesoTotal - pesoBarra;

  if (pesoDiscosTotal < 0) {
    return "El peso total es inválido. Debe ser al menos 20kg.";
  }
  if (pesoDiscosTotal === 0) {
    return "No tenes que agregar peso ya que la barra pesa 20kg";
  }

  let pesoPorLado = pesoDiscosTotal / 2;
  let discos;

  if (tipoGimnasio === GymEnum.COMERCIAL) {
    discos = [20, 10, 5, 2.5];
  } else if (tipoGimnasio === GymEnum.POWERLIFTING) {
    discos = [25, 20, 15, 10, 5, 2.5, 1.25];
  } else {
    return "Tipo de gimnasio no válido. Usa 'comercial' o 'fuerza'.";
  }

  const resultado: { [key: string]: number } = {};

  for (let disco of discos) {
    const cantidad = Math.floor(pesoPorLado / disco);
    if (cantidad > 0) {
      resultado[disco + "kg"] = cantidad;
      pesoPorLado -= cantidad * disco;
    }
  }

  if (pesoPorLado > 0) {
    if (
      pesoPorLado % 1 !== 0 ||
      !discos.some((disco) => pesoPorLado % disco === 0)
    ) {
      return "No es posible alcanzar el peso deseado de manera simétrica con los discos disponibles.";
    }
  }
  return createMessage(resultado);
};
