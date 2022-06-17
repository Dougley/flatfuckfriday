export interface MemegenAPICall {
  template: string,
  top?: string,
  bottom?: string,
  extension?: 'png' | 'jpg' | 'gif',
  width?: number,
  height?: number,
  style?: string,
  customBackground?: string,
}

export function generate (params: MemegenAPICall) {
  const url = `https://api.memegen.link/images/${params.template}/${params.top ?? '_'}/${params.bottom ?? '_'}.${params.extension ?? 'png'}`
  const query = new URLSearchParams()
  if (params.width) query.append('width', params.width.toString())
  if (params.height) query.append('height', params.height.toString())
  if (params.style) query.append('style', params.style)
  if (params.customBackground) query.append('background', params.customBackground)
  return url + '?' + query.toString()
}
