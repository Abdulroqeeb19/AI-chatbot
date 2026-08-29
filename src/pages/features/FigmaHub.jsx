import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Tabs, TabsList, TabsTrigger, TabsContent, Switch, Input } from '../../components/ui'
import { PenTool, RefreshCw, Check, AlertCircle, Link, Unlink, Download, Upload, Clock, FileImage } from 'lucide-react'
import { staggerContainer, staggerItem, springGentle } from '../../lib/motion'

const CONNECTIONS = [
  { id: '1', name: 'ChatBot Pro Design System', file: 'CBP-Design-System.fig', status: 'connected', lastSync: '5 min ago', components: 24 },
  { id: '2', name: 'Marketing Landing Page', file: 'Landing-Page.fig', status: 'connected', lastSync: '1 hour ago', components: 12 },
  { id: '3', name: 'Widget Variations', file: 'Widget-Kit.fig', status: 'disconnected', lastSync: '3 days ago', components: 8 },
]

const SYNC_LOG = [
  { time: '5 min ago', action: 'Component updated', detail: 'Button/Primary variant', status: 'success' },
  { time: '5 min ago', action: 'Style synced', detail: 'Colors/Primary palette', status: 'success' },
  { time: '1 hour ago', action: 'New component imported', detail: 'Card/Pricing variant', status: 'success' },
  { time: '1 hour ago', action: 'Asset exported', detail: 'Logo/Icon set (12 files)', status: 'success' },
  { time: '3 hours ago', action: 'Sync failed', detail: 'Timeout on large file', status: 'error' },
  { time: '1 day ago', action: 'Full sync completed', detail: '24 components, 8 styles', status: 'success' },
]

const FILE_MAP = [
  { figmaPath: 'Components/Button', localPath: 'src/components/ui/Button.jsx', status: 'synced' },
  { figmaPath: 'Components/Card', localPath: 'src/components/ui/Card.jsx', status: 'synced' },
  { figmaPath: 'Components/Input', localPath: 'src/components/ui/Input.jsx', status: 'synced' },
  { figmaPath: 'Colors/Primary', localPath: 'src/styles/global.css', status: 'synced' },
  { figmaPath: 'Typography/Headings', localPath: 'src/styles/global.css', status: 'outdated' },
  { figmaPath: 'Icons/Set', localPath: 'src/components/Icon.jsx', status: 'synced' },
]

export default function PenToolHub() {
  const [activeTab, setActiveTab] = useState('connections')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Status Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success-500/10 border border-success-500/20">
            <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
            <span className="text-caption font-medium text-success-500">Connected to PenTool</span>
          </div>
          <Badge variant="default" size="sm">
            <Clock className="w-3 h-3 mr-1" />
            Last sync: 5 min ago
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" />
            Sync Now
          </Button>
          <Button size="sm">
            <Link className="w-4 h-4 mr-1" />
            Connect File
          </Button>
        </div>
      </div>

      <Tabs defaultValue="connections">
        <TabsList>
          <TabsTrigger value="connections">
            <PenTool className="w-4 h-4 mr-1.5" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="mapping">
            <FileImage className="w-4 h-4 mr-1.5" />
            File Mapping
          </TabsTrigger>
          <TabsTrigger value="log">
            <Clock className="w-4 h-4 mr-1.5" />
            Sync Log
          </TabsTrigger>
        </TabsList>

        {/* Connections Tab */}
        <TabsContent value="connections">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {CONNECTIONS.map((conn) => (
              <motion.div key={conn.id} variants={staggerItem} whileHover={{ y: -4 }}>
                <Card hover glow={conn.status === 'connected'}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center">
                      <PenTool className="w-6 h-6 text-purple-400" />
                    </div>
                    <Badge
                      variant={conn.status === 'connected' ? 'success' : 'default'}
                      size="sm"
                      dot
                    >
                      {conn.status}
                    </Badge>
                  </div>

                  <h4 className="text-body font-semibold text-neutral-200 mb-1">{conn.name}</h4>
                  <p className="text-caption text-neutral-500 mb-3">{conn.file}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-caption text-neutral-400">{conn.components} components</span>
                    <span className="text-caption text-neutral-500">Synced {conn.lastSync}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1">
                      <RefreshCw className="w-3.5 h-3.5 mr-1" />
                      Sync
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Unlink className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Add New Connection Card */}
            <motion.div variants={staggerItem}>
              <motion.div whileHover={{ scale: 1.02, borderColor: 'rgba(99,102,241,0.3)' }}>
                <Card hover className="border-dashed border-neutral-700/50 flex flex-col items-center justify-center py-12 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center mb-3">
                    <Link className="w-6 h-6 text-neutral-500" />
                  </div>
                  <p className="text-body-sm font-semibold text-neutral-400">Connect New File</p>
                  <p className="text-caption text-neutral-600 mt-1">Link a PenTool file to sync</p>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* File Mapping Tab */}
        <TabsContent value="mapping">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Component Mapping</CardTitle>
                <Button variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export Mapping
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {FILE_MAP.map((mapping, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-4 p-3 rounded-lg bg-neutral-800/20 border border-neutral-800/30 hover:border-neutral-700/50 transition-colors"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <PenTool className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="text-body-sm font-mono text-neutral-300 truncate">{mapping.figmaPath}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <div className="w-8 h-px bg-neutral-700" />
                      <span className="text-micro">→</span>
                      <div className="w-8 h-px bg-neutral-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-body-sm font-mono text-primary-400 truncate block">{mapping.localPath}</span>
                    </div>
                    <Badge
                      variant={mapping.status === 'synced' ? 'success' : 'warning'}
                      size="sm"
                    >
                      {mapping.status === 'synced' ? <Check className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                      {mapping.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sync Log Tab */}
        <TabsContent value="log">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sync History</CardTitle>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export Log
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {SYNC_LOG.map((log, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/20 border border-neutral-800/30"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      log.status === 'success' ? 'bg-success-500' : 'bg-critical-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-body-sm font-medium text-neutral-200">{log.action}</span>
                        <span className="text-caption text-neutral-500">{log.detail}</span>
                      </div>
                    </div>
                    <span className="text-caption text-neutral-500 shrink-0">{log.time}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
