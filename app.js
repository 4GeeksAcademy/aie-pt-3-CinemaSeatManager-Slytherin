const FILAS = 8;
const COLUMNAS = 10;

const sala = Array.from({ length: FILAS }, () => Array(COLUMNAS).fill(0));

const filaInput = document.getElementById("fila");
const columnaInput = document.getElementById("columna");
const salaDiv = document.getElementById("sala");
const mensaje = document.getElementById("mensaje");

const btnReservar = document.getElementById("btnReservar");
const btnLiberar = document.getElementById("btnLiberar");
const btnActualizar = document.getElementById("btnActualizar");

let asientoSeleccionado = { fila: null, columna: null };

function mostrarMensaje(texto) {
  if (mensaje) {
    mensaje.textContent = texto;
  }
}

function mostrarSala() {
  if (!salaDiv) {
    return;
  }

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
      const ocupado = sala[i][j] === 1;

      asiento.className = "asiento " + (ocupado ? "ocupado" : "libre");
      if (asientoSeleccionado.fila === i && asientoSeleccionado.columna === j) {
        asiento.className += " seleccionado";
      }

      asiento.textContent = ocupado ? "O" : "L";
      asiento.title = "Fila " + i + ", Columna " + j;
      asiento.addEventListener("click", () => {
        asientoSeleccionado = { fila: i, columna: j };

        if (filaInput) {
          filaInput.value = String(i);
        }

        if (columnaInput) {
          columnaInput.value = String(j);
        }

        mostrarMensaje("Asiento seleccionado: fila " + i + ", columna " + j);
        mostrarSala();
      });

      fila.appendChild(asiento);
    }

    salaDiv.appendChild(fila);
  }
}

function leerDatos() {
  const fila = Number(filaInput?.value);
  const columna = Number(columnaInput?.value);

  if (!Number.isInteger(fila) || !Number.isInteger(columna)) {
    return { error: "Debes escribir numeros" };
  }

  if (fila < 0 || fila >= FILAS || columna < 0 || columna >= COLUMNAS) {
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

if (btnReservar) {
  btnReservar.addEventListener("click", () => {
    const datos = leerDatos();
    if (datos.error) {
      mostrarMensaje(datos.error);
      return;
    }

    const resultado = reservarAsiento(datos.fila, datos.columna);
    asientoSeleccionado = { fila: datos.fila, columna: datos.columna };
    mostrarMensaje(resultado.msg);
    mostrarSala();
  });
}

if (btnLiberar) {
  btnLiberar.addEventListener("click", () => {
    const datos = leerDatos();
    if (datos.error) {
      mostrarMensaje(datos.error);
      return;
    }

    const resultado = liberarAsiento(datos.fila, datos.columna);
    asientoSeleccionado = { fila: datos.fila, columna: datos.columna };
    mostrarMensaje(resultado.msg);
    mostrarSala();
  });
}

if (btnActualizar) {
  btnActualizar.addEventListener("click", () => {
    mostrarSala();
    mostrarMensaje("Vista actualizada");
  });
}

mostrarSala();