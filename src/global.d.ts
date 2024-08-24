interface Window {
  [k: string]: any
}

declare module '*?raw' {
  const text: string
  export default text
}

declare module '*?inline' {
  const text: string
  export default text
}

declare module '*?url' {
  const url: string
  export default url
}

declare module '*?svg' {
  import type { FC, SVGProps } from 'react'

  const svg: FC<SVGProps<SVGElement>>
  export default svg
}

declare namespace chrome.runtime {
  interface ManifestBase {
    content_scripts?:
      | {
        matches?: string[] | undefined
        exclude_matches?: string[] | undefined
        css?: string[] | undefined
        js?: string[] | undefined
        run_at?:
          | 'document_start'
          | 'document_end'
          | 'document_idle'
          | undefined
        all_frames?: boolean | undefined
        match_about_blank?: boolean | undefined
        include_globs?: string[] | undefined
        exclude_globs?: string[] | undefined
        world?: 'ISOLATED' | 'MAIN' | undefined
      }[]
      | undefined
  }
}
