import { Card, CardHeader, CardTitle, CardContent, Badge, ScoreRing, ProgressBar } from '../../components/ui'
import { TrendingUp, MessageSquare, Users, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const STATS = [
  { label: 'Total Conversations', value: '12,847', change: '+18%', up: true, icon: MessageSquare, color: 'primary' },
  { label: 'Leads Captured', value: '1,293', change: '+24%', up: true, icon: Users, color: 'success' },
  { label: 'Conversion Rate', value: '8.4%', change: '+2.1%', up: true, icon: TrendingUp, color: 'secondary' },
  { label: 'Active Pages', value: '6', change: '-1', up: false, icon: Zap, color: 'warning' },
]

const RECENT_ACTIVITY = [
  { type: 'lead', message: 'New lead captured from pricing page', time: '2 min ago', badge: 'primary' },
  { type: 'conversion', message: 'Payment received: Pro Plan ($19)', time: '15 min ago', badge: 'success' },
  { type: 'system', message: 'SEO audit completed for homepage', time: '1 hour ago', badge: 'default' },
  { type: 'lead', message: 'New lead from WhatsApp integration', time: '2 hours ago', badge: 'primary' },
  { type: 'system', message: 'Pipeline "Lead Nurture" executed 23 times', time: '3 hours ago', badge: 'secondary' },
  { type: 'conversion', message: 'Payment received: Business Plan ($49)', time: '5 hours ago', badge: 'success' },
]

const TOP_PAGES = [
  { name: '/pricing', conversations: 4823, conversion: '12.3%' },
  { name: '/demo', conversations: 3291, conversion: '9.8%' },
  { name: '/contact', conversations: 2184, conversion: '15.2%' },
  { name: '/features', conversations: 1847, conversion: '6.1%' },
  { name: '/blog', conversations: 702, conversion: '3.4%' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} hover glow>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-caption text-neutral-500 font-medium">{stat.label}</p>
                  <p className="text-h3 font-bold text-neutral-100 mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  stat.color === 'primary' ? 'bg-primary-500/10' :
                  stat.color === 'success' ? 'bg-success-500/10' :
                  stat.color === 'secondary' ? 'bg-secondary-500/10' :
                  'bg-warning-500/10'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    stat.color === 'primary' ? 'text-primary-400' :
                    stat.color === 'success' ? 'text-success-500' :
                    stat.color === 'secondary' ? 'text-secondary-400' :
                    'text-warning-500'
                  }`} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {stat.up ? (
                  <ArrowUpRight className="w-3.5 h-3.5 text-success-500" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 text-critical-500" />
                )}
                <span className={`text-caption font-semibold ${stat.up ? 'text-success-500' : 'text-critical-500'}`}>
                  {stat.change}
                </span>
                <span className="text-caption text-neutral-500">vs last month</span>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Score */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-around py-4">
              <ScoreRing value={92} size={100} strokeWidth={8} color="success" label="Overall" />
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-caption text-neutral-400">Speed</span>
                    <span className="text-caption font-semibold text-success-500">95</span>
                  </div>
                  <ProgressBar value={95} color="success" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-caption text-neutral-400">SEO</span>
                    <span className="text-caption font-semibold text-primary-400">88</span>
                  </div>
                  <ProgressBar value={88} color="primary" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-caption text-neutral-400">Accessibility</span>
                    <span className="text-caption font-semibold text-secondary-400">91</span>
                  </div>
                  <ProgressBar value={91} color="primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((activity, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/20 border border-neutral-800/30 hover:border-neutral-700/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    activity.badge === 'primary' ? 'bg-primary-400' :
                    activity.badge === 'success' ? 'bg-success-500' :
                    activity.badge === 'secondary' ? 'bg-secondary-400' :
                    'bg-neutral-400'
                  }`} />
                  <p className="text-body-sm text-neutral-300 flex-1">{activity.message}</p>
                  <span className="text-caption text-neutral-500 shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Pages */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800/50">
                  <th className="text-left py-3 px-4 text-caption font-semibold text-neutral-400 uppercase tracking-wider">Page</th>
                  <th className="text-right py-3 px-4 text-caption font-semibold text-neutral-400 uppercase tracking-wider">Conversations</th>
                  <th className="text-right py-3 px-4 text-caption font-semibold text-neutral-400 uppercase tracking-wider">Conversion</th>
                  <th className="text-right py-3 px-4 text-caption font-semibold text-neutral-400 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PAGES.map((page, i) => (
                  <tr key={i} className="border-b border-neutral-800/30 hover:bg-neutral-800/20 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-body-sm font-mono text-primary-400">{page.name}</span>
                    </td>
                    <td className="py-3 px-4 text-right text-body-sm text-neutral-200">{page.conversations.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant={parseFloat(page.conversion) > 10 ? 'success' : 'default'} size="sm">
                        {page.conversion}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <ArrowUpRight className="inline w-4 h-4 text-success-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
