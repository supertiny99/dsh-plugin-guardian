/**
 * dsh-plugin-guardian · 全局操作排他锁 (mutex.js)
 *
 * 职责：
 * 1. 串行化对 Profile (package.json / snapshots) 的写操作；
 * 2. 避免前端快速连击导致 Windows EBUSY / EPERM 文件占用冲突；
 * 3. 超时自愈（默认 60s 强制释放），防止意外死锁。
 */

export class OperationMutex {
	constructor() {
		this._locked = false;
		this._currentTask = null;
		this._timer = null;
	}

	/**
	 * 当前是否处于繁忙锁定状态
	 */
	isBusy() {
		return this._locked;
	}

	/**
	 * 获取当前执行的任务名称
	 */
	getCurrentTask() {
		return this._currentTask;
	}

	/**
	 * 执行排他性事务操作
	 * @param {string} taskName 任务名称
	 * @param {() => Promise<T>} action 异步操作
	 * @param {number} timeoutMs 超时时间（毫秒），默认 60s
	 * @returns {Promise<T>}
	 */
	async runExclusive(taskName, action, timeoutMs = 60000) {
		if (this._locked) {
			const err = new Error(`当前正在执行 [${this._currentTask || '另一项任务'}]，请稍候再试`);
			err.code = 'OPERATION_LOCKED';
			throw err;
		}

		this._locked = true;
		this._currentTask = taskName;

		this._timer = setTimeout(() => {
			if (this._locked) {
				console.warn(`[plugin-guardian][Mutex] 任务 [${taskName}] 超时 (${timeoutMs}ms) 强制释放锁`);
				this._locked = false;
				this._currentTask = null;
			}
		}, timeoutMs);

		try {
			return await action();
		} finally {
			if (this._timer) {
				clearTimeout(this._timer);
				this._timer = null;
			}
			this._locked = false;
			this._currentTask = null;
		}
	}
}

export const globalActionMutex = new OperationMutex();
