const { getBuffer, plus100, EmptyClass } = require('./index')

class JsEmptyClass {}

function runGc() {
  for (let i = 0; i < 5; i++) {
    global.gc()
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sleepAndGc(ms) {
  await sleep(ms)
  runGc()
}

async function testClass(name, cls) {
  const startMem = process.memoryUsage()

  for (let i = 0; i < 1_000_000; i++) {
    const x = new cls()

    if (i % 5000 === 0) {
      await sleep(10)
    }
  }

  const endMem = process.memoryUsage()

  const heapDiff = endMem.heapUsed - startMem.heapUsed
  const rssDiff = endMem.rss - startMem.rss
  console.log(name)
  console.log('Heap diff:', heapDiff.toLocaleString())
  console.log('Rss diff:', rssDiff.toLocaleString())
  console.log('')
}

async function testBuffer() {
  const startMem = process.memoryUsage()

  for (let i = 0; i < 1_000_000; i++) {
    const x = getBuffer()

    if (i % 5000 === 0) {
      await sleep(10)
    }
  }

  const endMem = process.memoryUsage()

  const heapDiff = endMem.heapUsed - startMem.heapUsed
  const rssDiff = endMem.rss - startMem.rss
  console.log('getBuffer')
  console.log('Heap diff:', heapDiff.toLocaleString())
  console.log('Rss diff:', rssDiff.toLocaleString())
  console.log('')
}

// JS class
// void testClass('JS', JsEmptyClass)

// Rust class
void testClass('Rust', EmptyClass)

// Test buffer
// void testBuffer()

console.assert(plus100(0) === 100, 'Simple test failed')

console.info('Simple test passed')
