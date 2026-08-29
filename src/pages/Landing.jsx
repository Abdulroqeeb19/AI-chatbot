import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/cn'
import { Button, Badge, Card } from '../components/ui'
import {
  staggerContainer, staggerItem, fadeUp, fadeUpStrong,
  fadeLeft, fadeRight, float, floatSlow, springGentle,
  hoverLift, hoverScale, springBouncy
} from '../lib/motion'
import {
  MessageSquare, FileText, CreditCard, Calendar,
  BarChart3, Smartphone, ArrowRight, Check, Menu, X
} from 'lucide-react'

const FEATURES = [
  { icon: MessageSquare, title: 'AI Chat Widget', desc: 'Embed on any website with one line of code. Collects leads, answers questions, takes bookings 24/7.' },
  { icon: FileText, title: 'Standalone Page', desc: 'Get a hosted page (yoursite.com/your-business) you can share on social media, Google Business, or anywhere.' },
  { icon: CreditCard, title: 'Accept Payments', desc: 'Collect deposits and full payments via Paystack directly in the chat. No checkout page needed.' },
  { icon: Calendar, title: 'Book Appointments', desc: 'Clients book services, select time slots, and get confirmations — all through conversation.' },
  { icon: BarChart3, title: 'Lead Dashboard', desc: 'See every enquiry, filter by status, export to CSV. Never miss a potential client again.' },
  { icon: Smartphone, title: 'WhatsApp Ready', desc: "Connect your WhatsApp Business API. Same chatbot, same flows, now on the world's #1 messaging app." },
]

const STEPS = [
  { title: 'Create your account', desc: 'Sign up and set up your business profile in under 2 minutes.' },
  { title: 'Configure your chatbot', desc: 'Add your services, pricing, FAQ, payment links, and business hours.' },
  { title: 'Share everywhere', desc: 'Copy the embed code for your site, or share your standalone page link on social media.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'Forever',
    features: ['1 chatbot', '100 conversations/month', 'Lead capture', 'Email notifications', 'Standalone page'],
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    features: ['Unlimited chatbots', 'Unlimited conversations', 'Payment collection', 'WhatsApp integration', 'Custom branding', 'Priority support'],
    featured: true,
  },
  {
    name: 'Business',
    price: '$49',
    period: '/month',
    features: ['Everything in Pro', 'Multi-agent support', 'API access', 'White-label option', 'Dedicated account manager', 'SLA guarantee'],
  },
]

