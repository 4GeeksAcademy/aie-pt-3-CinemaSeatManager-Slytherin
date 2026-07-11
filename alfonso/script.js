const FILAS = 8;
const COLUMNAS = 10;

const sala = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));

const filaInput = document.getElementById("fila");
const columnaInput = document.getElementById("columna");
const salaDiv = document.getElementById("sala");

const btnReservar = document.getElementById("btnReservar");
const btnLiberar = document.getElementById("btnLiberar");

function mostrarSala() {
  salaDiv.innerHTML = "";

  for (let i = 0; i < FILAS; i++) {
    const fila = document.createElement("div");
    fila.className = "fila";

    const numeroFila = document.createElement("span");
    numeroFila.className = "numero-fila";
    numeroFila.textContent = i + ":";
    fila.appendChild(numeroFila);

    for (let j = 0; j < COLUMNAS; j++) {
      const asiento = document.createElement("span");
      asiento.className = "asiento " + (sala[i][j] === 0 ? "libre" : "ocupado");
      asiento.textContent = sala[i][j] === 0 ? "L" : "O";
      fila.appendChild(asiento);
    }

    salaDiv.appendChild(fila);
  }
}

function leerDatos() {
  const fila = Number(filaInput.value);
  const columna = Number(columnaInput.value);

  if (Number.isNaN(fila) || Number.isNaN(columna)) {
    return { error: "Debes escribir numeros" };
  }

  if (fila < 0 || fila > 7 || columna < 0 || columna > 9) {
    return { error: "Asiento fuera de rango" };
  }

  return { fila, columna };
}

function reservarAsiento(fila, columna) {
  if (sala[fila][columna] === 1) {
    return { ok: false, msg: "Ese asiento ya esta ocupado" };
  }

  sala[fila][columna] = 1;
  return { ok: true, msg: "Reserva hecha" };
}

function liberarAsiento(fila, columna) {
  if (sala[fila][columna] === 0) {
    return { ok: false, msg: "Ese asiento ya estaba libre" };
  }

  sala[fila][columna] = 0;
  return { ok: true, msg: "Asiento liberado" };
}

btnReservar.addEventListener("click", () => {
  const datos = leerDatos();
  if (datos.error) {
    alert(datos.error);
    return;
  }

  const res = reservarAsiento(datos.fila, datos.columna);
  alert(res.msg);
  mostrarSala();
});

btnLiberar.addEventListener("click", () => {
  const datos = leerDatos();
  if (datos.error) {
    alert(datos.error);
    return;
  }

  const res = liberarAsiento(datos.fila, datos.columna);
  alert(res.msg);
  mostrarSala();
});

mostrarSala();
