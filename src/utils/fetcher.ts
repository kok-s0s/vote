const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ..._args: any[]
) => {
  const res = await fetch(input, init)
  return res.json()
}

export default fetcher
