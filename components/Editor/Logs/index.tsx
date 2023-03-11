import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
import { deployment_state } from '@prisma/client'

import { Log } from 'db/types'
import Sidebar from 'components/Sidebar'
import Text from 'components/Text'

import DeployButton from './DeployButton'

export interface Props {
  logs?: Log[]
  deploy: () => void
  deployedURL?: string | null
  deployStatus?: deployment_state | null
  isInitializingDeploy?: boolean
}

function Logs({
  logs,
  deploy,
  deployedURL,
  deployStatus,
  isInitializingDeploy,
}: Props) {

  useEffect(function highlightCode() {
    hljs.highlightAll()
  }, [logs])

  return (
    <Sidebar
      side={Sidebar.side.Right}
      className="
        flex-col
        min-h-0
        flex
        "
    >
      <div
        className="
        flex
        px-4
        py-2
        justify-start
        border-b
        flex-col
      "
      >
        <div
          className="
            flex
            flex-1
            items-center
            justify-between
          "
        >
          <Text
            text="Deployment"
            className="font-medium"
            size={Text.size.S2}
          />
          <DeployButton
            deploy={deploy}
            isInitializingDeploy={isInitializingDeploy}
            deployStatus={deployStatus}
          />
        </div>
        {deployedURL &&
          <a
            href={deployedURL}
            className="
            underline
          "
          >
            <Text
              size={Text.size.S3}
              text={deployedURL.substring('https://'.length)}
            />
          </a>
        }
        {!deployedURL &&
          <Text
            text="No deployment URL found"
            size={Text.size.S3}
            className="text-slate-400"
          />
        }
      </div>
      <div
        className="
      max-w-full
      flex
      flex-col
      flex-1
      py-4
      px-4
      overflow-auto
      text-xs
      tracking-wide
      font-sans
      break-words
      space-y-4
      ">
        {logs?.map((l, i) =>
          <ReactMarkdown key={i}>
            {l}
          </ReactMarkdown>
        )}
      </div>
    </Sidebar>
  )
}

export default Logs