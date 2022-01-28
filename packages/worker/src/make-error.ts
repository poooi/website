export const makeErrorMessage = (message: string) =>
  JSON.stringify({
    erorr: true,
    message,
  })
