'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { useState, useRef } from 'react'

export default function ContactContent() {
  const locale = useLocale()
  const t = useTranslations('Contact')
  const formRef = useRef<HTMLFormElement>(null)

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
        }),
      })
      if (res.ok) {
        setStatus('sent')
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch (_e) {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <Link
          href={`/${locale}`}
          className="text-sm text-muted-foreground hover:text-foreground mb-8 inline-block"
        >
          ← {t('backHome')}
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg text-muted-foreground mb-10">{t('subtitle')}</p>

        {status === 'sent' && (
          <div className="mb-6 p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
            {t('successMessage')}
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-lg">
            {t('errorMessage')}
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              {t('nameLabel')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder={t('namePlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              {t('emailLabel')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder={t('emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
              {t('subjectLabel')}
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder={t('subjectPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">
              {t('messageLabel')}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              placeholder={t('messagePlaceholder')}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />
            {status === 'sending' ? t('sending') : t('submit')}
          </button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground">
          {t('altContact')}
        </p>
      </div>
    </div>
  )
}
