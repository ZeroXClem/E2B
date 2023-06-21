import AgentLogFilesList from 'components/AgentLogFilesList'
import { projects } from 'db/prisma'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { LiteDeployment, LiteLogUpload } from 'utils/agentLogs'
import AgentDeploymentLogList from './AgentDeploymentLogList'

export interface Props {
  projects: (projects & { log_uploads: LiteLogUpload[], deployments: LiteDeployment[] })[]
  defaultProjectID: string
  view: 'deployments' | 'logs'
}

function DashboardHome({
  projects,
  defaultProjectID,
  view,
}: Props) {
  const router = useRouter()
  const showView = router.query['view'] === 'logs' ? 'logs' : view

  const projectsWithDeployments = useMemo(() => projects
    .filter(p => {
      if (p.deployments.length !== 1) return false

      const deployment = p.deployments[0]
      const auth = deployment.auth as any
      if (!auth) return false
      return true
    })
    .map(p => ({
      project: p,
      deployment: p.deployments[0],
    })), [projects])

  return (
    <>
      {showView === 'deployments' &&
        <AgentDeploymentLogList
          deployments={projectsWithDeployments.flatMap(p => p.deployment)}
        />
      }
      {showView === 'logs' &&
        <AgentLogFilesList
          logUploads={projects.flatMap(p => p.log_uploads)}
          defaultProjectID={defaultProjectID}
        />
      }
    </>
  )
}

export default DashboardHome