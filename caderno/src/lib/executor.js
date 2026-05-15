import * as tf from '@tensorflow/tfjs';

function formatValue(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val instanceof tf.Tensor) {
    const shape = JSON.stringify(val.shape);
    const data  = JSON.stringify(val.arraySync(), null, 2);
    return `Tensor shape=${shape}\n${data}`;
  }
  if (Array.isArray(val)) return JSON.stringify(val, null, 2);
  if (typeof val === 'object') {
    try { return JSON.stringify(val, null, 2); } catch { return String(val); }
  }
  return String(val);
}

export async function executeCode(code) {
  const outputs = [];
  const capture = (...args) => outputs.push(args.map(formatValue).join(' '));

  const prev = console.log;
  console.log = capture;

  try {
    const fn = new Function('tf', 'print', `"use strict"; return (async()=>{ ${code} })()`);
    await fn(tf, capture);
    return { outputs, error: null };
  } catch (err) {
    return { outputs, error: err.message };
  } finally {
    console.log = prev;
  }
}
