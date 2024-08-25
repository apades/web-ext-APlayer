import { log } from './log'

export default class MacrotaskWorker {
  private queue: string[] = []
  private timer: NodeJS.Timeout | null = null

  constructor(public fn: () => void) {
  }

  doWork(tag: string) {
    this.queue.push(tag)
    if (!this.timer) {
      this.timer = setTimeout(() => {
        log('events', this.queue)
        this.fn()
        this.queue.length = 0
        this.timer = null
      }, 0)
    }
  }
}
