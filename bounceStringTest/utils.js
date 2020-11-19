function blender(A, B, t) {
    if (t === 0) {
        return A;
    }

    if (t === 1) {
        return B;
    }

    return ((1 - t) * A) + (t * B);
}

function blend(x1, x2, y1, y2, t) {
    const x = blender(x1, x2, t);
    const y = blender(y1, y2, t);

    return { x, y };
}
export function getPosition(posA, posB, posC, t) {
    const posE = blend(posA.x, posB.x, posA.y, posB.y, t);
    const posF = blend(posB.x, posC.x, posB.y, posC.y, t);
    const posP = blend(posE.x, posF.x, posE.y, posF.y, t);
    const angle = Math.atan2((posF.x - posE.x), (posF.y - posE.y)) + 1.5 * Math.PI
    return { ...posP, angle }
}