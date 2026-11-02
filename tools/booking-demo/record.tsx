// Recording entry: installs the virtual clock before the demo loads, so a
// recorder steps time one frame at a time (window.__stageshow.clock).
import { installVirtualClock } from '../kit/clock'

const params = new URLSearchParams(location.search)
installVirtualClock({ fps: Number(params.get('fps') || 30) })
const { mount } = await import('./preview')
await mount(params.get('name')!, false)
;(window as unknown as { __recordReady: boolean }).__recordReady = true