function AnimatedSection({ children, className, ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* NAV */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled && 'bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800/50'
        )}
      >
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={springBouncy}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center"
            >
              <span className="text-white text-caption font-bold">CB</span>
            </motion.div>
            <span className="text-body-lg font-bold text-neutral-100">ChatBot Pro</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item === 'How It Works' ? 'how' : item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-body-sm text-neutral-400 hover:text-neutral-100 transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#/admin"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button size="sm">Get Started</Button>
            </motion.a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-neutral-950/98 backdrop-blur-xl border-b border-neutral-800/50 overflow-hidden"
            >
              <div className="container py-4 space-y-3">
                <a href="#features" className="block py-2 text-body-sm text-neutral-400 hover:text-neutral-100" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how" className="block py-2 text-body-sm text-neutral-400 hover:text-neutral-100" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#pricing" className="block py-2 text-body-sm text-neutral-400 hover:text-neutral-100" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#/admin" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">Get Started</Button>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background orbs with float animation */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            {...float}
            className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[150px]"
          />
          <motion.div
            {...floatSlow}
            className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-secondary-500/8 blur-[150px]"
          />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container relative z-10 pt-24 pb-16"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <Badge variant="primary" className="mb-6 inline-flex items-center gap-1.5">
                No website required
              </Badge>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-display font-extrabold leading-tight tracking-tight max-w-4xl mb-6"
            >
              Your AI assistant
              <br />
              for <span className="grad-text">any business</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-body-lg text-neutral-400 max-w-xl mb-8 leading-relaxed"
            >
              Deploy a smart chatbot in minutes that collects leads, takes bookings, accepts payments, and answers questions — on your website, WhatsApp, or a standalone page.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mb-12">
              <a href="#/admin">
                <Button size="lg">
                  Start Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#features">
                <Button variant="secondary" size="lg">
                  See Features
                </Button>
              </a>
            </motion.div>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-10">
              {[
                { num: '2,400+', label: 'Businesses' },
                { num: '1.2M', label: 'Conversations' },
                { num: '98%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-h2 font-bold text-neutral-100">{stat.num}</div>
                  <div className="text-caption text-neutral-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={staggerItem}>
              <Badge variant="primary" className="mb-4 inline-flex">Features</Badge>
            </motion.div>
            <motion.h2
              variants={staggerItem}
              className="text-h1 font-extrabold leading-tight tracking-tight max-w-2xl mb-4"
            >
              Everything you need to
              <br />
              <span className="grad-text">automate client engagement</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-body-lg text-neutral-400 max-w-lg mb-12">
              No coding. No website. Just configure and deploy.
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card hover glow className="p-7 h-full">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={springBouncy}
                      className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/15 flex items-center justify-center mb-5"
                    >
                      <Icon className="w-6 h-6 text-primary-400" />
                    </motion.div>
                    <h3 className="text-body-lg font-bold text-neutral-100 mb-2">{f.title}</h3>
                    <p className="text-body-sm text-neutral-400 leading-relaxed">{f.desc}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 bg-neutral-900/30">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={staggerItem}>
              <Badge variant="primary" className="mb-4 inline-flex">How It Works</Badge>
            </motion.div>
            <motion.h2
              variants={staggerItem}
              className="text-h1 font-extrabold tracking-tight mb-12"
            >
              Up and running in <span className="grad-text">3 steps</span>
            </motion.h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <motion.div
                  className="text-display font-extrabold text-primary-500/15 mb-4"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 200, damping: 15 }}
                >
                  0{i + 1}
                </motion.div>
                <h3 className="text-body-lg font-bold text-neutral-100 mb-2">{s.title}</h3>
                <p className="text-body-sm text-neutral-400 leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 0.6 }}
                    className="hidden md:block absolute top-8 right-0 w-24 h-px bg-gradient-to-r from-primary-500/30 origin-left"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="container">
          <AnimatedSection>
            <motion.div variants={staggerItem}>
              <Badge variant="primary" className="mb-4 inline-flex">Pricing</Badge>
            </motion.div>
            <motion.h2 variants={staggerItem} className="text-h1 font-extrabold tracking-tight mb-4">
              Start free. <span className="grad-text">Scale when ready.</span>
            </motion.h2>
            <motion.p variants={staggerItem} className="text-body-lg text-neutral-400 max-w-lg mb-12">
              No credit card required for the free plan.
            </motion.p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={p.featured ? { y: -6, boxShadow: '0 0 48px rgba(99, 102, 241, 0.3)' } : { y: -4 }}
                className={cn(
                  'relative rounded-2xl p-8 border transition-colors duration-200',
                  p.featured
                    ? 'bg-neutral-900/80 border-primary-500/50 shadow-glow'
                    : 'bg-neutral-900/50 border-neutral-800/50'
                )}
              >
                {p.featured && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 15 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    <Badge variant="primary" size="sm">Popular</Badge>
                  </motion.div>
                )}

                <h3 className="text-body-lg font-bold text-neutral-200 mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-h1 font-extrabold text-neutral-100">{p.price}</span>
                </div>
                <span className="text-caption text-neutral-500 mb-6 block">{p.period}</span>

                <ul className="space-y-3 mb-8">
                  {p.features.map((f, fi) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + fi * 0.04 }}
                      className="flex items-center gap-2.5 text-body-sm text-neutral-300"
                    >
                      <Check className="w-4 h-4 text-success-500 shrink-0" />
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <a href="#/admin" className="block">
                  <Button
                    variant={p.featured ? 'primary' : 'secondary'}
                    className="w-full justify-center"
                  >
                    Get Started
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-gradient-to-br from-primary-600 to-primary-500 p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                {...float}
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-[80px]"
              />
              <motion.div
                {...floatSlow}
                className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/10 blur-[80px]"
              />
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-h1 font-extrabold text-white mb-4"
              >
                Ready to automate your business?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-body-lg text-white/70 max-w-lg mx-auto mb-8"
              >
                Join 2,400+ businesses already using ChatBot Pro to capture leads and accept payments 24/7.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <a href="#/admin">
                  <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-neutral-100 border-0">
                    Create Free Account
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-neutral-800/50">
        <div className="container text-center">
          <p className="text-body-sm text-neutral-500">
            ChatBot Pro — AI assistants for businesses that don't need a website.
          </p>
        </div>
      </footer>
    </div>
  )
}
