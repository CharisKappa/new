interface ImageOptions {
  width?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
}

interface ImageDimensions {
  width: number
  height: number
}

class ImageService {
  private baseUrl: string
  private defaultOptions: ImageOptions = {
    width: 1200,
    quality: 90,
    format: 'webp'
  }

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
  }

  private getImagePath(src: string): string {
    if (src.startsWith('http')) {
      return src
    }
    return `${this.baseUrl}${src}`
  }

  optimize(src: string, options: Partial<ImageOptions> = {}): string {
    const path = this.getImagePath(src)
    const opts = { ...this.defaultOptions, ...options }

    if (path.startsWith('http')) {
      return path
    }

    // For local images, we'll use the public directory
    return path
  }

  async preload(srcs: string[]): Promise<void> {
    srcs.forEach(src => {
      const img = new Image()
      img.src = this.optimize(src)
    })
  }

  getPlaceholder(src: string): string {
    // Return a tiny placeholder or blur hash
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E`
  }

  async getDimensions(src: string): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        })
      }
      img.onerror = reject
      img.src = this.optimize(src)
    })
  }

  generateSrcSet(src: string, widths: number[]): string {
    return widths
      .map(w => `${this.optimize(src, { width: w })} ${w}w`)
      .join(', ')
  }
}

export const imageService = new ImageService()
export type { ImageOptions, ImageDimensions } 