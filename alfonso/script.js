const FILAS = 8;
const COLUMNAS = 10;

const sala = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));

const filaInput = document.getElementById("fila");
const columnaInput = document.getElementById("columna");
const salaDiv = document.getElementById("sala");
const estadoDiv = document.getElementById("estado");
const totalLibres = document.getElementById("totalLibres");
const totalOcupados = document.getElementById("totalOcupados");

const btnReservar = document.getElementById("btnReservar");
const btnLiberar = document.getElementById("btnLiberar");
const btnActualizar = document.getElementById("btnActualizar");

let seleccionado = { fila: null, columna: null };

function mostrarEstado(msg) {
  estadoDiv.textContent = msg;
  estadoDiv.classList.remove("error");
}

function mostrarError(msg) {
  estadoDiv.textContent = msg;
  estadoDiv.classList.add("error");
}

function actualizarEstadisticas() {
  let ocupados = 0;

  for (let i = 0; i < FILAS; i++) {
    for (let j = 0; j < COLUMNAS; j++) {
      if (sala[i][j] === 1) {
        ocupados++;
      }
    }
  }

  const libres = FILAS * COLUMNAS - ocupados;
  totalLibres.textContent = String(libres);
  totalOcupados.textContent = String(ocupados);
}

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

      if (seleccionado.fila === i && seleccionado.columna === j) {
        asiento.className += " seleccionado";
      }

      asiento.textContent = sala[i][j] === 0 ? "L" : "O";
      asiento.title = "Fila " + i + ", Columna " + j;

      asiento.addEventListener("click", () => {
        seleccionado = { fila: i, columna: j };
        filaInput.value = i;
        columnaInput.value = j;
        mostrarEstado("Asiento seleccionado: fila " + i + ", columna " + j);
        mostrarSala();
      });

      fila.appendChild(asiento);
    }

    salaDiv.appendChild(fila);
  }

  actualizarEstadisticas();
}

function leerDatos() {
  const fila = Number(filaInput.value);
  const columna = Number(columnaInput.value);

  if (!Number.isInteger(fila) || !Number.isInteger(columna)) {
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
    mostrarError(datos.error);
    return;
  }

  const res = reservarAsiento(datos.fila, datos.columna);
  seleccionado = { fila: datos.fila, columna: datos.columna };
  mostrarEstado(res.msg);
  mostrarSala();
});

btnLiberar.addEventListener("click", () => {
  const datos = leerDatos();
  if (datos.error) {
    mostrarError(datos.error);
    return;
  }

  const res = liberarAsiento(datos.fila, datos.columna);
  seleccionado = { fila: datos.fila, columna: datos.columna };
  mostrarEstado(res.msg);
  mostrarSala();
});

btnActualizar.addEventListener("click", () => {
  mostrarSala();
  mostrarEstado("Vista actualizada");
});

mostrarSala();
