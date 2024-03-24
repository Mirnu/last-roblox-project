export function cancelThread(thread?: thread) {
	thread && coroutine.status(thread) === "suspended" && task.cancel(thread);
}

let id = 0;
export function getNewID() {
	id++;
	return id;
}
