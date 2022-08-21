import { handleFetchWithLogs, handleScheduledEvents } from './src'

export default {
  fetch: handleFetchWithLogs,
  scheduled: handleScheduledEvents,
}
