import { useState, useCallback } from 'react'
import { Card, CardHeader, CardTitle, Button, Badge, Modal } from '../../components/ui'
import { Plus, Play, Pause, Trash2, Settings, ChevronRight, Zap, Database, Globe, Mail, MessageSquare, Clock, GitBranch } from 'lucide-react'

const NODE_TYPES = [
  { type: 'trigger', label: 'Trigger', icon: Zap, color: 'bg-primary-500', description: 'Start the pipeline' },
  { type: 'condition', label: 'Condition', icon: GitBranch, color: 'bg-warning-500', description: 'Branch logic' },
  { type: 'action', label: 'Action', icon: Play, color: 'bg-success-500', description: 'Execute task' },
  { type: 'delay', label: 'Delay', icon: Clock, color: 'bg-secondary-500', description: 'Wait before next step' },
  { type: 'email', label: 'Send Email', icon: Mail, color: 'bg-primary-400', description: 'Send email notification' },
  { type: 'webhook', label: 'Webhook', icon: Globe, color: 'bg-neutral-500', description: 'HTTP request' },
  { type: 'database', label: 'Database', icon: Database, color: 'bg-secondary-400', description: 'Query or update data' },
  { type: 'message', label: 'Send Message', icon: MessageSquare, color: 'bg-success-500', description: 'Send chat message' },
]

const PIPELINES = [
  {
    id: 'lead-nurture',
    name: 'Lead Nurture',
    description: 'Automated lead follow-up sequence',
    status: 'active',
    runs: 234,
    lastRun: '2 hours ago',
    nodes: 5,
  },
  {
    id: 'payment-followup',
    name: 'Payment Follow-up',
    description: 'Post-payment confirmation and receipt',
    status: 'active',
    runs: 89,
    lastRun: '15 min ago',
    nodes: 3,
  },
  {
    id: 'welcome-series',
    name: 'Welcome Series',
    description: 'New user onboarding emails',
    status: 'paused',
    runs: 456,
    lastRun: '1 day ago',
    nodes: 7,
  },
]

const MOCK_NODES = [
  { id: '1', type: 'trigger', label: 'New Lead', x: 80, y: 200, connections: ['2'] },
  { id: '2', type: 'condition', label: 'Has Phone?', x: 280, y: 200, connections: ['3', '4'] },
  { id: '3', type: 'email', label: 'Send SMS', x: 480, y: 120, connections: ['5'] },
  { id: '4', type: 'email', label: 'Send Email', x: 480, y: 280, connections: ['5'] },
  { id: '5', type: 'delay', label: 'Wait 24h', x: 680, y: 200, connections: ['6'] },
  { id: '6', type: 'action', label: 'Follow Up', x: 880, y: 200, connections: [] },
]

export default function Pipeline() {
  const [selectedPipeline, setSelectedPipeline] = useState(PIPELINES[0])
  const [showNodePalette, setShowNodePalette] = useState(false)

  return (
    <div className="animate-fade-in">
      <div className="flex gap-6 h-[calc(100vh-8rem)]">
        {/* Pipeline List */}
        <div className="w-72 shrink-0 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-body font-semibold text-neutral-200">Pipelines</h3>
            <Button size="sm" variant="ghost">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto">
            {PIPELINES.map((pipeline) => (
              <button
                key={pipeline.id}
                onClick={() => setSelectedPipeline(pipeline)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selectedPipeline.id === pipeline.id
                    ? 'bg-primary-500/10 border-primary-500/30'
                    : 'bg-neutral-900/50 border-neutral-800/50 hover:border-neutral-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body-sm font-semibold text-neutral-200">{pipeline.name}</span>
                  <Badge
                    variant={pipeline.status === 'active' ? 'success' : 'default'}
                    size="sm"
                    dot
                  >
                    {pipeline.status}
                  </Badge>
                </div>
                <p className="text-caption text-neutral-500 mb-2">{pipeline.description}</p>
                <div className="flex items-center gap-3 text-micro text-neutral-600">
                  <span>{pipeline.nodes} nodes</span>
                  <span>{pipeline.runs} runs</span>
                  <span>{pipeline.lastRun}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle>{selectedPipeline.name}</CardTitle>
                  <Badge variant={selectedPipeline.status === 'active' ? 'success' : 'default'} dot>
                    {selectedPipeline.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </Button>
                  <Button size="sm" variant={selectedPipeline.status === 'active' ? 'secondary' : 'success'}>
                    {selectedPipeline.status === 'active' ? (
                      <><Pause className="w-4 h-4 mr-1" /> Pause</>
                    ) : (
                      <><Play className="w-4 h-4 mr-1" /> Activate</>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Node Canvas */}
            <div className="flex-1 rounded-xl border border-neutral-800/50 bg-neutral-900/30 relative overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />

              {/* Nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {MOCK_NODES.map((node) =>
                  node.connections.map((targetId) => {
                    const target = MOCK_NODES.find(n => n.id === targetId)
                    if (!target) return null
                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={node.x + 80}
                        y1={node.y + 30}
                        x2={target.x}
                        y2={target.y + 30}
                        stroke="rgba(99,102,241,0.3)"
                        strokeWidth="2"
                        strokeDasharray="6,4"
                      />
                    )
                  })
                )}
              </svg>

              {MOCK_NODES.map((node) => {
                const nodeType = NODE_TYPES.find(t => t.type === node.type)
                const Icon = nodeType?.icon || Zap
                return (
                  <div
                    key={node.id}
                    className="absolute group cursor-pointer"
                    style={{ left: node.x, top: node.y }}
                  >
                    <div className="w-40 p-3 rounded-xl bg-neutral-900 border border-neutral-700/50 shadow-lg hover:border-primary-500/50 hover:shadow-glow transition-all">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-6 h-6 rounded-md ${nodeType?.color || 'bg-neutral-500'} flex items-center justify-center`}>
                          <Icon className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-caption font-semibold text-neutral-200 truncate">{node.label}</span>
                      </div>
                      <p className="text-micro text-neutral-500">{nodeType?.description}</p>
                    </div>
                    {/* Connection points */}
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neutral-700 border-2 border-neutral-900 group-hover:bg-primary-500 transition-colors" />
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neutral-700 border-2 border-neutral-900 group-hover:bg-primary-500 transition-colors" />
                  </div>
                )
              })}

              {/* Add Node Button */}
              <button
                onClick={() => setShowNodePalette(true)}
                className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 hover:bg-primary-500/30 hover:border-primary-500/50 transition-all shadow-glow"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </Card>
        </div>

        {/* Node Palette (Right sidebar) */}
        <div className="w-56 shrink-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-body-sm">Add Node</CardTitle>
            </CardHeader>
            <div className="space-y-1.5">
              {NODE_TYPES.map((nodeType) => {
                const Icon = nodeType.icon
                return (
                  <button
                    key={nodeType.type}
                    className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left hover:bg-neutral-800/50 transition-colors group"
                  >
                    <div className={`w-7 h-7 rounded-md ${nodeType.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-caption font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors">{nodeType.label}</p>
                      <p className="text-micro text-neutral-600 truncate">{nodeType.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
