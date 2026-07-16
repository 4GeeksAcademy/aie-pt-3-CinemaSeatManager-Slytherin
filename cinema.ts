/**
 * Inicializa una matriz de 8 filas x 10 columnas con todos los asientos libres (0).
 */
function inicializarSala(): number[][] {
    const filas = 8;
    const columnas = 10;
    const sala: number[][] = [];

    for (let i = 0; i < filas; i++) {
        sala[i] = [];
        for (let j = 0; j < columnas; j++) {
            sala[i][j] = 0; // 0 = libre
        }
    }

    return sala;
}

/**
 * Muestra el estado actual de la sala.
 * X = ocupado
 * L = libre
 */
function mostrarSala(sala: number[][]): void {
    console.log("Estado actual de la sala:");
    let encabezado = "    ";
    for (let c = 0; c < sala[0].length; c++) {
        encabezado += `${c} `;
    }
    console.log(encabezado);

    sala.forEach((fila, i) => {
        let filaStr = `${i} | `;
        fila.forEach(asiento => {
            filaStr += asiento === 1 ? "X " : "L ";
        });
        console.log(filaStr);
    });
}

/**
 * Intenta reservar un asiento.
 * Devuelve un mensaje indicando si la operación fue exitosa.
 */
function reservarAsiento(sala: number[][], fila: number, columna: number): string {
    if (fila < 0 || fila >= sala.length || columna < 0 || columna >= sala[0].length) {
        return "❌ Posición inválida.";
    }

    if (sala[fila][columna] === 1) {
        return `❌ El asiento (${fila}, ${columna}) ya está ocupado.`;
    }

    sala[fila][columna] = 1;
    return `✅ Reserva confirmada para el asiento (${fila}, ${columna}).`;
}

/**
 * Cuenta cuántos asientos están ocupados y cuántos libres.
 */
function contarAsientos(sala: number[][]): { ocupados: number; libres: number } {
    let ocupados = 0;

    sala.forEach(fila => {
        fila.forEach(asiento => {
            if (asiento === 1) ocupados++;
        });
    });

    const total = sala.length * sala[0].length;
    return { ocupados, libres: total - ocupados };
}

/**
 * Busca dos asientos contiguos libres en la misma fila.
 * Devuelve sus posiciones o un mensaje indicando que no hay disponibles.
 */
function buscarContiguos(sala: number[][]): string {
    for (let i = 0; i < sala.length; i++) {
        for (let j = 0; j < sala[i].length - 1; j++) {
            if (sala[i][j] === 0 && sala[i][j + 1] === 0) {
                return `🎉 Asientos contiguos libres encontrados en fila ${i}: (${i}, ${j}) y (${i}, ${j + 1}).`;
            }
        }
    }
    return "⚠️ No hay asientos contiguos disponibles.";
}